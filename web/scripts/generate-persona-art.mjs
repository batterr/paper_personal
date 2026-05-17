import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "personas");

const personas = [
  ["a1-b1-c1", "库存尸", "Ku-Stock-She", "storageCrypt", "#7c684d", "#8bb174", "#ffd56f"],
  ["a1-b1-c2", "熟人毒仓", "Familiar-Do-Chang", "interrogationVault", "#6f6b55", "#e0b44f", "#98a36d"],
  ["a1-b1-c3", "补款喷子", "Boo-Kuan-Pen", "receiptVolcano", "#9c4d38", "#f28c45", "#2f7d53"],
  ["a1-b2-c1", "囤纸牢", "Tun-Paper-Lao", "paperPrison", "#7c7558", "#c7a96d", "#8dbb75"],
  ["a1-b2-c2", "表格阎王", "Excel-Yan-Wang", "spreadsheetCourt", "#526b58", "#b4d36b", "#2f5d49"],
  ["a1-b2-c3", "盘货暴君", "Stock-Pan-Boss", "inventoryThrone", "#405f4b", "#d6c26b", "#8fbf73"],
  ["a1-b3-c1", "拆箱戏癫", "Try-Box-Dian", "unboxingTheater", "#a86b37", "#f0b94f", "#e8795b"],
  ["a1-b3-c2", "晒单显眼包", "Show-Dan-Bag", "showroomCamera", "#b45f46", "#f2bd4c", "#ff8aa8"],
  ["a1-b3-c3", "断货疯批", "Soldout-Feng-Pi", "soldoutSiren", "#b8443e", "#f04b3f", "#ffd45f"],
  ["a2-b1-c1", "冷门神经", "Cold-Door-Nerve", "coldDoorShrine", "#58527f", "#72c98a", "#8ac7ff"],
  ["a2-b1-c2", "怪话漏勺", "Guai-Talk-Spoon", "gossipSpoon", "#665a8c", "#7bd6a5", "#f5cf6b"],
  ["a2-b1-c3", "邪门广播", "Xie-Men-FM", "weirdBroadcastTower", "#514c7e", "#61bd79", "#f06e9a"],
  ["a2-b2-c1", "审美暴君", "Taste-Bao-Jun", "tasteMuseum", "#606a54", "#c6cf64", "#8a7dff"],
  ["a2-b2-c2", "怪味教主", "Guai-Flavor-Joe", "flavorTemple", "#4f7268", "#88d39e", "#dfc35e"],
  ["a2-b2-c3", "带歪总监", "Die-Wai-Director", "trendTilt", "#446b68", "#96ca62", "#ff8a5f"],
  ["a2-b3-c1", "独演疯批", "Solo-Feng-Pi", "soloStageMask", "#73548a", "#d973aa", "#ffcc68"],
  ["a2-b3-c2", "造景戏霸", "Scene-Drama-Ba", "disasterDiorama", "#76558a", "#66c2a6", "#f0b45a"],
  ["a2-b3-c3", "怪图核弹", "Guai-Pic-Boom", "nuclearCollage", "#a83e4a", "#f1bf3f", "#7bd1ff"],
  ["a3-b1-c1", "深夜废稿", "Midnight-Fay-Gao", "midnightDraftSea", "#465a7c", "#9bb4dc", "#f1cf79"],
  ["a3-b1-c2", "情绪勒索", "Feel-Le-Suo", "puppetHeart", "#69618b", "#df7c9c", "#f3c06a"],
  ["a3-b1-c3", "破防喇叭", "Po-Fang-Laba", "megaphoneStorm", "#5d719c", "#df617c", "#ffd15f"],
  ["a3-b2-c1", "体面废墟", "Face-Ruin", "elegantRuins", "#65738d", "#9ed0c2", "#e8cf86"],
  ["a3-b2-c2", "气氛保姆", "Vibe-Bao-Mu", "comfortNest", "#6e927f", "#e69bb1", "#f4d57a"],
  ["a3-b2-c3", "情绪天气台", "Mood-Weather-TV", "moodWeatherStation", "#5f8197", "#edbd52", "#80c8ff"],
  ["a3-b3-c1", "独角戏精", "Solo-Drama-Jing", "soloDramaMask", "#6c557f", "#e9ad63", "#e67aa2"],
  ["a3-b3-c2", "朋友圈戏命", "Friend-Zone-Show", "friendFeedRocket", "#80608a", "#ee8b7f", "#7cc8ff"],
  ["hidden-0", "宇宙戏癫", "Cosmo-Drama-Dian", "cosmicRomanceShip", "#8e3e75", "#f0cf59", "#7d8cff"],
].map(([slug, name, chinlish, scene, base, accent, third]) => ({
  slug,
  name,
  chinlish,
  scene,
  base,
  accent,
  third,
}));

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };
    return map[char];
  });
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function shade(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const mix = amount >= 0 ? 255 : 0;
  const ratio = Math.abs(amount);
  const channel = (value) => Math.round(value + (mix - value) * ratio).toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

function p(points, fill, attrs = "") {
  return `<polygon points="${points}" fill="${fill}" ${attrs}/>`;
}

function c(cx, cy, radius, fill, attrs = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fill}" ${attrs}/>`;
}

function path(d, attrs = "") {
  return `<path d="${d}" ${attrs}/>`;
}

function g(x, y, scale, body, attrs = "") {
  return `<g transform="translate(${x} ${y}) scale(${scale})" ${attrs}>${body}</g>`;
}

function text(x, y, value, size, fill = "#26302c", attrs = "") {
  return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="900" fill="${fill}" ${attrs}>${esc(value)}</text>`;
}

function sticker(x, y, width, height, fill, rotate = 0) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="11" fill="${fill}" stroke="${shade(fill, -0.2)}" stroke-width="3" transform="rotate(${rotate} ${x + width / 2} ${y + height / 2})"/>`;
}

function lowPolyPerson(x, y, scale, colors, variant = "bob") {
  const { base, accent, third } = colors;
  const skin = "#efd0b9";
  const hair = {
    bob: `${p("-54,-33 -22,-70 36,-62 63,-28 48,-4 -6,-28", "#202529")}${p("-21,-70 37,-62 52,-30 -2,-39", "#42464a")}`,
    helmet: `${p("-56,-28 -20,-72 32,-67 68,-34 57,-7 -9,-37", "#1e2227")}${p("-20,-72 33,-67 65,-34 1,-43", "#53565a")}`,
    spike: `${p("-60,-25 -39,-72 -12,-45 11,-75 31,-43 63,-34 45,-6 -11,-30", "#1f2428")}`,
    crown: `${p("-55,-30 -19,-64 38,-59 64,-22 50,-2 -8,-30", "#1f2428")}${p("-31,-82 -16,-58 0,-82 14,-58 31,-82 25,-50 -26,-50", third)}`,
    hood: `${p("-65,-20 -34,-73 30,-73 67,-18 54,46 -54,44", shade(base, -0.25))}`,
    bald: `${p("-58,-19 -22,-60 32,-58 62,-17 51,20 -45,23", shade(skin, -0.08), `opacity=".6"`)}`,
  }[variant];
  return g(
    x,
    y,
    scale,
    `
      <ellipse cx="0" cy="87" rx="72" ry="13" fill="#17201d" opacity=".16"/>
      ${p("-39,8 39,8 57,70 -57,70", base)}
      ${p("-39,8 0,24 -57,70", shade(base, 0.15), `opacity=".8"`)}
      ${p("39,8 0,24 57,70", shade(base, -0.14), `opacity=".76"`)}
      <path d="M-40 19 L-82 44 M40 18 L82 44" stroke="${shade(base, 0.08)}" stroke-width="17" stroke-linecap="round"/>
      <circle cx="-86" cy="46" r="10" fill="${skin}"/><circle cx="86" cy="46" r="10" fill="${skin}"/>
      <g transform="translate(0 -64)">
        ${p("-53,-30 -14,-61 39,-55 63,-16 51,38 0,56 -48,33", skin)}
        ${p("-53,-30 -14,-61 -8,0 -48,33", shade(skin, 0.1), `opacity=".8"`)}
        ${p("39,-55 63,-16 51,38 7,-1", shade(skin, -0.12), `opacity=".62"`)}
        ${hair}
        <path d="M-26 -14 L-7 -18 M7 -18 L27 -14" stroke="#2d2520" stroke-width="5" stroke-linecap="round"/>
        <circle cx="-18" cy="0" r="4.5" fill="#2d2520"/><circle cx="19" cy="0" r="4.5" fill="#2d2520"/>
        ${p("0,0 -8,14 8,13", shade(skin, -0.08), `opacity=".75"`)}
        <path d="M-18 23 Q0 9 18 23" fill="none" stroke="#854e4a" stroke-width="5" stroke-linecap="round"/>
      </g>
      ${c(-41, 9, 5, accent, `opacity=".72"`)}${c(40, 9, 5, third, `opacity=".72"`)}
    `,
  );
}

function box(x, y, scale, fill, accent) {
  return g(x, y, scale, `${p("-34,-12 0,-30 36,-12 0,8", shade(fill, 0.25))}${p("-34,-12 0,8 0,45 -34,25", fill)}${p("36,-12 0,8 0,45 36,25", shade(fill, -0.24))}${path("M0 8 V45", `stroke="${shade(fill, -0.35)}" stroke-width="3" opacity=".35"`)}${c(-12, -5, 4, accent, `opacity=".7"`)}`);
}

function receipt(x, y, scale, colors, rotate = 0) {
  const { base, accent } = colors;
  return g(x, y, scale, `<path d="M-33 -45 H33 V45 L21 35 L10 45 L0 35 L-11 45 L-22 35 L-33 45 Z" fill="#fffdf4" stroke="${shade(base, -0.28)}" stroke-width="4" transform="rotate(${rotate})"/><path d="M-15 -18 H18 M-15 0 H20 M-15 18 H9" stroke="${accent}" stroke-width="5" stroke-linecap="round" transform="rotate(${rotate})"/>`);
}

function burst(x, y, scale, fill, rotate = 0) {
  return g(x, y, scale, p("0,-56 14,-19 52,-36 30,-4 58,17 22,17 14,56 -5,25 -39,43 -23,8 -58,-4 -22,-16", fill, `transform="rotate(${rotate})"`));
}

function frame(x, y, scale, colors, rotate = 0) {
  const { base, accent, third } = colors;
  return g(x, y, scale, `<rect x="-46" y="-36" width="92" height="72" rx="7" fill="#fffef8" stroke="${shade(base, -0.25)}" stroke-width="4" transform="rotate(${rotate})"/><g transform="rotate(${rotate})"><circle cx="21" cy="-12" r="8" fill="${third}"/><path d="M-34 23 L-13 1 L3 15 L17 4 L35 23 Z" fill="${shade(accent, 0.25)}"/></g>`);
}

function phone(x, y, scale, colors, rotate = 0) {
  const { base, accent, third } = colors;
  return g(x, y, scale, `<rect x="-34" y="-58" width="68" height="116" rx="13" fill="${shade(base, -0.3)}" transform="rotate(${rotate})"/><rect x="-25" y="-43" width="50" height="82" rx="7" fill="#fffdf7" transform="rotate(${rotate})"/><g transform="rotate(${rotate})"><path d="M-13 -18 H12 M-15 2 H17 M-12 22 H10" stroke="${accent}" stroke-width="5" stroke-linecap="round"/><circle cx="15" cy="-28" r="7" fill="${third}"/></g>`);
}

function label(persona) {
  return `
    <g transform="translate(33 42)">
      <rect x="0" y="-20" width="205" height="36" rx="18" fill="#ffffff" opacity=".92"/>
      ${text(16, 2, persona.chinlish, 16)}
    </g>
  `;
}

function commonStage(colors) {
  return `
    <path d="M54 294 C136 333 386 335 466 292" fill="none" stroke="#e9eee6" stroke-width="18" stroke-linecap="round" opacity=".78"/>
    ${sticker(58, 302, 118, 18, shade(colors.accent, 0.56), -2)}
    ${sticker(340, 58, 110, 16, shade(colors.base, 0.42), 1)}
  `;
}

function scene(persona) {
  const colors = persona;
  const { base, accent, third } = colors;
  const dark = shade(base, -0.35);
  const pale = shade(accent, 0.68);

  switch (persona.scene) {
    case "storageCrypt":
      return `${commonStage(colors)}${box(104, 130, 0.85, base, third)}${box(182, 130, 0.58, shade(base, 0.18), accent)}${box(404, 124, 0.78, base, accent)}${receipt(408, 244, 0.56, colors, 6)}<path d="M218 96 C248 74 276 75 302 98 L302 260 L218 260 Z" fill="${shade(base, -0.2)}" opacity=".88"/><path d="M230 116 H290 M230 149 H290 M230 182 H290" stroke="${third}" stroke-width="7" stroke-linecap="round"/><circle cx="259" cy="232" r="13" fill="#fff8d6" opacity=".85"/>`;
    case "interrogationVault":
      return `${commonStage(colors)}<circle cx="260" cy="178" r="96" fill="${shade(base, 0.45)}" stroke="${dark}" stroke-width="10"/><circle cx="260" cy="178" r="54" fill="#fff9e8" stroke="${dark}" stroke-width="6"/><path d="M260 124 V232 M206 178 H314" stroke="${dark}" stroke-width="7"/><path d="M116 76 L173 171 L60 171 Z" fill="#fff0b2" stroke="${dark}" stroke-width="5"/><path d="M116 106 V139" stroke="${dark}" stroke-width="8" stroke-linecap="round"/>${c(116, 154, 5, dark)}${g(404, 105, 0.92, `<path d="M0 -48 L35 4 H-35 Z" fill="${third}"/><rect x="-18" y="4" width="36" height="70" rx="16" fill="${dark}"/><ellipse cx="0" cy="75" rx="58" ry="18" fill="${accent}" opacity=".42"/>`)}`;
    case "receiptVolcano":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#211818" opacity=".94"/>${burst(261, 88, 1.08, third, 12)}${burst(223, 114, 0.7, accent, -18)}${p("135,300 219,128 276,188 354,300", shade(base, -0.12))}${p("219,128 246,184 276,188", "#ffefb3")}${p("163,300 223,170 249,300", base, `opacity=".88"`)}${receipt(118, 150, 0.58, colors, -18)}${receipt(405, 151, 0.58, colors, 17)}${receipt(331, 95, 0.42, colors, 12)}${lowPolyPerson(262, 256, 0.65, colors, "spike")}`;
    case "paperPrison":
      return `${commonStage(colors)}<rect x="112" y="78" width="296" height="206" rx="20" fill="#fffaf0" stroke="${dark}" stroke-width="7"/><path d="M160 82 V282 M210 82 V282 M260 82 V282 M310 82 V282 M360 82 V282" stroke="${shade(base, -0.1)}" stroke-width="10"/><path d="M111 145 H409 M111 217 H409" stroke="${shade(base, 0.22)}" stroke-width="7"/><g opacity=".92">${box(94, 257, 0.52, base, accent)}${box(430, 109, 0.5, shade(base, 0.2), third)}</g>${lowPolyPerson(260, 244, 0.58, colors, "hood")}`;
    case "spreadsheetCourt":
      return `<rect x="38" y="72" width="172" height="218" rx="14" fill="#fffef7" stroke="${dark}" stroke-width="5"/><path d="M68 118 H180 M68 159 H180 M68 200 H180 M108 88 V270 M148 88 V270" stroke="${pale}" stroke-width="5"/><path d="M286 257 H468 V294 H286 Z" fill="${dark}"/><path d="M336 106 L386 106 L409 255 H312 Z" fill="${shade(base, 0.02)}"/><path d="M321 122 H401" stroke="${third}" stroke-width="8" stroke-linecap="round"/>${g(365, 151, 0.72, `<rect x="-50" y="-28" width="100" height="56" rx="8" fill="#fffdf4" stroke="${dark}" stroke-width="4"/><path d="M-28 -6 H27 M-28 12 H18" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`)}${lowPolyPerson(254, 240, 0.62, colors, "crown")}`;
    case "inventoryThrone":
      return `${commonStage(colors)}<path d="M194 92 H326 L348 285 H172 Z" fill="${shade(base, -0.08)}"/><path d="M200 106 H320 V254 H200 Z" fill="${shade(base, 0.18)}"/><path d="M196 78 L214 108 H306 L324 78 L315 122 H205 Z" fill="${third}"/>${box(99, 235, 0.7, base, accent)}${box(421, 235, 0.7, shade(base, 0.17), third)}${box(103, 119, 0.53, shade(base, 0.25), third)}${box(420, 118, 0.53, base, accent)}${lowPolyPerson(260, 236, 0.66, colors, "crown")}`;
    case "unboxingTheater":
      return `<path d="M25 34 H160 V326 H25 Z M360 34 H495 V326 H360 Z" fill="${shade(base, -0.12)}" opacity=".9"/><path d="M160 34 C195 87 190 279 160 326 M360 34 C325 87 330 279 360 326" fill="${shade(base, 0.08)}" opacity=".8"/><ellipse cx="260" cy="288" rx="150" ry="29" fill="${third}" opacity=".36"/>${burst(260, 115, 0.74, accent)}${box(260, 236, 1.34, base, third)}${lowPolyPerson(96, 239, 0.48, colors, "spike")}${lowPolyPerson(425, 239, 0.48, colors, "helmet")}`;
    case "showroomCamera":
      return `${commonStage(colors)}${phone(110, 171, 0.98, colors, -8)}${g(400, 113, 1, `<rect x="-55" y="-28" width="110" height="72" rx="13" fill="${dark}"/><rect x="-26" y="-45" width="42" height="18" rx="5" fill="${dark}"/><circle cx="4" cy="8" r="24" fill="#fff"/><circle cx="4" cy="8" r="12" fill="${accent}"/>`)}${burst(384, 220, 0.48, third)}<path d="M162 292 C220 253 301 255 357 292" fill="none" stroke="${accent}" stroke-width="13" stroke-linecap="round"/>${lowPolyPerson(263, 235, 0.62, colors, "bob")}`;
    case "soldoutSiren":
      return `<rect x="45" y="65" width="170" height="64" rx="13" fill="#fff" stroke="${dark}" stroke-width="5"/>${text(66, 105, "SOLD OUT", 24, accent)}${g(385, 123, 1.04, `<path d="M0 -56 L45 18 H-45 Z" fill="${third}"/><rect x="-19" y="18" width="38" height="72" rx="17" fill="${dark}"/><path d="M-76 -34 Q0 -92 78 -33" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>`)}${burst(105, 239, 0.64, accent)}${receipt(420, 254, 0.56, colors, -9)}${lowPolyPerson(262, 246, 0.72, colors, "spike")}`;
    case "coldDoorShrine":
      return `<rect x="28" y="24" width="464" height="312" rx="23" fill="#ecf7ff"/><path d="M215 74 H315 C331 74 340 86 340 104 V287 H190 V104 C190 86 199 74 215 74 Z" fill="${shade(base, -0.08)}"/><path d="M218 102 H312 V287 H218 Z" fill="${shade(accent, 0.22)}"/><circle cx="298" cy="196" r="7" fill="${third}"/>${frame(101, 124, 0.66, colors, -9)}${burst(420, 124, 0.42, third)}${g(98, 261, 0.56, `<path d="M0 -35 L32 35 H-32 Z" fill="${base}"/><circle cx="0" cy="-6" r="9" fill="${accent}"/>`)}`;
    case "gossipSpoon":
      return `${commonStage(colors)}${g(245, 175, 1, `<ellipse cx="-34" cy="-22" rx="70" ry="42" fill="${shade(accent, 0.18)}" transform="rotate(-21)"/><path d="M12 4 L158 90" stroke="${shade(accent, -0.1)}" stroke-width="24" stroke-linecap="round"/><circle cx="-50" cy="-25" r="10" fill="#fff"/><circle cx="-15" cy="-32" r="8" fill="#fff"/>`)}<path d="M72 111 C105 72 145 86 151 129" fill="none" stroke="${third}" stroke-width="7" stroke-linecap="round"/><path d="M360 98 C398 58 446 83 448 133" fill="none" stroke="${third}" stroke-width="7" stroke-linecap="round"/>${receipt(112, 251, 0.5, colors, 9)}${lowPolyPerson(369, 247, 0.54, colors, "hood")}`;
    case "weirdBroadcastTower":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="${shade(base, 0.08)}" opacity=".22"/><path d="M260 75 L207 292 H313 Z" fill="${shade(base, -0.16)}"/><path d="M235 160 H285 M225 203 H296 M216 246 H306" stroke="${shade(base, 0.24)}" stroke-width="8"/><circle cx="260" cy="78" r="25" fill="${accent}"/><path d="M200 79 C147 95 117 132 105 181 M320 79 C373 95 403 132 415 181 M174 50 C109 70 62 119 44 188 M346 50 C411 70 458 119 476 188" fill="none" stroke="${third}" stroke-width="7" stroke-linecap="round" opacity=".75"/>${frame(94, 248, 0.56, colors, -11)}${frame(424, 247, 0.56, colors, 11)}`;
    case "tasteMuseum":
      return `${commonStage(colors)}${frame(96, 123, 0.82, colors, -2)}${frame(420, 123, 0.82, colors, 2)}${g(260, 128, 0.9, `<path d="M-44 -18 H44 V38 H-44 Z" fill="#fffdf6" stroke="${dark}" stroke-width="5"/><path d="M-24 8 H24" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`)}${g(259, 251, 0.84, `<path d="M-62 -24 H62 V18 H-62 Z" fill="${dark}"/><path d="M-22 18 H22 L38 58 H-38 Z" fill="${shade(base, 0.08)}"/>`)}${lowPolyPerson(260, 248, 0.55, colors, "bald")}`;
    case "flavorTemple":
      return `<path d="M79 289 L260 78 L443 289 Z" fill="${shade(base, 0.22)}"/><path d="M137 289 L260 145 L384 289 Z" fill="#fffdf7" opacity=".82"/><path d="M117 110 H403" stroke="${dark}" stroke-width="13" stroke-linecap="round"/><path d="M168 247 H352" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>${burst(260, 89, 0.52, third)}${lowPolyPerson(158, 267, 0.42, colors, "hood")}${lowPolyPerson(362, 267, 0.42, colors, "helmet")}${receipt(260, 236, 0.55, colors, 0)}`;
    case "trendTilt":
      return `${commonStage(colors)}<path d="M258 73 L279 292" stroke="${dark}" stroke-width="13" stroke-linecap="round"/><path d="M141 116 H341 L311 157 H141 Z" fill="${accent}" transform="rotate(-12 240 136)"/><path d="M190 185 H421 L390 226 H190 Z" fill="${third}" transform="rotate(10 304 205)"/><path d="M83 238 H263 L233 279 H83 Z" fill="${shade(base, 0.22)}" transform="rotate(-8 173 258)"/>${lowPolyPerson(381, 252, 0.55, colors, "spike")}`;
    case "soloStageMask":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#22172a" opacity=".92"/><polygon points="90,62 198,62 255,331 38,331" fill="${shade(accent, 0.35)}" opacity=".55"/><polygon points="322,62 430,62 486,331 270,331" fill="${shade(third, 0.28)}" opacity=".42"/><path d="M200 124 C225 91 292 91 318 124 C314 202 296 249 260 267 C223 249 205 202 200 124 Z" fill="#fff6df"/><path d="M225 151 Q242 139 257 154 M295 151 Q278 139 263 154" stroke="${dark}" stroke-width="7" stroke-linecap="round"/><path d="M230 207 Q260 231 292 207" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>${lowPolyPerson(102, 263, 0.42, colors, "hood")}`;
    case "disasterDiorama":
      return `${commonStage(colors)}<path d="M71 270 H449" stroke="${shade(base, 0.45)}" stroke-width="14" stroke-linecap="round"/><path d="M110 270 V188 H166 V270 M190 270 V138 H254 V270 M278 270 V172 H338 V270 M365 270 V204 H423 V270" fill="${shade(base, 0.22)}"/><path d="M190 138 L221 111 L254 138" fill="${third}"/><path d="M118 208 H158 M202 160 H242 M288 192 H328 M374 224 H414" stroke="#fff" stroke-width="5" opacity=".7"/>${g(369, 130, 0.75, `<path d="M-33 42 L-8 -35 L18 42 Z" fill="${accent}"/><circle cx="-4" cy="-44" r="23" fill="${shade(accent, 0.18)}"/><path d="M-26 6 L-67 -20 M17 6 L61 -18" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>`)}${lowPolyPerson(127, 247, 0.45, colors, "crown")}`;
    case "nuclearCollage":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#1d1a20" opacity=".94"/>${burst(260, 160, 1.8, accent)}${burst(260, 160, 1.15, third, 21)}<path d="M224 247 C213 202 232 174 260 174 C289 174 308 202 296 247 Z" fill="${shade(base, 0.12)}"/><rect x="203" y="247" width="114" height="33" rx="16" fill="${shade(base, 0.22)}"/>${frame(95, 100, 0.55, colors, -17)}${frame(423, 98, 0.55, colors, 17)}${receipt(106, 260, 0.46, colors, 15)}${phone(420, 260, 0.43, colors, -9)}`;
    case "midnightDraftSea":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#111827" opacity=".94"/><circle cx="399" cy="90" r="45" fill="${third}"/><circle cx="421" cy="78" r="43" fill="#111827"/><path d="M46 263 C110 233 151 289 220 263 C294 234 338 286 474 252 L474 342 H46 Z" fill="${shade(base, 0.12)}" opacity=".74"/>${receipt(139, 166, 0.6, colors, -12)}${receipt(309, 219, 0.55, colors, 9)}${lowPolyPerson(252, 247, 0.62, colors, "bald")}`;
    case "puppetHeart":
      return `${commonStage(colors)}<path d="M260 246 C167 184 174 96 226 96 C247 96 260 117 260 117 C260 117 273 96 294 96 C346 96 353 184 260 246 Z" fill="${accent}" opacity=".9"/><path d="M170 47 C211 87 217 120 224 158 M350 47 C309 87 303 120 296 158 M260 38 V118" fill="none" stroke="${dark}" stroke-width="6" stroke-linecap="round"/><circle cx="170" cy="47" r="8" fill="${third}"/><circle cx="350" cy="47" r="8" fill="${third}"/>${lowPolyPerson(103, 254, 0.45, colors, "bob")}${lowPolyPerson(420, 254, 0.45, colors, "helmet")}`;
    case "megaphoneStorm":
      return `${commonStage(colors)}${g(145, 168, 1.15, `${p("-64,-12 9,-42 9,42 -64,12", accent)}<rect x="-86" y="-19" width="26" height="38" rx="8" fill="${dark}"/><path d="M27 -37 Q85 -17 92 0 Q85 17 27 37" fill="none" stroke="${third}" stroke-width="8" stroke-linecap="round"/>`)}<ellipse cx="399" cy="130" rx="71" ry="37" fill="${shade(base, 0.56)}"/><ellipse cx="356" cy="120" rx="41" ry="30" fill="${shade(base, 0.64)}"/><path d="M369 177 L350 220 M410 178 L392 230 M443 174 L424 214" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>${burst(407, 252, 0.46, third)}`;
    case "elegantRuins":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#fbfaf5"/><path d="M80 282 L126 210 H171 L206 282 Z M323 282 L365 200 H417 L458 282 Z" fill="${shade(base, 0.44)}"/><path d="M110 194 H188 M348 184 H434" stroke="${dark}" stroke-width="12" stroke-linecap="round"/><path d="M221 119 H299 V282 H221 Z" fill="${shade(accent, 0.55)}"/><path d="M232 144 H288 M232 178 H288 M232 212 H288" stroke="#fff" stroke-width="7" stroke-linecap="round"/><ellipse cx="260" cy="295" rx="180" ry="18" fill="${shade(base, 0.68)}"/>${receipt(100, 125, 0.48, colors, -10)}${box(425, 128, 0.44, base, third)}`;
    case "comfortNest":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="${shade(accent, 0.78)}"/><path d="M102 237 C127 136 395 136 420 237 C380 298 143 298 102 237 Z" fill="#fffdf8"/><path d="M136 234 C165 192 354 192 383 234" fill="none" stroke="${shade(base, 0.44)}" stroke-width="18" stroke-linecap="round"/><path d="M260 83 C188 91 147 132 141 205 H379 C373 132 332 91 260 83 Z" fill="${shade(third, 0.42)}"/><path d="M260 82 V206" stroke="${dark}" stroke-width="6"/><path d="M203 145 C225 116 295 116 317 145" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>${lowPolyPerson(260, 239, 0.54, colors, "hood")}${c(93, 126, 19, accent, `opacity=".8"`)}${c(426, 128, 17, third, `opacity=".8"`)}`;
    case "moodWeatherStation":
      return `${commonStage(colors)}<rect x="102" y="86" width="316" height="170" rx="24" fill="#fffdf7" stroke="${dark}" stroke-width="6"/><path d="M132 143 H388 M132 197 H388 M260 91 V251" stroke="${shade(base, 0.55)}" stroke-width="5"/><ellipse cx="196" cy="144" rx="43" ry="25" fill="${shade(base, 0.54)}"/><circle cx="333" cy="144" r="34" fill="${third}"/><path d="M190 186 L175 224 M215 186 L201 229" stroke="${accent}" stroke-width="7" stroke-linecap="round"/><path d="M317 197 H361" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>${g(260, 279, 0.62, `<path d="M-32 0 H32 L47 50 H-47 Z" fill="${base}"/>`)}`;
    case "soloDramaMask":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#241927" opacity=".94"/><path d="M70 300 C143 253 377 253 450 300" fill="${shade(base, 0.24)}"/><path d="M184 112 C211 75 250 92 260 128 C247 213 216 252 174 232 C152 182 155 142 184 112 Z" fill="#fff4db"/><path d="M336 112 C309 75 270 92 260 128 C273 213 304 252 346 232 C368 182 365 142 336 112 Z" fill="${shade(third, 0.36)}"/><path d="M190 154 Q207 143 224 156 M296 156 Q313 143 330 154" stroke="${dark}" stroke-width="7" stroke-linecap="round"/><path d="M204 207 Q233 230 260 207 M316 207 Q287 230 260 207" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>${lowPolyPerson(260, 275, 0.42, colors, "spike")}`;
    case "friendFeedRocket":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#182139"/><path d="M91 292 C154 240 241 249 300 206 C346 171 381 119 450 82" fill="none" stroke="${shade(third, 0.2)}" stroke-width="12" stroke-linecap="round" opacity=".75"/>${phone(111, 187, 0.82, colors, -9)}${g(329, 152, 1, `<path d="M-52 24 C-24 -64 59 -72 70 7 C35 16 18 34 6 69 C-18 46 -32 34 -52 24 Z" fill="${accent}"/><circle cx="14" cy="-12" r="18" fill="#fff"/><path d="M-58 32 L-103 57 M-31 47 L-62 89" stroke="${third}" stroke-width="9" stroke-linecap="round"/>`)}${c(419, 101, 11, "#fff6c7")}${c(249, 73, 6, "#fff6c7")}${g(405, 238, 0.54, `<path d="M0 34 C-38 7 -36 -24 -12 -24 C-4 -24 0 -17 0 -17 C0 -17 4 -24 12 -24 C36 -24 38 7 0 34 Z" fill="${third}"/>`)}`;
    case "cosmicRomanceShip":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#151222" opacity=".96"/><circle cx="112" cy="102" r="6" fill="#fff6c7"/><circle cx="426" cy="83" r="8" fill="#fff6c7"/><circle cx="389" cy="257" r="5" fill="#fff6c7"/><path d="M66 282 C146 207 218 232 281 173 C335 121 371 77 464 55" fill="none" stroke="${shade(third, 0.12)}" stroke-width="13" stroke-linecap="round" opacity=".82"/>${burst(104, 253, 0.76, accent)}${g(278, 162, 1.2, `<path d="M-82 12 C-35 -69 81 -57 101 1 C48 9 22 31 5 77 C-25 45 -53 28 -82 12 Z" fill="${accent}"/><circle cx="17" cy="-9" r="22" fill="#fff"/><path d="M-85 23 L-135 49 M-51 49 L-88 95" stroke="${third}" stroke-width="10" stroke-linecap="round"/><path d="M52 28 C71 44 83 62 88 85" fill="none" stroke="${shade(accent, 0.35)}" stroke-width="8" stroke-linecap="round"/>`)}${g(382, 248, 0.58, `<path d="M0 34 C-38 7 -36 -24 -12 -24 C-4 -24 0 -17 0 -17 C0 -17 4 -24 12 -24 C36 -24 38 7 0 34 Z" fill="${third}"/>`)}${lowPolyPerson(125, 240, 0.38, colors, "crown")}`;
    default:
      return commonStage(colors);
  }
}

function renderSvg(persona) {
  const bg = shade(persona.accent, 0.84);
  const bg2 = shade(persona.third, 0.78);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="720" viewBox="0 0 520 360" role="img" aria-labelledby="title desc">
  <title id="title">${esc(persona.name)}</title>
  <desc id="desc">Low-poly sticker persona scene: ${esc(persona.name)}.</desc>
  <rect width="520" height="360" rx="28" fill="#ffffff"/>
  <rect x="18" y="18" width="484" height="324" rx="24" fill="${bg}" opacity=".32"/>
  <path d="M33 72 H492 M33 118 H492 M33 164 H492 M33 210 H492 M33 256 H492 M78 30 V332 M142 30 V332 M206 30 V332 M270 30 V332 M334 30 V332 M398 30 V332 M462 30 V332" stroke="${shade(persona.base, 0.76)}" stroke-width="1" opacity=".4"/>
  <circle cx="83" cy="78" r="58" fill="${bg2}" opacity=".22"/>
  <circle cx="435" cy="281" r="62" fill="${shade(persona.base, 0.76)}" opacity=".18"/>
  ${scene(persona)}
  ${label(persona)}
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const persona of personas) {
  writeFileSync(join(outDir, `${persona.slug}.svg`), renderSvg(persona));
}

console.log(`Generated ${personas.length} persona SVGs in ${outDir}`);
