import { cp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { patchCartOverlay } from './patch-cart-overlay.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const option = (name) => args[args.indexOf(name) + 1];
if (!args.includes('--base') || !args.includes('--out')) {
  throw new Error('Usage: node scripts/assemble.mjs --base ../horizon --out ../theme-knr');
}
const base = path.resolve(option('--base'));
const output = path.resolve(option('--out'));
if (output === base || output.startsWith(base + path.sep) || base.startsWith(output + path.sep)) {
  throw new Error('La base et la sortie doivent être deux dossiers distincts, non imbriqués.');
}
let exists = false;
try {
  await access(output);
  exists = true;
} catch {}
if (exists) throw new Error('Le dossier de sortie existe déjà. Choisir un nouveau dossier.');

// Shopify JSON files permit comments. Preserve strings while removing comments.
const json = async (file) =>
  JSON.parse(
    (await readFile(file, 'utf8'))
      .replace(/^\uFEFF/, '')
      .replace(/("(?:\\.|[^"\\])*")|\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (match, string) => string || ''),
  );
const save = async (file, value) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2) + '\n');
};
const schema = await json(path.join(base, 'config/settings_schema.json'));
const info = schema.find((item) => item.name === 'theme_info');
if (info?.theme_name !== 'Horizon' || info?.theme_version !== '4.3.0') {
  throw new Error(
    'Cette intégration est validée sur Horizon 4.3.0. Vérifier la version de la base.',
  );
}

const excluded = new Set(['.git', '.shopify', 'node_modules', 'docs']);
await cp(base, output, {
  recursive: true,
  filter: (source) =>
    !path
      .relative(base, source)
      .split(path.sep)
      .some((part) => excluded.has(part)),
});
await cp(path.join(root, 'theme'), output, { recursive: true });
await patchCartOverlay(output);
const additions = await json(path.join(root, 'data/settings-schema.json'));
await save(path.join(output, 'config/settings_schema.json'), [
  ...schema.filter((item) => item.name !== 't:knr.design_settings'),
  ...additions,
]);
const settings = await json(path.join(output, 'config/settings_data.json'));
const seed = await json(path.join(root, 'data/settings.json'));
settings.current = {
  ...settings.current,
  ...seed,
  sections: { ...settings.current.sections, ...seed.sections },
};
await save(path.join(output, 'config/settings_data.json'), settings);
for (const name of ['fr.json', 'en.default.json', 'fr.schema.json', 'en.default.schema.json']) {
  const file = path.join(output, 'locales', name);
  await save(file, {
    ...(await json(file)),
    ...(await json(path.join(root, 'data/locales', name))),
  });
}

// Localize native supporting pages without redistributing their source files.
const copy = new Map([
  ['Welcome to our store', 'Livraison estimée sous 48h'],
  ['Join our email list', 'Le journal Maison Célestine'],
  [
    'Get exclusive deals and early access to new products.',
    'Découvrez nos rituels et les actualités de Maison Célestine.',
  ],
  ['You may also like', 'Complétez votre rituel'],
  ['Discover something new', 'Découvrez nos soins'],
  ['Browse our latest products', 'La science botanique au service de votre peau'],
]);
for (const name of [
  'sections/header-group.json',
  'sections/footer-group.json',
  'templates/product.json',
  'templates/cart.json',
  'templates/404.json',
  'templates/index.json',
]) {
  const file = path.join(output, name);
  let source = await readFile(file, 'utf8');
  for (const [original, translation] of copy) source = source.replaceAll(original, translation);
  await writeFile(file, source);
}
const homeFile = path.join(output, 'templates/index.json');
const home = await json(homeFile);
for (const section of Object.values(home.sections)) {
  if (section.type === 'hero') {
    section.settings.image_1 = 'shopify://shop_images/knr-desktop-product-image.png';
    for (const block of Object.values(section.blocks || {})) {
      if (block.type === 'button')
        Object.assign(block.settings, {
          label: 'Découvrir le sérum',
          link: '/products/serum-precieux-regenerant?view=knr-serum',
        });
    }
  }
  if (section.type === 'product-list') section.settings.collection = 'collection-cactus';
}
await save(homeFile, home);
await cp(path.join(root, 'licenses'), path.join(output, 'licenses'), { recursive: true });
await cp(path.join(root, 'licenses/Horizon-LICENSE.md'), path.join(output, 'LICENSE.md'));
const license = await readFile(path.join(output, 'LICENSE.md'));
await save(path.join(output, 'provenance.json'), {
  base: { name: info.theme_name, version: info.theme_version },
  licenseSha256: createHash('sha256').update(license).digest('hex'),
  integration: 'Maison Célestine — exercice KNR',
});
console.log(`Thème assemblé dans ${output}. Vérifier les contenus Shopify avant déploiement.`);
