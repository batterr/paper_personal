import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "personas");

const personas = [
  ["a1-b1-c1", "库存尸", "Ku-Stock-She", "head", "shy", "tired", "storage", "#b98148", "#6d8b5f"],
  ["a1-b1-c2", "熟人毒仓", "Familiar-Do-Chang", "bust", "point", "sharp", "warning", "#8f704a", "#75825d"],
  ["a1-b1-c3", "补款喷子", "Boo-Kuan-Pen", "side", "judge", "angry", "review", "#b46b45", "#2f7d53"],
  ["a1-b2-c1", "囤纸牢", "Tun-Paper-Lao", "tinyScene", "clutch", "blank", "shelf", "#b89a62", "#7b9367"],
  ["a1-b2-c2", "表格阎王", "Excel-Yan-Wang", "desk", "write", "boss", "spreadsheet", "#788e63", "#2f5d49"],
  ["a1-b2-c3", "盘货暴君", "Stock-Pan-Boss", "giant", "command", "boss", "inventory", "#6f8760", "#315845"],
  ["a1-b3-c1", "拆箱戏癫", "Try-Box-Dian", "floor", "armsUp", "wide", "unbox", "#d19955", "#f1b84f"],
  ["a1-b3-c2", "晒单显眼包", "Show-Dan-Bag", "poster", "present", "wide", "camera", "#d67655", "#efb342"],
  ["a1-b3-c3", "断货疯批", "Soldout-Feng-Pi", "run", "scream", "panic", "soldout", "#bd5b48", "#e64b3f"],
  ["a2-b1-c1", "冷门神经", "Cold-Door-Nerve", "head", "shy", "sideEye", "oddShelf", "#6d668c", "#60b783"],
  ["a2-b1-c2", "怪话漏勺", "Guai-Talk-Spoon", "bust", "whisper", "smirk", "secret", "#635c87", "#68bf9b"],
  ["a2-b1-c3", "邪门广播", "Xie-Men-FM", "side", "command", "sharp", "radio", "#5d5682", "#5fb36f"],
  ["a2-b2-c1", "审美暴君", "Taste-Bao-Jun", "giant", "judge", "boss", "museum", "#667059", "#9aad61"],
  ["a2-b2-c2", "怪味教主", "Guai-Flavor-Joe", "desk", "teach", "calm", "classroom", "#587266", "#78bc96"],
  ["a2-b2-c3", "带歪总监", "Die-Wai-Director", "poster", "point", "smirk", "trend", "#4e706b", "#83bd5c"],
  ["a2-b3-c1", "独演疯批", "Solo-Feng-Pi", "stage", "armsUp", "wide", "spotlight", "#76578c", "#d474aa"],
  ["a2-b3-c2", "造景戏霸", "Scene-Drama-Ba", "floor", "present", "smirk", "gallery", "#855785", "#68bfa8"],
  ["a2-b3-c3", "怪图核弹", "Guai-Pic-Boom", "giant", "scream", "wide", "explosion", "#b83f45", "#edbf3f"],
  ["a3-b1-c1", "深夜废稿", "Midnight-Fay-Gao", "head", "collapse", "tired", "midnight", "#536682", "#93add4"],
  ["a3-b1-c2", "情绪勒索", "Feel-Le-Suo", "bust", "present", "sad", "strings", "#69658c", "#d87496"],
  ["a3-b1-c3", "破防喇叭", "Po-Fang-Laba", "side", "command", "panic", "alarm", "#62739d", "#dd637d"],
  ["a3-b2-c1", "体面废墟", "Face-Ruin", "desk", "clutch", "tired", "ruins", "#6b7891", "#98c8bd"],
  ["a3-b2-c2", "气氛保姆", "Vibe-Bao-Mu", "bust", "hold", "calm", "comfort", "#739581", "#df91a8"],
  ["a3-b2-c3", "情绪天气台", "Mood-Weather-TV", "poster", "command", "boss", "weather", "#66879b", "#e9b84d"],
  ["a3-b3-c1", "独角戏精", "Solo-Drama-Jing", "stage", "armsUp", "sad", "soloStage", "#6c557f", "#e9ad63"],
  ["a3-b3-c2", "朋友圈戏命", "Friend-Zone-Show", "floor", "present", "wide", "series", "#86608a", "#e9857d"],
  ["hidden-0", "宇宙戏癫", "Cosmo-Drama-Dian", "cosmic", "scream", "panic", "cosmos", "#9e416c", "#ebcf56"],
].map(([slug, name, chinlish, layout, pose, mood, scene, body, accent]) => ({
  slug,
  name,
  chinlish,
  layout,
  pose,
  mood,
  scene,
  body,
  accent,
  hair: "#24282b",
}));

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (char) => {
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

function polygon(points, fill, attrs = "") {
  return `<polygon points="${points}" fill="${fill}" ${attrs}/>`;
}

function icon(kind, x, y, scale, color, accent) {
  const dark = shade(color, -0.28);
  const light = shade(color, 0.28);
  const g = (body) => `<g transform="translate(${x} ${y}) scale(${scale})">${body}</g>`;

  switch (kind) {
    case "box":
      return g(`${polygon("-30,-12 0,-27 32,-12 0,6", light)}${polygon("-30,-12 0,6 0,42 -30,24", color)}${polygon("32,-12 0,6 0,42 32,24", dark)}`);
    case "receipt":
      return g(`<path d="M-26 -38 H26 V38 L15 30 L4 38 L-7 30 L-18 38 L-26 30 Z" fill="#fffdf4" stroke="${dark}" stroke-width="4"/><path d="M-12 -14 H14 M-12 2 H16 M-12 18 H8" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`);
    case "warning":
      return g(`${polygon("0,-45 44,34 -44,34", "#fff1b8", `stroke="${dark}" stroke-width="4"`)}<path d="M0 -18 V10" stroke="${dark}" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="23" r="5" fill="${dark}"/>`);
    case "chart":
      return g(`<rect x="-45" y="-35" width="90" height="70" rx="8" fill="#fffdf5" stroke="${dark}" stroke-width="4"/><path d="M-28 18 L-8 2 L8 10 L30 -18" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`);
    case "tag":
      return g(`<path d="M-40 -18 H10 L40 12 L12 40 L-40 -12 Z" fill="${accent}"/><circle cx="-24" cy="-7" r="6" fill="#fff8e8"/><path d="M-2 6 H18" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>`);
    case "camera":
      return g(`<rect x="-42" y="-25" width="84" height="56" rx="9" fill="${dark}"/><rect x="-22" y="-39" width="35" height="16" rx="5" fill="${dark}"/><circle cx="3" cy="4" r="18" fill="#fff"/><circle cx="3" cy="4" r="10" fill="${accent}"/>`);
    case "megaphone":
      return g(`${polygon("-42,-8 6,-28 6,28 -42,8", accent)}<rect x="-55" y="-11" width="17" height="22" rx="5" fill="${dark}"/><path d="M15 -24 Q43 -12 48 0 Q43 12 15 24" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`);
    case "cloud":
      return g(`<ellipse cx="-18" cy="9" rx="27" ry="17" fill="${shade(accent, 0.5)}"/><ellipse cx="9" cy="1" rx="31" ry="22" fill="${shade(accent, 0.38)}"/><ellipse cx="34" cy="11" rx="21" ry="14" fill="${shade(accent, 0.45)}"/><path d="M-18 37 L-25 54 M8 36 L1 55 M32 36 L24 53" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`);
    case "burst":
      return g(`${polygon("0,-54 13,-20 49,-35 29,-4 56,17 21,17 14,54 -5,24 -36,42 -22,8 -56,-4 -20,-15", accent)}`);
    case "heart":
      return g(`<path d="M0 34 C-38 7 -36 -24 -12 -24 C-4 -24 0 -17 0 -17 C0 -17 4 -24 12 -24 C36 -24 38 7 0 34 Z" fill="${accent}"/>`);
    case "moon":
      return g(`<path d="M20 -34 C-7 -25 -20 -2 -13 21 C-5 50 29 52 49 29 C26 34 4 22 -1 2 C-6 -15 2 -29 20 -34 Z" fill="${accent}"/>`);
    case "frame":
      return g(`<rect x="-42" y="-33" width="84" height="66" rx="6" fill="#fff" stroke="${dark}" stroke-width="4"/><circle cx="20" cy="-9" r="9" fill="${accent}"/><path d="M-32 22 L-12 -2 L4 13 L18 1 L34 22 Z" fill="${shade(accent, 0.35)}"/>`);
    case "radio":
      return g(`<rect x="-40" y="-24" width="80" height="54" rx="8" fill="${dark}"/><circle cx="-18" cy="3" r="13" fill="${accent}"/><path d="M8 -6 H28 M8 8 H25" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M-26 -25 L-48 -52" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>`);
    case "star":
      return g(`${polygon("0,-42 10,-12 42,-12 16,7 25,39 0,20 -25,39 -16,7 -42,-12 -10,-12", accent)}`);
    case "string":
      return g(`<path d="M-42 -24 C-14 -55 15 15 43 -22" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/><circle cx="-42" cy="-24" r="8" fill="${accent}"/><circle cx="43" cy="-22" r="8" fill="${accent}"/>`);
    default:
      return "";
  }
}

function label(persona) {
  return `
    <g transform="translate(34 42)">
      <rect x="0" y="-20" width="184" height="36" rx="18" fill="#ffffff" opacity=".9"/>
      <text x="16" y="2" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="800" fill="#26302c">${escapeXml(persona.chinlish)}</text>
    </g>
  `;
}

function scene(sceneName, persona) {
  const { body, accent } = persona;
  const dark = shade(body, -0.3);
  const pale = shade(accent, 0.72);

  const baseShelf = `
    <rect x="44" y="246" width="430" height="16" rx="8" fill="${shade(accent, 0.65)}" opacity=".7"/>
    <rect x="58" y="174" width="150" height="12" rx="6" fill="${shade(body, 0.35)}" opacity=".75"/>
    <rect x="326" y="170" width="132" height="12" rx="6" fill="${shade(body, 0.35)}" opacity=".75"/>
  `;

  switch (sceneName) {
    case "storage":
      return `${baseShelf}${icon("box", 86, 138, 0.72, body, accent)}${icon("receipt", 402, 130, 0.76, body, accent)}${icon("tag", 116, 236, 0.55, body, accent)}`;
    case "warning":
      return `${icon("warning", 104, 132, 0.86, body, accent)}${icon("box", 392, 246, 0.7, body, accent)}<path d="M345 91 L466 91" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`;
    case "review":
      return `${icon("receipt", 91, 127, 0.88, body, accent)}${icon("megaphone", 412, 130, 0.75, body, accent)}${icon("warning", 406, 257, 0.58, body, accent)}`;
    case "shelf":
      return `${baseShelf}${icon("box", 94, 128, 0.72, body, accent)}${icon("box", 157, 128, 0.62, shade(body, 0.16), accent)}${icon("box", 391, 124, 0.72, body, accent)}${icon("receipt", 108, 252, 0.5, body, accent)}`;
    case "spreadsheet":
      return `<rect x="45" y="82" width="156" height="210" rx="14" fill="#fffef6" stroke="${dark}" stroke-width="4"/><path d="M70 124 H176 M70 165 H176 M70 206 H176 M110 96 V272 M150 96 V272" stroke="${pale}" stroke-width="5"/><path d="M317 90 H456 M317 128 H432" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>${icon("chart", 389, 246, 0.7, body, accent)}`;
    case "inventory":
      return `${icon("chart", 104, 122, 0.75, body, accent)}${icon("box", 410, 112, 0.78, body, accent)}${icon("box", 83, 252, 0.56, shade(body, 0.2), accent)}<rect x="342" y="212" width="130" height="62" rx="14" fill="#fff" stroke="${dark}" stroke-width="4"/><text x="359" y="251" font-family="Arial" font-size="24" font-weight="900" fill="${dark}">AUDIT</text>`;
    case "unbox":
      return `${icon("box", 120, 238, 1.12, body, accent)}${icon("burst", 390, 116, 0.72, body, accent)}${icon("star", 84, 119, 0.45, body, accent)}`;
    case "camera":
      return `${icon("camera", 402, 104, 0.85, body, accent)}${icon("frame", 105, 234, 0.7, body, accent)}${icon("star", 90, 111, 0.45, body, accent)}`;
    case "soldout":
      return `<rect x="54" y="70" width="150" height="58" rx="12" fill="#fff" stroke="${dark}" stroke-width="4"/><text x="72" y="106" font-family="Arial" font-size="24" font-weight="900" fill="${accent}">SOLD OUT</text>${icon("burst", 405, 112, 0.7, body, accent)}${icon("tag", 112, 252, 0.62, body, accent)}`;
    case "oddShelf":
      return `${baseShelf}${icon("frame", 102, 128, 0.68, body, accent)}${icon("burst", 404, 120, 0.5, body, accent)}${icon("tag", 406, 251, 0.54, body, accent)}`;
    case "secret":
      return `${icon("string", 112, 142, 0.78, body, accent)}${icon("receipt", 408, 128, 0.62, body, accent)}${icon("frame", 116, 255, 0.56, body, accent)}`;
    case "radio":
      return `${icon("radio", 102, 130, 0.92, body, accent)}${icon("megaphone", 408, 127, 0.72, body, accent)}${icon("burst", 397, 253, 0.42, body, accent)}`;
    case "museum":
      return `${icon("frame", 100, 123, 0.78, body, accent)}${icon("frame", 407, 124, 0.78, body, accent)}<rect x="205" y="275" width="110" height="18" rx="9" fill="${dark}" opacity=".35"/>`;
    case "classroom":
      return `<rect x="48" y="78" width="160" height="104" rx="10" fill="#fffef6" stroke="${dark}" stroke-width="4"/><path d="M76 118 H180 M76 148 H146" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>${icon("star", 410, 120, 0.54, body, accent)}${icon("receipt", 398, 255, 0.56, body, accent)}`;
    case "trend":
      return `${icon("chart", 106, 123, 0.82, body, accent)}${icon("megaphone", 405, 238, 0.68, body, accent)}<path d="M350 83 C390 58 431 58 462 87" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`;
    case "spotlight":
    case "soloStage":
      return `<polygon points="96,72 198,72 255,342 36,342" fill="${shade(accent, 0.55)}" opacity=".58"/><polygon points="324,72 426,72 484,342 265,342" fill="${shade(accent, 0.55)}" opacity=".45"/><rect x="95" y="64" width="104" height="16" rx="6" fill="${dark}"/><rect x="323" y="64" width="104" height="16" rx="6" fill="${dark}"/>`;
    case "gallery":
      return `${icon("frame", 92, 120, 0.78, body, accent)}${icon("frame", 420, 118, 0.75, body, accent)}${icon("camera", 406, 260, 0.52, body, accent)}`;
    case "explosion":
      return `${icon("burst", 103, 128, 1.0, body, accent)}${icon("burst", 420, 108, 0.74, body, accent)}${icon("radio", 104, 260, 0.52, body, accent)}`;
    case "midnight":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#111827" opacity=".9"/><circle cx="401" cy="95" r="44" fill="${shade(accent, 0.18)}"/><circle cx="418" cy="82" r="43" fill="#111827"/><path d="M76 266 H195" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>${icon("receipt", 108, 174, 0.62, body, accent)}`;
    case "strings":
      return `${icon("string", 110, 116, 0.95, body, accent)}${icon("heart", 407, 118, 0.7, body, accent)}${icon("frame", 398, 254, 0.52, body, accent)}`;
    case "alarm":
      return `${icon("megaphone", 102, 123, 0.86, body, accent)}${icon("cloud", 410, 125, 0.66, body, accent)}${icon("warning", 405, 258, 0.52, body, accent)}`;
    case "ruins":
      return `${icon("receipt", 100, 126, 0.66, body, accent)}<path d="M55 268 L115 218 L150 268 Z M377 268 L434 210 L465 268 Z" fill="${shade(body, 0.25)}" opacity=".72"/>${icon("cloud", 410, 114, 0.56, body, accent)}`;
    case "comfort":
      return `${icon("heart", 105, 122, 0.7, body, accent)}${icon("cloud", 405, 119, 0.62, body, accent)}${icon("string", 112, 258, 0.52, body, accent)}`;
    case "weather":
      return `${icon("cloud", 105, 121, 0.76, body, accent)}${icon("star", 410, 104, 0.54, body, accent)}<rect x="352" y="211" width="118" height="66" rx="16" fill="#fff" stroke="${dark}" stroke-width="4"/><path d="M372 249 H444" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>`;
    case "series":
      return `${icon("frame", 93, 116, 0.68, body, accent)}${icon("frame", 416, 116, 0.68, body, accent)}${icon("frame", 108, 258, 0.54, body, accent)}${icon("heart", 410, 258, 0.5, body, accent)}`;
    case "cosmos":
      return `<rect x="18" y="18" width="484" height="324" rx="24" fill="#161320" opacity=".95"/><circle cx="112" cy="104" r="5" fill="#fff6c7"/><circle cx="429" cy="84" r="7" fill="#fff6c7"/><circle cx="381" cy="250" r="4" fill="#fff6c7"/>${icon("burst", 102, 253, 0.68, body, accent)}${icon("star", 407, 128, 0.64, body, accent)}`;
    default:
      return "";
  }
}

const layoutMap = {
  full: { tx: 260, ty: 237, s: 1, head: 1 },
  head: { tx: 260, ty: 238, s: 1.22, head: 1.72 },
  bust: { tx: 260, ty: 260, s: 1.18, head: 1.2 },
  side: { tx: 205, ty: 246, s: 1.02, head: 1.05 },
  tinyScene: { tx: 340, ty: 256, s: 0.72, head: 1.05 },
  desk: { tx: 270, ty: 258, s: 0.92, head: 1.08 },
  giant: { tx: 260, ty: 259, s: 1.12, head: 1.42 },
  floor: { tx: 260, ty: 238, s: 1, head: 1.02 },
  poster: { tx: 250, ty: 247, s: 0.94, head: 1.15 },
  run: { tx: 285, ty: 245, s: 0.95, head: 1.05 },
  stage: { tx: 260, ty: 246, s: 1.06, head: 1.18 },
  cosmic: { tx: 260, ty: 251, s: 1.12, head: 1.5 },
};

function arms(pose, skin, body, accent) {
  const sleeve = shade(body, 0.08);
  const hand = skin;
  const poses = {
    shy: [[-38, 8, -61, 44], [38, 8, 61, 44]],
    clutch: [[-38, 10, -22, 52], [38, 10, 22, 52]],
    point: [[-38, 8, -91, -7], [38, 8, 65, 34]],
    judge: [[-38, 8, -83, 10], [38, 8, 83, -6]],
    write: [[-38, 10, -60, 48], [38, 10, 88, 34]],
    command: [[-38, 8, -86, -30], [38, 8, 86, -30]],
    armsUp: [[-38, 8, -75, -58], [38, 8, 75, -58]],
    present: [[-38, 8, -95, 17], [38, 8, 95, 17]],
    scream: [[-38, 8, -88, -46], [38, 8, 88, -46]],
    whisper: [[-38, 8, -83, 0], [38, 8, 62, 35]],
    teach: [[-38, 8, -82, 20], [38, 8, 92, -16]],
    collapse: [[-38, 8, -68, 65], [38, 8, 68, 65]],
    hold: [[-38, 8, -76, 14], [38, 8, 76, 14]],
  }[pose] ?? [[-38, 8, -64, 35], [38, 8, 64, 35]];

  return poses
    .map(([sx, sy, ex, ey]) => {
      const mx = (sx + ex) / 2;
      const my = (sy + ey) / 2;
      return `
        <path d="M${sx} ${sy} L${mx} ${my} L${ex} ${ey}" fill="none" stroke="${sleeve}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="${mx}" cy="${my}" r="4" fill="${accent}" opacity=".58"/>
        <circle cx="${ex}" cy="${ey}" r="10" fill="${hand}"/>
        <circle cx="${ex}" cy="${ey}" r="5" fill="${shade(hand, -0.08)}" opacity=".35"/>
      `;
    })
    .join("");
}

function face(mood, skin, accent) {
  const eye = "#2d2520";
  const mouth = "#854e4a";
  const brows = {
    tired: `<path d="M-23 -15 L-7 -13 M9 -13 L25 -15" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    sharp: `<path d="M-27 -18 L-7 -10 M8 -10 L28 -18" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    angry: `<path d="M-27 -20 L-6 -10 M7 -10 L28 -20" stroke="${eye}" stroke-width="6" stroke-linecap="round"/>`,
    boss: `<path d="M-28 -15 H-6 M6 -15 H29" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    wide: `<path d="M-28 -22 L-8 -15 M8 -15 L28 -22" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    panic: `<path d="M-29 -24 L-8 -12 M8 -12 L29 -24" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    sideEye: `<path d="M-28 -14 L-8 -18 M8 -18 L28 -14" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    smirk: `<path d="M-27 -15 L-8 -18 M8 -18 L27 -15" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    sad: `<path d="M-28 -10 L-8 -20 M8 -20 L28 -10" stroke="${eye}" stroke-width="5" stroke-linecap="round"/>`,
    calm: `<path d="M-26 -15 H-8 M8 -15 H26" stroke="${eye}" stroke-width="4" stroke-linecap="round"/>`,
    blank: `<path d="M-24 -14 H-9 M9 -14 H24" stroke="${eye}" stroke-width="4" stroke-linecap="round"/>`,
  }[mood] ?? "";

  const mouthShape = {
    tired: `<path d="M-17 20 Q0 8 17 20" fill="none" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    sharp: `<path d="M-18 18 L18 15" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    angry: `<ellipse cx="0" cy="18" rx="10" ry="9" fill="${mouth}"/>`,
    boss: `<path d="M-18 17 H18" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    wide: `<ellipse cx="0" cy="17" rx="11" ry="9" fill="${mouth}"/>`,
    panic: `<path d="M-18 24 Q0 5 19 24" fill="none" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    sideEye: `<path d="M-16 16 Q-2 22 16 15" fill="none" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    smirk: `<path d="M-18 15 Q0 25 22 12" fill="none" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    sad: `<path d="M-18 24 Q0 7 18 24" fill="none" stroke="${mouth}" stroke-width="5" stroke-linecap="round"/>`,
    calm: `<path d="M-16 16 Q0 20 16 16" fill="none" stroke="${mouth}" stroke-width="4" stroke-linecap="round"/>`,
    blank: `<path d="M-17 17 H17" stroke="${mouth}" stroke-width="4" stroke-linecap="round"/>`,
  }[mood] ?? "";

  const tears = mood === "sad" || mood === "panic" ? `<path d="M31 1 C41 14 39 27 28 29 C20 24 23 11 31 1 Z" fill="${shade(accent, 0.4)}"/>` : "";

  return `
    ${brows}
    <circle cx="-18" cy="-1" r="${mood === "wide" || mood === "panic" ? 6 : 4}" fill="${eye}"/>
    <circle cx="19" cy="-1" r="${mood === "wide" || mood === "panic" ? 6 : 4}" fill="${eye}"/>
    <polygon points="0,0 -8,14 8,13" fill="${shade(skin, -0.08)}" opacity=".75"/>
    ${mouthShape}
    ${tears}
  `;
}

function figure(persona) {
  const layout = layoutMap[persona.layout] ?? layoutMap.full;
  const skin = "#efd3bc";
  const skinLight = "#f6dfcd";
  const skinDark = "#d8b298";
  const body = persona.body;
  const hair = persona.hair;
  const hairLight = shade(hair, 0.2);
  const hairDark = shade(hair, -0.2);
  const showLegs = !["head", "bust"].includes(persona.layout);

  return `
    <g transform="translate(${layout.tx} ${layout.ty}) scale(${layout.s})">
      <ellipse cx="0" cy="92" rx="78" ry="14" fill="#17201d" opacity=".14"/>
      ${showLegs ? `
        ${polygon("-28,50 -52,91 -32,91 -10,53", shade(body, -0.26))}
        ${polygon("28,50 52,91 32,91 10,53", shade(body, -0.16))}
        <rect x="-58" y="88" width="36" height="9" rx="4" fill="#1e2221"/>
        <rect x="23" y="88" width="36" height="9" rx="4" fill="#1e2221"/>
      ` : ""}
      ${arms(persona.pose, skin, body, persona.accent)}
      ${polygon("-47,-10 47,-10 63,62 -63,62", body)}
      ${polygon("-47,-10 0,7 -63,62", shade(body, 0.14), `opacity=".78"`)}
      ${polygon("47,-10 0,7 63,62", shade(body, -0.12), `opacity=".72"`)}
      <polygon points="-17,-25 17,-25 15,-8 -15,-8" fill="${skinDark}"/>
      <g transform="translate(0 -74) scale(${layout.head})">
        ${polygon("-54,-30 -17,-65 38,-58 66,-19 52,38 0,56 -50,34", skin)}
        ${polygon("-54,-30 -17,-65 -7,-4 -50,34", skinLight, `opacity=".76"`)}
        ${polygon("-17,-65 38,-58 8,-2 -7,-4", shade(skin, 0.1))}
        ${polygon("38,-58 66,-19 52,38 8,-2", skinDark, `opacity=".58"`)}
        ${polygon("-50,34 -7,-4 0,56", shade(skin, -0.05), `opacity=".62"`)}
        ${polygon("8,-2 52,38 0,56", shade(skin, 0.04), `opacity=".62"`)}
        ${polygon("-58,-20 -17,-70 35,-65 64,-34 46,-16 -7,-35", hair)}
        ${polygon("-17,-70 35,-65 51,-35 0,-44", hairLight)}
        ${polygon("46,-16 69,-8 64,-34 38,-25", hairDark)}
        ${polygon("-58,-20 -70,6 -50,0 -40,-39", hairDark)}
        ${face(persona.mood, skin, persona.accent)}
      </g>
    </g>
  `;
}

function renderSvg(persona) {
  const title = escapeXml(persona.name);
  const bgTint = shade(persona.accent, 0.8);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="720" viewBox="0 0 520 360" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">Distinct low-poly sticker persona scene for ${title}.</desc>
  <rect width="520" height="360" rx="28" fill="#ffffff"/>
  <rect x="18" y="18" width="484" height="324" rx="24" fill="${bgTint}" opacity=".2"/>
  <path d="M54 294 C136 333 386 335 466 292" fill="none" stroke="#e9eee6" stroke-width="18" stroke-linecap="round" opacity=".78"/>
  ${scene(persona.scene, persona)}
  ${figure(persona)}
  ${label(persona)}
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const persona of personas) {
  writeFileSync(join(outDir, `${persona.slug}.svg`), renderSvg(persona));
}

console.log(`Generated ${personas.length} persona SVGs in ${outDir}`);
