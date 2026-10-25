import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "seed");
fs.mkdirSync(dir, { recursive: true });

function svg(name, inner) {
  const doc = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="#FAF5EE"/>
  <rect x="56" y="56" width="688" height="888" fill="#F7F1EA" stroke="#E9D6C6" stroke-width="2"/>
  <g fill="none" stroke="#AD8546" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    ${inner}
  </g>
</svg>`;
  fs.writeFileSync(path.join(dir, name), doc);
}

function chain(y0, spread) {
  let s = "";
  for (let i = -7; i <= 7; i++) {
    const x = 400 + i * 26;
    const y = y0 + i * i * spread;
    s += `<circle cx="${x}" cy="${y.toFixed(1)}" r="6.5"/>`;
  }
  return s;
}

svg(
  "pendant.svg",
  `${chain(280, 3.4)}
   <path d="M400 470 V610" stroke="#604638"/>
   <circle cx="400" cy="690" r="62"/>
   <circle cx="400" cy="690" r="22" fill="#E9D6C6" stroke="#604638"/>`
);

svg(
  "pearls.svg",
  `${chain(250, 2.6)}
   <circle cx="400" cy="520" r="16" fill="#FBF7F2" stroke="#AD8546"/>
   <circle cx="400" cy="570" r="22" fill="#FBF7F2" stroke="#AD8546"/>
   <circle cx="400" cy="640" r="30" fill="#FBF7F2" stroke="#AD8546"/>
   <circle cx="400" cy="730" r="18" fill="#FBF7F2" stroke="#604638"/>`
);

svg(
  "studs.svg",
  `<circle cx="290" cy="460" r="42"/>
   <circle cx="510" cy="460" r="42"/>
   <circle cx="290" cy="460" r="10" fill="#E9D6C6" stroke="#604638"/>
   <circle cx="510" cy="460" r="10" fill="#E9D6C6" stroke="#604638"/>
   <path d="M290 502 V620" stroke="#604638"/>
   <path d="M510 502 V620" stroke="#604638"/>`
);

svg(
  "hoops.svg",
  `<circle cx="290" cy="520" r="108"/>
   <circle cx="510" cy="520" r="108"/>
   <path d="M290 412 V360" stroke="#604638"/>
   <path d="M510 412 V360" stroke="#604638"/>
   <circle cx="290" cy="352" r="7" fill="#E9D6C6"/>
   <circle cx="510" cy="352" r="7" fill="#E9D6C6"/>`
);

svg(
  "signet.svg",
  `<ellipse cx="400" cy="600" rx="128" ry="168"/>
   <rect x="318" y="390" width="164" height="120"/>
   <circle cx="400" cy="450" r="26" fill="#E9D6C6" stroke="#604638"/>`
);

svg(
  "bands.svg",
  `<ellipse cx="345" cy="530" rx="108" ry="156"/>
   <ellipse cx="460" cy="530" rx="108" ry="156"/>
   <circle cx="400" cy="470" r="14" fill="#E9D6C6" stroke="#604638"/>`
);

svg(
  "cuff.svg",
  `<path d="M230 430 C230 760 570 760 570 430"/>
   <path d="M250 430 C250 720 550 720 550 430" stroke="#604638"/>
   <circle cx="230" cy="430" r="11" fill="#E9D6C6"/>
   <circle cx="570" cy="430" r="11" fill="#E9D6C6"/>`
);

svg(
  "haar.svg",
  `<path d="M170 300 Q400 390 630 300"/>
   <path d="M190 360 Q400 470 610 360"/>
   <path d="M220 430 Q400 560 580 430"/>
   <path d="M400 300 V560" stroke="#604638"/>
   <circle cx="400" cy="660" r="48"/>
   <circle cx="400" cy="660" r="16" fill="#E9D6C6" stroke="#604638"/>
   <path d="M400 708 V760" stroke="#604638"/>
   <circle cx="400" cy="784" r="14" fill="#FBF7F2"/>`
);

svg(
  "jhumka.svg",
  `<circle cx="330" cy="280" r="8" fill="#E9D6C6"/>
   <circle cx="470" cy="280" r="8" fill="#E9D6C6"/>
   <path d="M330 288 V350" stroke="#604638"/>
   <path d="M470 288 V350" stroke="#604638"/>
   <path d="M270 360 Q330 560 390 360 Z"/>
   <path d="M410 360 Q470 560 530 360 Z"/>
   <circle cx="330" cy="600" r="16" fill="#FBF7F2"/>
   <circle cx="470" cy="600" r="16" fill="#FBF7F2"/>`
);

console.log("seed art written");
