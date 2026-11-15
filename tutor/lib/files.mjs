export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_BATCH_BYTES = 20 * 1024 * 1024;
export const FILE_TYPES = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf', txt: 'text/plain',
  doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  odt: 'application/vnd.oasis.opendocument.text', ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};
export async function sha256(bytes) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), v => v.toString(16).padStart(2, '0')).join('');
}
export async function prepareFiles(files) {
  if (files.length > 10 || files.reduce((n, f) => n + f.size, 0) > MAX_BATCH_BYTES) throw new Error('Máximo 10 archivos y 20 MB por envío.');
  const result = [];
  for (const file of files) {
    if (!file.size || file.size > MAX_FILE_BYTES) throw new Error(`${file.name}: debe ocupar entre 1 byte y 5 MB.`);
    const type = FILE_TYPES[file.name.split('.').pop().toLowerCase()];
    if (!type || (file.type && file.type !== 'application/octet-stream' && file.type !== type)) throw new Error(`${file.name}: formato no admitido.`);
    const hash = await sha256(await file.arrayBuffer());
    if (!result.some(f => f.hash === hash)) result.push({ hash, name: file.name.slice(0, 200), size: file.size, type, blob: file });
  }
  return result;
}
export function madridDate(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now).map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
