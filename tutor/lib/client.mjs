export class ApiError extends Error {
  constructor(message, status, code) { super(message); this.status = status; this.code = code; }
}

export function validateConfig(config) {
  if (!config || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(config.supabaseUrl) || !/^sb_publishable_[A-Za-z0-9_-]+$/.test(config.publishableKey)) {
    throw new Error('El acceso privado todavía está en preparación.');
  }
  return config;
}

// Session tokens stay in the current tab. No school data is persisted in the browser.
export class PrivateClient {
  constructor(config, { fetcher = globalThis.fetch.bind(globalThis), storage = globalThis.sessionStorage, onExpired = () => {} } = {}) {
    validateConfig(config);
    this.config = config; this.fetcher = fetcher; this.storage = storage; this.onExpired = onExpired;
    this.key = `tutor-session:${config.supabaseUrl}`;
    try { this.session = JSON.parse(storage.getItem(this.key)); } catch { this.session = null; }
    this.generation = 0;
  }
  setSession(session) {
    this.session = session ? { ...session, expires_at: session.expires_at || Math.floor(Date.now() / 1000) + session.expires_in } : null;
    if (this.session) this.storage.setItem(this.key, JSON.stringify(this.session));
    else this.storage.removeItem(this.key);
  }
  clear() { this.generation++; this.setSession(null); }
  async request(path, { body, method = 'POST', token, blob = false } = {}) {
    const headers = { apikey: this.config.publishableKey };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body !== undefined) headers['Content-Type'] = body instanceof Blob ? (body.type || 'application/octet-stream') : 'application/json';
    let response;
    try {
      response = await this.fetcher(this.config.supabaseUrl + path, {
        method, headers, body: body === undefined ? undefined : body instanceof Blob ? body : JSON.stringify(body),
        cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer', signal: AbortSignal.timeout(45000),
      });
    } catch { throw new ApiError('No se pudo conectar. Tus cambios no están confirmados; puedes reintentar.', 0); }
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      let message = 'No se pudo completar la operación. Puedes reintentar.';
      if (data.code === 'TM409') message = 'Esta clase ha cambiado en otro dispositivo. Actualiza antes de volver a enviar.';
      else if (response.status === 401) message = 'La sesión ha caducado. Vuelve a entrar.';
      else if (response.status === 403 || data.code === '42501') message = 'Esta cuenta no tiene permiso para esta operación.';
      else if (data.code === '22023') message = 'Los datos no son válidos o falta terminar alguna subida.';
      else if (response.status === 429) message = 'Hay demasiados intentos. Espera un momento y vuelve a probar.';
      throw new ApiError(message, response.status, data.code || data.error_code || data.error);
    }
    if (blob) return response.blob();
    if (response.status === 204) return null;
    return response.json();
  }
  async signIn(email, password) {
    this.clear();
    const generation = this.generation;
    let session;
    try { session = await this.request('/auth/v1/token?grant_type=password', { body: { email, password } }); }
    catch (error) { if (error.status === 400) throw new ApiError('No se ha podido entrar. Revisa el correo y la contraseña.', 400); throw error; }
    if (generation !== this.generation) throw new Error('La sesión ha cambiado.');
    this.setSession(session);
  }
  async token() {
    if (!this.session) throw new ApiError('Vuelve a entrar para continuar.', 401);
    if (this.session.expires_at > Date.now() / 1000 + 60) return this.session.access_token;
    if (!this.refreshing) {
      const generation = this.generation;
      this.refreshing = (async () => {
        try {
          const session = await this.request('/auth/v1/token?grant_type=refresh_token', { body: { refresh_token: this.session.refresh_token } });
          if (generation !== this.generation) throw new ApiError('La sesión ha cambiado.', 401);
          this.setSession(session);
          return session.access_token;
        } catch (error) {
          // A network failure is retryable; a rejected refresh ends the session.
          if ([400, 401, 403].includes(error.status) && generation === this.generation) { this.clear(); this.onExpired(); }
          throw error;
        } finally { this.refreshing = null; }
      })();
    }
    return this.refreshing;
  }
  async authenticated(path, options = {}) {
    const generation = this.generation;
    try {
      const result = await this.request(path, { ...options, token: await this.token() });
      if (generation !== this.generation) throw new ApiError('La sesión ha cambiado.', 401);
      return result;
    } catch (error) {
      if (error.status === 401 && generation === this.generation) { this.clear(); this.onExpired(); }
      throw error;
    }
  }
  rpc(name, body = {}) { return this.authenticated(`/rest/v1/rpc/${name}`, { body }); }
  async signOut() {
    const token = this.session?.access_token;
    this.clear(); // Clear private UI even if the network is unavailable.
    if (token) await this.request('/auth/v1/logout?scope=local', { token }).catch(() => {});
  }
  async download(path) {
    return this.authenticated(`/storage/v1/object/authenticated/tutor-files/${path.split('/').map(encodeURIComponent).join('/')}`, { method: 'GET', blob: true });
  }
  async upload(studentId, file) {
    const reservation = await this.rpc('tm_reserve_file', { p_student: studentId, p_hash: file.hash, p_size: file.size, p_type: file.type });
    if (!reservation.exists) {
      try {
        await this.authenticated(`/storage/v1/object/tutor-files/${reservation.path}`, { body: new Blob([file.blob], {type:file.type}) });
      } catch (error) {
        // A previous upload may have succeeded although its response was lost.
        if (error.status !== 409 && error.code !== 'Duplicate') throw error;
      }
    }
    return { hash: file.hash, name: file.name, size: file.size, type: file.type, path: reservation.path };
  }
}
