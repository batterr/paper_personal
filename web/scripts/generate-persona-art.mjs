import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "personas");

const personas = [
  ["ceping-juanwang", "测评界卷王", "Test-Juan-King", "trophyDesk", "#2f6f51", "#f4c542", "#ff7b6b"],
  ["shuangtie-kuaizuixia", "爽贴快嘴侠", "So-Tie-Quick-Mouth", "fastTrash", "#d34f4f", "#ffd166", "#4ecdc4"],
  ["gudu-huanyuanjiang", "孤独还原匠", "Good-Do-Restore", "quietAlbum", "#496a82", "#cfe8ef", "#f2b880"],
  ["yicixing-kuaigan", "一次性快感者", "One-Time-Happy", "sparkBag", "#f27a46", "#ffe66d", "#3d405b"],
  ["xijie-kaoguxuejia", "细节考古学家", "Detail-Kao-Goal", "magnifierMap", "#4f5d75", "#b8dbd9", "#f4d35e"],
  ["leziren-pohuaizhe", "乐子人破坏者", "Fun-Po-Huai", "commentVolcano", "#8d3b3b", "#ff6b35", "#ffd166"],
  ["cangpin-gaizaoren", "藏品改造人", "Hide-Pin-Change", "secretVault", "#38405f", "#8bb174", "#f7c59f"],
  ["suixing-langzi", "随性浪子", "Sway-Sing-Run", "windRoad", "#4d908e", "#90be6d", "#f9c74f"],
  ["koubei-banyungong", "口碑搬运工", "Mouth-Bei-Move", "reviewConveyor", "#557a46", "#d9ed92", "#ff9f1c"],
  ["xingjiabi-pinglunjia", "性价比评论家", "Price-Can-Be", "receiptScale", "#495057", "#e9c46a", "#2a9d8f"],
  ["yinxing-shoujizhe", "隐形收集者", "In-Scene-Collector", "hiddenCabinet", "#5b5f97", "#ffcdb2", "#b8f2e6"],
  ["foxi-xiaoqianjia", "佛系消遣家", "Fo-See-Chill", "zenDrawer", "#77966d", "#f5e6a8", "#f2a65a"],
  ["jiegouzhuyi-dashi", "解构主义大师", "Jie-Go-Master", "blueprintPieces", "#253858", "#83c5be", "#ffddd2"],
  ["tucaoyi-pingceyuan", "吐槽役评测员", "Too-Chao-Reviewer", "comedyReview", "#6d597a", "#ffb4a2", "#e9c46a"],
  ["gudu-shiyanjia", "孤独试验家", "Good-Do-Experiment", "labStickers", "#2b2d42", "#8d99ae", "#80ed99"],
  ["suixing-tiyanshi", "随性体验师", "Sway-Sing-Try", "emptyLandscape", "#6c757d", "#ced4da", "#ffd6a5"],
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

function rect(x, y, width, height, fill, attrs = "") {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" ${attrs}/>`;
}

function roundRect(x, y, width, height, radius, fill, attrs = "") {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" ${attrs}/>`;
}

function circle(cx, cy, radius, fill, attrs = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fill}" ${attrs}/>`;
}

function path(d, attrs = "") {
  return `<path d="${d}" ${attrs}/>`;
}

function poly(points, fill, attrs = "") {
  return `<polygon points="${points}" fill="${fill}" ${attrs}/>`;
}

function label(persona) {
  return `
    <g transform="translate(32 36)">
      ${roundRect(0, 0, 208, 40, 20, "#ffffff", `opacity=".92"`)}
      <text x="18" y="26" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="900" fill="#22302b">${esc(persona.chinlish)}</text>
    </g>
  `;
}

function titleText(persona) {
  return `
    <g transform="translate(32 300)">
      ${roundRect(0, -32, 236, 48, 16, "#ffffff", `opacity=".9"`)}
      <text x="18" y="-1" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="#1e2522">${esc(persona.name)}</text>
    </g>
  `;
}

function sticker(x, y, width, height, fill, rotate = 0) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="${fill}" stroke="${shade(fill, -0.18)}" stroke-width="3" transform="rotate(${rotate} ${x + width / 2} ${y + height / 2})"/>`;
}

function bigHead(x, y, scale, colors, mood = "calm") {
  const hairMap = {
    calm: `${poly("-54,-24 -18,-58 35,-50 62,-13 43,7 -5,-24", "#24292e")}${poly("-18,-58 35,-50 52,-15 -4,-31", "#54595e")}`,
    sharp: `${poly("-61,-17 -41,-61 -14,-36 8,-65 31,-34 63,-22 45,5 -6,-22", "#24292e")}`,
    crown: `${poly("-54,-24 -18,-58 35,-50 62,-13 43,7 -5,-24", "#24292e")}${poly("-32,-72 -15,-45 0,-72 15,-45 32,-72 23,-38 -23,-38", colors.third)}`,
    hood: `${poly("-66,-16 -34,-67 31,-67 66,-16 54,50 -54,50", shade(colors.base, -0.24))}`,
  }[mood] ?? "";
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="98" rx="78" ry="15" fill="#16201d" opacity=".14"/>
      ${poly("-45,20 45,20 62,84 -62,84", colors.base)}
      ${poly("-45,20 0,39 -62,84", shade(colors.base, 0.18), `opacity=".78"`)}
      ${poly("45,20 0,39 62,84", shade(colors.base, -0.16), `opacity=".78"`)}
      <path d="M-42 31 L-82 52 M42 31 L82 52" stroke="${shade(colors.base, 0.05)}" stroke-width="16" stroke-linecap="round"/>
      <g transform="translate(0 -48)">
        ${poly("-54,-26 -15,-59 39,-52 63,-15 51,42 0,62 -49,39", "#efd0b8")}
        ${poly("-54,-26 -15,-59 -6,0 -49,39", "#f5dcca", `opacity=".75"`)}
        ${poly("39,-52 63,-15 51,42 8,-2", "#dcb49b", `opacity=".5"`)}
        ${hairMap}
        <path d="M-27 -8 L-8 -14 M8 -14 L28 -8" stroke="#2b2520" stroke-width="5" stroke-linecap="round"/>
        ${circle(-18, 6, 4.5, "#2b2520")}
        ${circle(19, 6, 4.5, "#2b2520")}
        ${mood === "sharp"
          ? '<path d="M-22 31 Q0 16 22 31" fill="none" stroke="#854e4a" stroke-width="5" stroke-linecap="round"/>'
          : '<path d="M-20 27 Q0 36 21 27" fill="none" stroke="#854e4a" stroke-width="5" stroke-linecap="round"/>'}
      </g>
    </g>
  `;
}

function gem(x, y, radius, fill, rotate = 0) {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate})">
      ${poly(`0,${-radius} ${radius * 0.9},${-radius * 0.25} ${radius * 0.55},${radius * 0.8} ${-radius * 0.55},${radius * 0.8} ${-radius * 0.9},${-radius * 0.25}`, fill, `stroke="${shade(fill, -0.25)}" stroke-width="2"`)}
      ${poly(`0,${-radius} ${radius * 0.35},${-radius * 0.2} 0,0 ${-radius * 0.35},${-radius * 0.2}`, shade(fill, 0.45), `opacity=".85"`)}
      ${poly(`0,0 ${radius * 0.55},${radius * 0.8} ${-radius * 0.55},${radius * 0.8}`, shade(fill, -0.18), `opacity=".8"`)}
    </g>
  `;
}

function lowPolyHero(x, y, scale, colors, config = {}) {
  const armor = config.armor ?? colors.base;
  const glow = config.glow ?? colors.third;
  const skin = config.skin ?? "#f0c8a8";
  const helmet = config.helmet ?? "";
  const leftHand = config.leftHand ?? "";
  const rightHand = config.rightHand ?? "";
  const backpack = config.backpack ?? "";
  const extra = config.extra ?? "";

  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="116" rx="92" ry="18" fill="#111827" opacity=".16"/>
      ${backpack}
      <g>
        ${poly("-42,30 42,30 57,91 24,119 -24,119 -57,91", armor, `stroke="${shade(armor, -0.28)}" stroke-width="4"`)}
        ${poly("-42,30 0,47 -24,119 -57,91", shade(armor, 0.16), `opacity=".9"`)}
        ${poly("42,30 0,47 24,119 57,91", shade(armor, -0.18), `opacity=".9"`)}
        ${poly("-18,43 18,43 28,71 0,86 -28,71", glow, `opacity=".9"`)}
        ${roundRect(-18, 113, 23, 43, 8, shade(armor, -0.1), `transform="rotate(9 -7 134)"`)}
        ${roundRect(10, 113, 23, 43, 8, shade(armor, -0.22), `transform="rotate(-9 21 134)"`)}
        ${path("M-7 154 L-13 184 M23 154 L29 184", `stroke="${glow}" stroke-width="13" stroke-linecap="round" opacity=".85"`)}
      </g>
      ${leftHand}
      ${rightHand}
      <g transform="translate(0 -28)">
        ${poly("-50,-20 -16,-57 38,-51 61,-13 47,41 0,62 -48,39", skin, `stroke="${shade(skin, -0.2)}" stroke-width="3"`)}
        ${poly("-50,-20 -16,-57 -5,2 -48,39", shade(skin, 0.12), `opacity=".8"`)}
        ${poly("38,-51 61,-13 47,41 8,2", shade(skin, -0.14), `opacity=".65"`)}
        <path d="M-24 -4 L-8 -9 M8 -9 L25 -4" stroke="#2c221d" stroke-width="5" stroke-linecap="round"/>
        ${circle(-16, 11, 4.5, "#2c221d")}
        ${circle(17, 11, 4.5, "#2c221d")}
        <path d="M-13 35 Q0 44 15 35" fill="none" stroke="#8b4f4a" stroke-width="5" stroke-linecap="round"/>
        ${helmet}
      </g>
      ${extra}
    </g>
  `;
}

function spaceHelmet(colors) {
  return `
    ${circle(0, -14, 69, "#dff7ff", `opacity=".45" stroke="${shade(colors.accent, -0.15)}" stroke-width="5"`)}
    ${circle(-9, -17, 18, colors.base, `opacity=".88"`)}
    ${path("M-38 -16 C-15 -34 19 -35 42 -17", `fill="none" stroke="${colors.third}" stroke-width="7" stroke-linecap="round"`)}
    ${circle(3, -23, 6, "#fff7d6")}
    ${circle(31, -43, 5, colors.accent)}
    ${circle(-42, -38, 4, colors.third)}
  `;
}

function iceCreamHelmet(colors) {
  return `
    ${poly("-47,-38 0,-82 47,-38 36,3 -35,3", "#d19a5b", `stroke="${shade("#d19a5b", -0.24)}" stroke-width="4"`)}
    ${path("M-28 -25 L24 -1 M-14 -41 L36 -16 M26 -31 L-29 -5", `stroke="${shade("#d19a5b", 0.18)}" stroke-width="4" opacity=".7"`)}
    ${circle(0, -78, 39, "#fff4c9", `stroke="${shade("#fff4c9", -0.16)}" stroke-width="3"`)}
    ${circle(1, -119, 35, "#ff9bc2", `stroke="${shade("#ff9bc2", -0.16)}" stroke-width="3"`)}
    ${circle(0, -154, 31, "#8a5a44", `stroke="${shade("#8a5a44", -0.18)}" stroke-width="3"`)}
    ${gem(-23, -86, 5, colors.third, 18)}
    ${gem(22, -103, 5, colors.accent, -10)}
    ${gem(9, -140, 5, "#ff5c8a", 12)}
  `;
}

function drillTool(colors) {
  return `
    <g transform="translate(62 42) rotate(8)">
      ${roundRect(-18, -18, 65, 36, 11, shade(colors.base, -0.08), `stroke="${shade(colors.base, -0.28)}" stroke-width="4"`)}
      ${rect(-39, -10, 26, 20, colors.accent, `rx="5"`)}
      ${poly("46,-26 116,0 46,26", shade(colors.third, 0.1), `stroke="${shade(colors.third, -0.22)}" stroke-width="4"`)}
      ${path("M56 -18 L83 -8 M56 18 L83 8 M77 -15 L103 -5 M77 15 L103 5", `stroke="#ffffff" stroke-width="5" opacity=".5"`)}
      ${circle(9, 0, 12, colors.third)}
    </g>
  `;
}

function candySpear(colors) {
  return `
    <g transform="translate(-83 34) rotate(-28)">
      ${path("M0 -64 V78", `stroke="${shade(colors.base, -0.2)}" stroke-width="12" stroke-linecap="round"`)}
      ${poly("0,-112 30,-64 0,-46 -30,-64", colors.accent)}
      ${poly("0,-112 12,-69 0,-46", colors.third, `opacity=".9"`)}
      ${gem(0, -19, 13, "#ff78b4", 45)}
      ${rect(-12, 8, 24, 20, "#f4d35e", `rx="5"`)}
    </g>
  `;
}

function cookieShield(colors) {
  return `
    <g transform="translate(76 55) rotate(13)">
      ${circle(0, 0, 45, "#b8864d", `stroke="${shade("#b8864d", -0.28)}" stroke-width="6"`)}
      ${circle(0, 0, 24, "#d7a15f", `opacity=".95"`)}
      ${gem(4, -3, 13, "#ff8bc8", 45)}
      ${circle(-23, -14, 5, shade(colors.base, -0.2))}
      ${circle(26, 17, 5, shade(colors.base, -0.2))}
      ${circle(-11, 24, 4, shade(colors.base, -0.2))}
    </g>
  `;
}

function crystalBackpack(colors) {
  return `
    <g transform="translate(-72 45) rotate(-10)">
      ${roundRect(-34, -49, 62, 92, 14, shade(colors.base, -0.08), `stroke="${shade(colors.base, -0.3)}" stroke-width="4"`)}
      ${poly("-21,-29 13,-44 29,-5 -2,25 -28,7", shade(colors.third, 0.15), `opacity=".96"`)}
      ${poly("-21,-29 -2,25 -28,7", shade(colors.third, 0.48), `opacity=".74"`)}
      ${path("M-24 41 L-26 76 M12 41 L9 76", `stroke="${colors.accent}" stroke-width="9" stroke-linecap="round" opacity=".9"`)}
    </g>
  `;
}

function candyParticles(colors) {
  return `
    ${gem(79, -12, 7, colors.third, 24)}
    ${gem(115, 22, 6, colors.accent, -8)}
    ${gem(97, 67, 5, "#ff8bc8", 18)}
    ${gem(-114, -35, 6, "#4cc9f0", 9)}
    ${gem(-132, 62, 5, "#f4d35e", 32)}
  `;
}

function speech(x, y, textValue, fill, rotate = 0) {
  return `
    <g transform="rotate(${rotate} ${x} ${y})">
      ${roundRect(x, y, 116, 48, 18, fill, `stroke="${shade(fill, -0.22)}" stroke-width="4"`)}
      ${poly(`${x + 28},${y + 44} ${x + 45},${y + 72} ${x + 58},${y + 44}`, fill)}
      <text x="${x + 18}" y="${y + 31}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="900" fill="#233">${esc(textValue)}</text>
    </g>
  `;
}

function motif(persona) {
  const colors = persona;
  const dark = shade(colors.base, -0.28);
  const pale = shade(colors.accent, 0.58);

  switch (persona.scene) {
    case "trophyDesk":
      return `
        ${roundRect(63, 234, 392, 44, 16, dark)}
        ${rect(92, 124, 66, 104, "#fffdf4", `stroke="${dark}" stroke-width="5"`)}
        ${rect(178, 104, 66, 124, "#fffdf4", `stroke="${dark}" stroke-width="5"`)}
        ${rect(264, 132, 66, 96, "#fffdf4", `stroke="${dark}" stroke-width="5"`)}
        <path d="M368 102 H436 C430 153 407 179 402 214 H382 C376 179 353 153 368 102 Z" fill="${colors.accent}" stroke="${dark}" stroke-width="6"/>
        ${circle(402, 90, 23, colors.third)}
        ${bigHead(257, 236, 0.62, colors, "crown")}
      `;
    case "fastTrash":
      return `
        ${poly("90,72 146,74 117,143 175,144 86,263 112,171 58,171", colors.accent)}
        ${speech(286, 77, "快评", pale, 6)}
        ${roundRect(343, 201, 83, 90, 14, dark)}
        ${rect(334, 186, 102, 20, colors.third, `rx="8"`)}
        ${path("M360 222 H408 M363 248 H405", `stroke="${pale}" stroke-width="8" stroke-linecap="round"`)}
        ${bigHead(220, 242, 0.58, colors, "sharp")}
      `;
    case "quietAlbum":
      return `
        ${roundRect(88, 83, 274, 190, 22, "#fffdf7", `stroke="${dark}" stroke-width="7"`)}
        ${path("M225 85 V272", `stroke="${dark}" stroke-width="5"`)}
        ${rect(116, 113, 78, 56, pale, `rx="10"`)}
        ${rect(256, 113, 78, 56, colors.third, `rx="10" opacity=".78"`)}
        ${rect(116, 193, 78, 40, colors.accent, `rx="10" opacity=".7"`)}
        ${circle(405, 201, 38, colors.base, `opacity=".2"`)}
        ${bigHead(401, 240, 0.45, colors, "calm")}
      `;
    case "sparkBag":
      return `
        ${circle(390, 92, 38, colors.third, `opacity=".24"`)}
        ${circle(105, 235, 44, colors.accent, `opacity=".18"`)}
        ${sticker(69, 264, 105, 24, pale, -8)}
        ${lowPolyHero(255, 221, 0.78, colors, {
          armor: "#7a4b31",
          trim: "#fff4c9",
          glow: "#ff8bc8",
          helmet: iceCreamHelmet(colors),
          leftHand: candySpear(colors),
          rightHand: cookieShield(colors),
          extra: candyParticles(colors),
        })}
      `;
    case "magnifierMap":
      return `
        ${rect(26, 34, 468, 286, "#eef6f7", `rx="26" opacity=".82"`)}
        ${gem(93, 83, 18, colors.third, -12)}
        ${gem(429, 112, 15, colors.accent, 18)}
        ${gem(112, 260, 14, shade(colors.base, 0.28), 28)}
        ${gem(414, 260, 12, colors.third, -22)}
        ${lowPolyHero(250, 218, 0.82, colors, {
          armor: "#d39a38",
          trim: "#4f5d75",
          glow: "#7b61ff",
          helmet: spaceHelmet(colors),
          leftHand: crystalBackpack(colors),
          rightHand: drillTool(colors),
        })}
      `;
    case "commentVolcano":
      return `
        ${rect(26, 36, 468, 284, "#211818", `rx="24"`)}
        ${poly("87,302 158,147 219,302", shade(colors.base, -0.08))}
        ${poly("158,147 184,208 219,302 157,253 110,302", colors.base, `opacity=".8"`)}
        ${poly("301,304 360,167 430,304", shade(colors.base, -0.12))}
        ${poly("360,167 389,228 430,304 356,263 317,304", colors.base, `opacity=".8"`)}
        ${poly("253,39 274,103 342,77 303,133 370,161 295,165 303,240 253,188 206,241 214,165 140,161 207,133 168,77 232,103", colors.accent)}
        ${speech(55, 87, "避雷", "#fff2b8", -11)}
        ${speech(362, 92, "好笑", "#ffd0d0", 10)}
        ${lowPolyHero(260, 238, 0.6, colors, {
          armor: "#7a2f2f",
          trim: "#ff9f1c",
          glow: "#ffd166",
          helmet: `${poly("-48,-48 -20,-76 0,-48 22,-78 49,-45 37,-10 -38,-10", colors.accent, `stroke="${shade(colors.accent, -0.2)}" stroke-width="3"`)}${gem(0, -80, 10, colors.third, 0)}`,
          rightHand: `<g transform="translate(78 47) rotate(12)">${poly("-38,-16 24,-36 37,30 -38,16", colors.accent, `stroke="${shade(colors.accent, -0.25)}" stroke-width="4"`)}${path("M33 -27 Q83 -5 38 31", `fill="none" stroke="${colors.third}" stroke-width="9" stroke-linecap="round"`)}${circle(-26, 0, 8, "#fff4c9")}</g>`,
          extra: `${gem(-118, 22, 7, colors.third, 12)}${gem(122, 44, 6, colors.accent, -8)}${gem(88, -42, 5, "#fff4c9", 19)}`,
        })}
      `;
    case "secretVault":
      return `
        ${roundRect(112, 74, 300, 214, 26, dark)}
        ${circle(262, 181, 74, shade(colors.base, 0.18), `stroke="#fffdf2" stroke-width="8"`)}
        ${circle(262, 181, 36, "#fffdf2", `stroke="${colors.accent}" stroke-width="8"`)}
        ${path("M262 107 V255 M188 181 H336", `stroke="${dark}" stroke-width="6"`)}
        ${sticker(70, 260, 106, 24, colors.third, -5)}
        ${sticker(357, 64, 106, 24, pale, 5)}
        ${bigHead(263, 239, 0.48, colors, "hood")}
      `;
    case "windRoad":
      return `
        ${path("M38 276 C141 209 199 318 311 235 C371 190 420 162 480 147", `fill="none" stroke="${colors.accent}" stroke-width="20" stroke-linecap="round" opacity=".7"`)}
        ${path("M92 119 C162 88 217 110 268 83 M251 145 C333 115 391 143 453 113", `fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round" opacity=".5"`)}
        ${poly("310,123 365,151 314,184 337,153", colors.third)}
        ${roundRect(98, 236, 86, 48, 18, "#fffdf4", `stroke="${dark}" stroke-width="5"`)}
        ${sticker(226, 248, 124, 24, pale, 2)}
      `;
    case "reviewConveyor":
      return `
        ${path("M72 242 H448", `stroke="${dark}" stroke-width="42" stroke-linecap="round"`)}
        ${circle(107, 242, 29, colors.accent)}
        ${circle(408, 242, 29, colors.accent)}
        ${rect(126, 118, 74, 104, "#fffdf4", `rx="12" stroke="${dark}" stroke-width="5"`)}
        ${rect(224, 93, 74, 129, "#fffdf4", `rx="12" stroke="${dark}" stroke-width="5"`)}
        ${rect(323, 130, 74, 92, "#fffdf4", `rx="12" stroke="${dark}" stroke-width="5"`)}
        ${path("M145 153 H181 M145 180 H174 M243 132 H280 M243 160 H276 M342 163 H379", `stroke="${colors.base}" stroke-width="6" stroke-linecap="round"`)}
        ${bigHead(91, 183, 0.42, colors, "calm")}
      `;
    case "receiptScale":
      return `
        ${path("M260 78 V264 M178 123 H342", `stroke="${dark}" stroke-width="12" stroke-linecap="round"`)}
        ${path("M180 123 L121 232 H239 Z M340 123 L280 232 H399 Z", `fill="${pale}" stroke="${dark}" stroke-width="6"`)}
        ${path("M121 232 H239 M280 232 H399", `stroke="${colors.accent}" stroke-width="10" stroke-linecap="round"`)}
        ${roundRect(56, 82, 100, 144, 10, "#fffdf4", `stroke="${dark}" stroke-width="5"`)}
        ${path("M78 119 H134 M78 151 H124 M78 183 H137", `stroke="${colors.accent}" stroke-width="6" stroke-linecap="round"`)}
        ${circle(260, 78, 20, colors.third)}
      `;
    case "hiddenCabinet":
      return `
        ${roundRect(113, 74, 294, 222, 20, dark)}
        ${rect(134, 97, 121, 174, shade(colors.base, 0.18), `rx="12"`)}
        ${rect(265, 97, 121, 174, shade(colors.base, 0.08), `rx="12"`)}
        ${path("M260 97 V270", `stroke="${dark}" stroke-width="8"`)}
        ${circle(245, 183, 7, colors.third)}
        ${circle(276, 183, 7, colors.third)}
        ${sticker(73, 275, 110, 22, pale, -4)}
        ${circle(424, 117, 42, colors.accent, `opacity=".28"`)}
        ${bigHead(424, 243, 0.43, colors, "calm")}
      `;
    case "zenDrawer":
      return `
        ${circle(260, 181, 118, pale, `opacity=".5"`)}
        ${path("M118 258 C188 225 332 225 402 258", `fill="none" stroke="${dark}" stroke-width="16" stroke-linecap="round"`)}
        ${roundRect(162, 158, 196, 76, 20, "#fffdf4", `stroke="${dark}" stroke-width="6"`)}
        ${path("M198 196 H322", `stroke="${colors.accent}" stroke-width="9" stroke-linecap="round"`)}
        ${circle(260, 196, 11, colors.third)}
        ${path("M109 118 C159 87 204 99 230 135 M292 135 C320 99 366 87 414 118", `fill="none" stroke="${colors.base}" stroke-width="9" stroke-linecap="round"`)}
      `;
    case "blueprintPieces":
      return `
        ${rect(34, 40, 452, 280, shade(colors.base, 0.05), `rx="24"`)}
        ${path("M72 92 H448 M72 142 H448 M72 192 H448 M72 242 H448 M122 62 V300 M197 62 V300 M272 62 V300 M347 62 V300 M422 62 V300", `stroke="${shade(colors.accent, 0.35)}" stroke-width="2" opacity=".55"`)}
        ${roundRect(126, 119, 92, 76, 12, "#fffdf4", `stroke="${colors.accent}" stroke-width="6" transform="rotate(-9 172 157)"`)}
        ${roundRect(238, 84, 102, 90, 12, "#fffdf4", `stroke="${colors.third}" stroke-width="6" transform="rotate(8 289 129)"`)}
        ${roundRect(272, 201, 112, 62, 12, "#fffdf4", `stroke="${colors.accent}" stroke-width="6" transform="rotate(-5 328 232)"`)}
        ${path("M180 201 L246 178 M299 174 L316 201", `stroke="#fffdf4" stroke-width="7" stroke-dasharray="10 10"`)}
        ${bigHead(98, 245, 0.42, colors, "sharp")}
      `;
    case "comedyReview":
      return `
        ${rect(36, 62, 448, 238, shade(colors.base, -0.18), `rx="24"`)}
        ${path("M64 255 C132 213 388 213 456 255 L456 300 H64 Z", `fill="${colors.accent}"`)}
        ${speech(76, 95, "离谱", "#fff2b8", -8)}
        ${speech(318, 93, "笑死", "#ffd8ca", 9)}
        ${path("M248 161 V245", `stroke="#fff" stroke-width="10" stroke-linecap="round"`)}
        ${circle(248, 144, 25, "#fff")}
        ${path("M222 245 H274", `stroke="#fff" stroke-width="10" stroke-linecap="round"`)}
        ${bigHead(248, 244, 0.48, colors, "sharp")}
      `;
    case "labStickers":
      return `
        ${rect(34, 52, 452, 248, shade(colors.base, -0.1), `rx="24"`)}
        ${path("M67 262 H453", `stroke="${colors.accent}" stroke-width="34" stroke-linecap="round" opacity=".82"`)}
        ${path("M92 104 V207 C92 235 159 235 159 207 V104 M366 96 V207 C366 239 447 239 447 207 V96", `fill="none" stroke="#fffdf4" stroke-width="8" stroke-linecap="round" opacity=".8"`)}
        ${path("M92 169 C113 153 138 183 159 169 M366 158 C391 140 420 178 447 158", `fill="none" stroke="${colors.third}" stroke-width="12" stroke-linecap="round"`)}
        ${gem(128, 117, 9, colors.third, 16)}
        ${gem(405, 116, 9, colors.accent, -12)}
        ${lowPolyHero(259, 234, 0.7, colors, {
          armor: "#364156",
          trim: "#8d99ae",
          glow: "#80ed99",
          helmet: `${circle(0, -14, 66, "#d8fff0", `opacity=".35" stroke="${colors.third}" stroke-width="5"`)}${roundRect(-37, -28, 74, 27, 12, "#111827", `opacity=".58"`)}${circle(-18, -14, 8, colors.third)}${circle(19, -14, 8, colors.third)}`,
          leftHand: `<g transform="translate(-82 40) rotate(-14)">${path("M0 -54 V45", `stroke="#fffdf4" stroke-width="9" stroke-linecap="round"`)}${path("M-24 45 H24 L13 86 H-13 Z", `fill="${colors.third}" stroke="#fffdf4" stroke-width="4"`)}${path("M-8 61 C3 53 11 70 18 62", `fill="none" stroke="${shade(colors.base, 0.45)}" stroke-width="6" stroke-linecap="round"`)}</g>`,
          rightHand: `<g transform="translate(82 37) rotate(13)">${roundRect(-27, -24, 54, 78, 14, shade(colors.base, 0.1), `stroke="#fffdf4" stroke-width="4"`)}${circle(0, 14, 16, colors.third, `opacity=".8"`)}${gem(1, -7, 7, colors.accent, 18)}</g>`,
          extra: `${gem(-129, -11, 6, colors.third, 8)}${gem(125, 32, 6, colors.accent, -19)}${gem(92, -51, 5, "#fffdf4", 12)}`,
        })}
      `;
    case "emptyLandscape":
      return `
        ${path("M54 261 C134 210 207 241 260 207 C325 165 389 183 466 127", `fill="none" stroke="${colors.accent}" stroke-width="18" stroke-linecap="round" opacity=".62"`)}
        ${circle(392, 95, 42, colors.third, `opacity=".72"`)}
        ${path("M95 118 C142 86 203 96 233 130 M272 132 C318 93 382 93 426 128", `fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round" opacity=".42"`)}
        ${sticker(96, 251, 112, 23, "#fffdf4", -6)}
        ${sticker(300, 252, 112, 23, pale, 5)}
        ${path("M233 203 Q260 225 287 203", `fill="none" stroke="${dark}" stroke-width="8" stroke-linecap="round" opacity=".58"`)}
      `;
    default:
      return bigHead(260, 240, 0.62, colors, "calm");
  }
}

function render(persona) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="720" viewBox="0 0 520 360" role="img" aria-labelledby="title desc">
  <title id="title">${esc(persona.name)}</title>
  <desc id="desc">${esc(persona.chinlish)} sticker persona illustration</desc>
  <defs>
    <linearGradient id="bg-${persona.slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${shade(persona.accent, 0.72)}"/>
      <stop offset="52%" stop-color="#fffef7"/>
      <stop offset="100%" stop-color="${shade(persona.third, 0.66)}"/>
    </linearGradient>
    <filter id="shadow-${persona.slug}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#111111" flood-opacity=".15"/>
    </filter>
  </defs>
  <rect width="520" height="360" rx="32" fill="url(#bg-${persona.slug})"/>
  <path d="M34 74 H486 M34 122 H486 M34 170 H486 M34 218 H486 M34 266 H486 M82 32 V328 M146 32 V328 M210 32 V328 M274 32 V328 M338 32 V328 M402 32 V328 M466 32 V328" stroke="${shade(persona.base, 0.65)}" stroke-width="1" opacity=".32"/>
  <g filter="url(#shadow-${persona.slug})">
    ${motif(persona)}
  </g>
  ${label(persona)}
  ${titleText(persona)}
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
for (const persona of personas) {
  writeFileSync(join(outDir, `${persona.slug}.svg`), render(persona), "utf8");
}

console.log(`Generated ${personas.length} persona SVG files in ${outDir}`);
