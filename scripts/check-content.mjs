import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const leaves = (object, prefix = '') =>
  Object.entries(object).flatMap(([key, value]) => {
    const name = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object' ? leaves(value, name) : [name];
  });
const fr = await readJson('data/locales/fr.json');
const en = await readJson('data/locales/en.default.json');
assert.deepEqual(
  leaves(fr).sort(),
  leaves(en).sort(),
  'Les clés de traduction doivent correspondre.',
);
const schemaFr = await readJson('data/locales/fr.schema.json');
const schemaEn = await readJson('data/locales/en.default.schema.json');
assert.deepEqual(
  leaves(schemaFr).sort(),
  leaves(schemaEn).sort(),
  'Les libellés éditeur doivent correspondre.',
);

const seed = await readJson('data/settings.json');
let checked = 0;
for (const [id, section] of Object.entries(seed.sections)) {
  const file = path.join(root, 'theme/sections', `${section.type}.liquid`);
  const source = await readFile(file, 'utf8');
  const match = source.match(/{% schema %}([\s\S]*?){% endschema %}/);
  assert.ok(match, `Schéma manquant : ${id}`);
  const schema = JSON.parse(match[1]);
  const settings = new Set((schema.settings || []).map((item) => item.id).filter(Boolean));
  for (const key of Object.keys(section.settings || {}))
    assert.ok(settings.has(key), `Réglage inconnu : ${id}.${key}`);
  for (const blockId of section.block_order || [])
    assert.ok(section.blocks[blockId], `Bloc absent : ${id}.${blockId}`);
  for (const block of Object.values(section.blocks || {})) {
    const definition = schema.blocks?.find((item) => item.type === block.type);
    assert.ok(definition, `Type de bloc inconnu : ${id}.${block.type}`);
    const keys = new Set(definition.settings.map((item) => item.id).filter(Boolean));
    for (const key of Object.keys(block.settings || {}))
      assert.ok(keys.has(key), `Réglage de bloc inconnu : ${id}.${key}`);
  }
  for (const key of source.matchAll(/t:(knr\.[a-z_]+)/g))
    assert.ok(leaves(schemaFr).includes(key[1]), `Libellé éditeur absent : ${key[1]}`);
  checked++;
}

const themeFiles = await readdir(path.join(root, 'theme'), { recursive: true });
for (const file of themeFiles.filter((file) => /\.(liquid|css|js)$/.test(file))) {
  const source = await readFile(path.join(root, 'theme', file), 'utf8');
  assert.ok(
    !/https?:\/\/[^\s'"<>]*figma\.com\/api\/mcp\//.test(source),
    `URL Figma temporaire : ${file}`,
  );
  for (const match of source.matchAll(/['"](knr-[\w.-]+\.(?:svg|woff2|css|js))['"]/g))
    await access(path.join(root, 'theme/assets', match[1]));
}
for (const image of JSON.stringify(seed).matchAll(/shopify:\/\/shop_images\/([^"\\]+)/g))
  await access(path.join(root, 'content/images', image[1]));
await access(path.join(root, 'licenses/Horizon-LICENSE.md'));
console.log(
  `${checked} sections : schémas, blocs, traductions, images et ressources locales cohérents.`,
);
