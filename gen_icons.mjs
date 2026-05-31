import sharp from 'sharp';
import { mkdirSync } from 'fs';

const src = 'G:/【Minus】/logo1.png';
const base = 'G:/【Minus】/android/app/src/main/res';

const logo = sharp(src);
const meta = await logo.metadata();
const side = Math.min(meta.width, meta.height);
const left = Math.floor((meta.width - side) / 2);
const top = Math.floor((meta.height - side) / 2);
const square = logo.extract({ left, top, width: side, height: side });
console.log(`Cropped: ${meta.width}x${meta.height} -> ${side}x${side}`);

const densities = [
  { name: 'mdpi',    legacy: 48,   adaptive: 108,  safe: 72 },
  { name: 'hdpi',    legacy: 72,   adaptive: 162,  safe: 108 },
  { name: 'xhdpi',   legacy: 96,   adaptive: 216,  safe: 144 },
  { name: 'xxhdpi',  legacy: 144,  adaptive: 324,  safe: 216 },
  { name: 'xxxhdpi', legacy: 192,  adaptive: 432,  safe: 288 },
];

for (const d of densities) {
  const dir = `${base}/mipmap-${d.name}`;
  mkdirSync(dir, { recursive: true });

  await square.clone().resize(d.legacy, d.legacy).png().toFile(`${dir}/ic_launcher.png`);
  await square.clone().resize(d.legacy, d.legacy).png().toFile(`${dir}/ic_launcher_round.png`);

  const fgBuf = await square.clone().resize(d.safe, d.safe).png().toBuffer();
  await sharp({ create: { width: d.adaptive, height: d.adaptive, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: fgBuf, left: Math.floor((d.adaptive - d.safe) / 2), top: Math.floor((d.adaptive - d.safe) / 2) }])
    .png()
    .toFile(`${dir}/ic_launcher_foreground.png`);
  console.log(`  ${d.name}: legacy ${d.legacy}px | adaptive ${d.safe}px in ${d.adaptive}px`);
}

console.log('\nDone!');
