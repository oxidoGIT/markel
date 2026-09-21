"use strict";
window.LESSON_PRACTICE = {
  exercises: window.DECIMAL_EXERCISES,
  checker: window.DecimalAnswers,
  storageKey: "markel-3eso-decimals-practice-v2",
  visual() {
    const ticks = Array.from({length:11}, (_,i) => {
      const x = 40 + i * 60;
      return `<path d="M${x} 55v12" stroke="currentColor"/>`;
    }).join("");
    return `<div class="number-figure"><svg viewBox="0 0 680 112" role="img" aria-label="Recta de 0,10 a 0,20 amb deu intervals iguals. A és a la setena marca després de 0,10."><path d="M30 61H650" stroke="currentColor"/>${ticks}<text x="40" y="94" text-anchor="middle">0,10</text><text x="640" y="94" text-anchor="middle">0,20</text><circle cx="460" cy="61" r="5" fill="#17634c"/><text x="460" y="34" text-anchor="middle" fill="#17634c">A</text></svg></div>`;
  },
  init() {
    const slider = document.querySelector("#hundredths");
    const format = n => (n / 100).toFixed(2).replace(".", ",");
    function update() {
      const n = Number(slider.value);
      document.querySelector("#hundredths-value").textContent = n;
      const cells = Array.from({length:100}, (_,i) => `<rect x="${(i%10)*18+1}" y="${Math.floor(i/10)*18+1}" width="16" height="16" fill="${i<n ? "#17634c" : "#fff"}" stroke="#95aaa0" stroke-width=".6"/>`).join("");
      const ticks = Array.from({length:11}, (_,i) => `<path d="M${30+i*42} 57v10" stroke="#7f9690"/>`).join("");
      document.querySelector("#decimal-model").innerHTML = `<svg class="hundred-grid" viewBox="0 0 180 180" role="img" aria-label="${n} de 100 quadradets acolorits">${cells}</svg><div class="decimal-line"><svg viewBox="0 0 480 104" role="img" aria-label="${format(n)} situat entre zero i u"><path d="M30 62H450" stroke="#202d29"/>${ticks}<circle cx="${30+n*4.2}" cy="62" r="5" fill="#245da1"/><text x="${Math.max(38,Math.min(442,30+n*4.2))}" y="32" text-anchor="middle" fill="#245da1">${format(n)}</text><text x="30" y="94" text-anchor="middle">0</text><text x="240" y="94" text-anchor="middle">0,5</text><text x="450" y="94" text-anchor="middle">1</text></svg><p>Cada tram de la recta és una dècima.</p></div>`;
      const tenths = Math.floor(n / 10), rest = n % 10;
      document.querySelector("#decimal-result").textContent = `${n} ${n === 1 ? "centèsima" : "centèsimes"} = ${format(n)} = ${tenths} ${tenths === 1 ? "dècima" : "dècimes"} i ${rest} ${rest === 1 ? "centèsima" : "centèsimes"}.`;
    }
    slider.addEventListener("input", update);
    update();
  }
};
