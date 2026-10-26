import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** Adapt Horizon 4.3.0's native cart lifecycle without redistributing its source. */
export async function patchCartOverlay(theme) {
  const replace = (source, original, replacement, count) => {
    if (source.split(original).length - 1 !== count) {
      throw new Error(
        'Contrat Horizon du tiroir modifié : vérifier le correctif de superposition.',
      );
    }
    return source.replaceAll(original, replacement);
  };

  const scriptFile = path.join(theme, 'assets/theme-drawer.js');
  let script = await readFile(scriptFile, 'utf8');
  script = replace(script, 'this.#modalQuery.matches', 'this.#isModal', 5);
  script = replace(
    script,
    '  get isOpen() {',
    `  // KNR keeps the native modal lifecycle on every viewport; other pages retain Horizon's behavior.
  get #isKnrOverlay() {
    return this.id === 'cart-drawer' && document.body.classList.contains('knr-page');
  }

  get #isModal() {
    return this.#isKnrOverlay || this.#modalQuery.matches;
  }

  get isOpen() {`,
    1,
  );
  script = replace(
    script,
    '  #onModalBreakpointChange = () => {\n    if (!this.isOpen) return;',
    '  #onModalBreakpointChange = () => {\n    if (!this.isOpen || this.#isKnrOverlay) return;',
    1,
  );
  script = replace(
    script,
    '      // Cancel any in-progress open animation before starting the close.',
    `      // KNR exits from the currently rendered position, including interrupted entry.
      if (this.#isKnrOverlay) {
        panel.style.setProperty('--knr-drawer-close-from', getComputedStyle(panel).transform);
        panel.style.setProperty('--knr-drawer-backdrop-close-from', getComputedStyle(panel, '::backdrop').opacity);
      }

      // Cancel any in-progress open animation before starting the close.`,
    1,
  );
  script = replace(
    script,
    "    panel.close();\n    this.style.removeProperty('--drawer-stack-order');",
    `    panel.close();
    panel.style.removeProperty('--knr-drawer-close-from');
    panel.style.removeProperty('--knr-drawer-backdrop-close-from');
    this.style.removeProperty('--drawer-stack-order');`,
    1,
  );

  const infrastructureFile = path.join(theme, 'snippets/theme-drawer.liquid');
  let infrastructure = await readFile(infrastructureFile, 'utf8');
  infrastructure = replace(
    infrastructure,
    '      if (!drawer) continue;',
    "      if (!drawer || (drawer.id === 'cart-drawer' && document.body.classList.contains('knr-page'))) continue;",
    1,
  );
  infrastructure = replace(
    infrastructure,
    "  const squeezeQuery = window.matchMedia('(min-width: 990px)');",
    `  const squeezeQuery = window.matchMedia('(min-width: 990px)');
  const isKnrOverlay = (drawer) =>
    drawer.id === 'cart-drawer' && document.body.classList.contains('knr-page');
  const openSidebar = () =>
    Array.from(document.querySelectorAll('theme-drawer[open]')).find((drawer) => !isKnrOverlay(drawer));`,
    1,
  );
  infrastructure = replace(
    infrastructure,
    '    if (squeezeQuery.matches) {',
    '    if (squeezeQuery.matches && openSidebar()) {',
    1,
  );
  infrastructure = replace(
    infrastructure,
    "const openDrawer = document.querySelector('theme-drawer[open]');",
    'const openDrawer = openSidebar();',
    2,
  );
  infrastructure = replace(
    infrastructure,
    "const openDrawers = Array.from(document.querySelectorAll('theme-drawer[open]:not([no-persist])'));",
    "const openDrawers = Array.from(document.querySelectorAll('theme-drawer[open]:not([no-persist])')).filter((drawer) => !isKnrOverlay(drawer));",
    1,
  );

  const cartItemsFile = path.join(theme, 'assets/component-cart-items.js');
  let cartItems = await readFile(cartItemsFile, 'utf8');
  cartItems = replace(
    cartItems,
    '        this.replaceChildren(clone);',
    '        this.replaceChildren(clone);\n        this.#restoreKnrEmptyFocus();',
    1,
  );
  cartItems = replace(
    cartItems,
    '        this.#enableCartItems();',
    '        this.#enableCartItems();\n        this.#restoreKnrEmptyFocus();',
    1,
  );
  cartItems = replace(
    cartItems,
    '  /**\n   * Enables the cart items.\n   */',
    `  /** Restore lost focus after both the optimistic empty state and its server render. */
  #restoreKnrEmptyFocus() {
    if (!this.isDrawer || !document.body.classList.contains('knr-page') || document.activeElement !== document.body) return;
    const panel = document.querySelector('#cart-drawer dialog:modal');
    if (!panel?.querySelector('[data-cart-drawer-empty]')) return;
    const closeButton = /** @type {HTMLButtonElement | null} */ (
      panel.querySelector('.theme-drawer__close-button')
    );
    closeButton?.focus({ preventScroll: true });
  }

  /**
   * Enables the cart items.
   */`,
    1,
  );

  await writeFile(scriptFile, script);
  await writeFile(infrastructureFile, infrastructure);
  await writeFile(cartItemsFile, cartItems);
}
