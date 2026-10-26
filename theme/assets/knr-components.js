import { Component } from '@theme/component';
import { isClickedOutside } from '@theme/utilities';
import { CartLinesUpdateEvent, StandardEvents } from '@shopify/events';

const motion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
const cartRoute = (path) => `${window.Shopify?.routes?.root || '/'}${path}`;

/** Lifecycle shared by custom page features; Shopify section replacement is safe. */
class KnrComponent extends Component {
  connectedCallback() {
    super.connectedCallback();
    this.controller?.abort();
    this.controller = new AbortController();
  }
  disconnectedCallback() {
    this.controller?.abort();
    super.disconnectedCallback();
  }
  updatedCallback() {
    super.updatedCallback();
    // Horizon can preserve the host while replacing its children in the editor.
    // Rebind against the new controls and release every previous subscription.
    this.disconnectedCallback();
    this.connectedCallback();
  }
  listen(target, type, callback, options = {}) {
    target?.addEventListener(type, callback, {
      ...options,
      signal: this.controller.signal,
    });
  }
}

/** Keep native focus moves while distinguishing touch/mouse from keyboard styling. */
class KnrInputModality extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    this.listen(document, 'pointerdown', () => this.setMode('pointer'), {
      capture: true,
      passive: true,
    });
    this.listen(document, 'keydown', () => this.setMode('keyboard'), { capture: true });
  }
  setMode(mode) {
    if (document.body.dataset.knrInputMode !== mode) document.body.dataset.knrInputMode = mode;
  }
}

/** Optional editorial enhancement. Content is visible before, without and after JS. */
class KnrReveals extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    if (!('IntersectionObserver' in window)) return;
    this.completed ||= new WeakSet();
    this.mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
    this.listen(this.mediaQuery, 'change', () => this.start());
    this.listen(document, 'focusin', (event) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest('[data-knr-reveal]');
      if (target) this.finish(target);
    });
    this.listen(document, 'animationend', (event) => {
      if (event.animationName === 'knr-reveal-in')
        event.target.classList.remove('knr-reveal--enter');
    });
    this.start();
  }
  start() {
    this.stop();
    if (this.mediaQuery.matches) return;
    // Never animate product information, purchase controls, forms or whole sections.
    const selectors = [
      '.knr-ingredients__eyebrow',
      '.knr-ingredients__quote',
      '.knr-usage > .knr-heading',
      '.knr-usage__card',
      '.knr-results__intro',
      '.knr-faq h2',
      '.knr-reviews .knr-heading',
      '.knr-news__heading',
      '.knr-news__card',
      '.knr-newsletter__content > h2',
    ];
    this.targets = document.querySelectorAll(selectors.join(','));
    const observed = new WeakSet();
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target;
        const firstObservation = !observed.has(target);
        observed.add(target);
        if (!entry.isIntersecting) continue;
        this.finish(target);
        // Keep already-visible content stable on load, history restoration and focus.
        if (
          !firstObservation &&
          !target.contains(document.activeElement) &&
          !this.mediaQuery.matches
        )
          target.classList.add('knr-reveal--enter');
      }
    });
    for (const target of this.targets) {
      target.setAttribute('data-knr-reveal', '');
      if (!this.completed.has(target)) this.observer.observe(target);
    }
  }
  finish(target) {
    this.observer?.unobserve(target);
    this.completed.add(target);
    target.setAttribute('data-knr-revealed', '');
    target.classList.remove('knr-reveal--enter');
  }
  stop() {
    this.observer?.disconnect();
    for (const target of this.targets || []) target.classList.remove('knr-reveal--enter');
  }
  disconnectedCallback() {
    this.stop();
    super.disconnectedCallback();
  }
}

/** Native disclosures remain usable without JavaScript; answers animate only on interaction. */
class KnrAccordions extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    this.disclosures = [];
    this.mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
    this.width = this.clientWidth;
    this.listen(this.mediaQuery, 'change', () => {
      if (this.mediaQuery.matches) this.finishActive();
    });
    this.listen(window, 'resize', () => {
      if (this.width === this.clientWidth) return;
      this.width = this.clientWidth;
      this.finishActive();
    });
    for (const details of this.querySelectorAll(':scope > details')) {
      const summary = details.querySelector(':scope > summary');
      const content = details.querySelector(':scope > [data-knr-accordion-content]');
      if (!summary || !content) continue;
      const state = { details, summary, content, targetOpen: details.open, animation: null };
      this.disclosures.push(state);
      this.listen(summary, 'click', (event) => {
        if (event.defaultPrevented || event.button > 0) return;
        event.preventDefault();
        this.setOpen(state, !state.targetOpen);
      });
      this.listen(details, 'toggle', () => {
        if (!state.animation) state.targetOpen = details.open;
      });
    }
  }
  async setOpen(state, open) {
    const { details, summary, content } = state;
    const startHeight = details.open ? content.getBoundingClientRect().height : 0;
    const startOpacity = details.open ? Number.parseFloat(getComputedStyle(content).opacity) : 0;
    state.animation?.cancel();
    state.animation = null;
    state.targetOpen = open;
    if (!open && content.contains(document.activeElement)) summary.focus({ preventScroll: true });
    details.open = true;
    content.inert = !open;
    details.toggleAttribute('data-knr-accordion-closing', !open);
    if (this.mediaQuery.matches || typeof content.animate !== 'function') {
      this.finish(state);
      return;
    }
    const style = getComputedStyle(this);
    // Shopify may minify 260ms to .26s; Web Animations expects milliseconds.
    const cssDuration = style.getPropertyValue('--knr-accordion-duration').trim();
    const duration = Number.parseFloat(cssDuration) * (cssDuration.endsWith('ms') ? 1 : 1000);
    const animation = content.animate(
      [
        { height: `${startHeight}px`, opacity: startOpacity },
        { height: `${open ? content.scrollHeight : 0}px`, opacity: open ? 1 : 0 },
      ],
      {
        duration: Number.isFinite(duration) ? duration : 260,
        easing:
          style.getPropertyValue('--knr-accordion-ease').trim() || 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        fill: 'both',
      },
    );
    state.animation = animation;
    try {
      await animation.finished;
    } catch {
      // A newer toggle, section replacement or reduced-motion change cancelled it.
    }
    if (state.animation === animation) this.finish(state);
  }
  finish(state) {
    const animation = state.animation;
    state.animation = null;
    state.details.open = state.targetOpen;
    state.details.removeAttribute('data-knr-accordion-closing');
    state.content.inert = false;
    animation?.cancel();
  }
  finishActive() {
    for (const state of this.disclosures || []) {
      if (state.animation) this.finish(state);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.finishActive();
  }
}

class KnrHeader extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    const menu = this.querySelector('dialog');
    const toggle = this.querySelector('[data-knr-menu-toggle]');
    this.menu = menu;
    this.menuClosing = false;
    // Safari can show :focus-visible after a touch-triggered showModal(). Keep
    // real focus in the dialog; only suppress the pointer-opening indicator.
    this.listen(this, 'pointerdown', () => this.setAttribute('data-knr-menu-input', 'pointer'));
    this.listen(this, 'keydown', () => this.removeAttribute('data-knr-menu-input'));
    this.listen(document, 'keydown', (event) => {
      if (event.key === 'Tab') this.removeAttribute('data-knr-menu-input');
    });
    this.listen(toggle, 'click', (event) => {
      if (!menu || menu.open) return;
      this.menuClosing = false;
      if (event.detail === 0) this.removeAttribute('data-knr-menu-input');
      else this.setAttribute('data-knr-menu-input', 'pointer');
      menu?.showModal();
      // Commit the off-screen starting position before the entry transition.
      menu.getBoundingClientRect();
      menu.setAttribute('data-knr-menu-open', '');
      toggle.setAttribute('aria-expanded', 'true');
    });
    this.listen(this.querySelector('[data-knr-menu-close]'), 'click', (event) => {
      if (event.detail === 0) this.removeAttribute('data-knr-menu-input');
      this.closeMenu();
    });
    this.listen(menu, 'cancel', (event) => {
      event.preventDefault();
      this.closeMenu();
    });
    this.listen(menu, 'close', () => {
      // A native close event can arrive after a rapid reopen.
      if (menu.open) return;
      menu.removeAttribute('data-knr-menu-open');
      this.menuClosing = false;
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus({ preventScroll: true });
    });
    this.listen(menu, 'click', (event) => {
      if (isClickedOutside(event, menu)) this.closeMenu();
    });
    this.listen(this.querySelector('[data-knr-open-cart]'), 'click', (event) => {
      const drawer = document.querySelector('theme-drawer#cart-drawer');
      if (typeof drawer?.open === 'function') {
        event.preventDefault();
        drawer.open();
      }
    });
    this.listen(document, StandardEvents.cartLinesUpdate, async (event) => {
      try {
        const { detail } = await event.promise;
        if (!this.isConnected || detail?.didError) return;
        if (Array.isArray(detail?.items))
          this.updateCount(detail.items.reduce((total, item) => total + item.quantity, 0));
        else {
          const response = await fetch(cartRoute('cart.js'), {
            signal: this.controller.signal,
          });
          if (response.ok) this.updateCount((await response.json()).item_count);
        }
      } catch (error) {
        if (error.name !== 'AbortError') console.warn('KNR cart count could not be refreshed.');
      }
    });
  }
  async closeMenu() {
    const menu = this.menu;
    const signal = this.controller.signal;
    if (!menu?.open || this.menuClosing) return;
    this.menuClosing = true;
    menu.removeAttribute('data-knr-menu-open');
    // Native modality and focus containment remain active until the exit ends.
    // An interrupted entry reverses from its current position without a jump.
    await Promise.allSettled(menu.getAnimations().map((animation) => animation.finished));
    if (!signal.aborted && this.isConnected && this.menu === menu && this.menuClosing) {
      menu.close();
      this.menuClosing = false;
      this.querySelector('[data-knr-menu-toggle]')?.setAttribute('aria-expanded', 'false');
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.menuClosing = false;
    this.menu?.close();
    this.menu?.removeAttribute('data-knr-menu-open');
    this.querySelector('[data-knr-menu-toggle]')?.setAttribute('aria-expanded', 'false');
  }
  updateCount(count) {
    for (const badge of this.querySelectorAll('[data-knr-cart-count]'))
      badge.textContent = String(count);
  }
}

/** Four editorial messages; the first remains the selected variant's stock status. */
class KnrReassurance extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    this.messages = [...this.querySelectorAll('[data-knr-message]')];
    this.controls = [...this.querySelectorAll('[data-knr-message-control]')];
    this.track = this.querySelector('.knr-product__delivery');
    this.mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
    this.autoplay = this.dataset.autoplay === 'true' && !window.Shopify?.designMode;
    this.interval = Math.max(4000, Math.min(12000, Number(this.dataset.interval) || 4000));
    this.focused = this.contains(document.activeElement);
    this.visible = false;
    this.hovered = false;
    this.index = 0;
    this.querySelector('.knr-product__ticks').hidden = this.messages.length < 2;
    this.listen(this, 'focusin', () => {
      this.focused = true;
      this.schedule();
    });
    this.listen(this, 'focusout', (event) => {
      this.focused = this.contains(event.relatedTarget);
      this.schedule();
    });
    this.listen(this, 'pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      this.hovered = true;
      this.schedule();
    });
    this.listen(this, 'pointerleave', () => {
      this.hovered = false;
      this.schedule();
    });
    this.controls.forEach((control, index) => {
      this.listen(control, 'click', () => {
        if (!this.available) return;
        this.schedule();
        this.show(index);
      });
    });
    this.listen(document, 'visibilitychange', () => this.schedule());
    this.listen(this.mediaQuery, 'change', () => this.schedule());
    this.visibilityObserver?.disconnect();
    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        this.visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        this.schedule();
      },
      { threshold: 0.5 },
    );
    this.visibilityObserver.observe(this);
    this.setAvailability(this.dataset.available === 'true');
  }
  disconnectedCallback() {
    clearTimeout(this.timer);
    this.visibilityObserver?.disconnect();
    super.disconnectedCallback();
  }
  /** Called by the product controller after its availability text has changed. */
  setAvailability(available) {
    this.available = available;
    this.dataset.available = String(available);
    for (const control of this.controls) control.disabled = !available;
    this.show(0);
    this.schedule();
  }
  show(index) {
    this.index = index;
    this.messages.forEach((message, position) => {
      message.setAttribute('aria-hidden', String(position !== index));
      const control = this.controls[position];
      control.setAttribute('aria-disabled', String(position === index));
      if (position === index) control.setAttribute('aria-current', 'true');
      else control.removeAttribute('aria-current');
    });
  }
  schedule() {
    clearTimeout(this.timer);
    const stopped =
      !this.autoplay || this.focused || this.hovered || !this.available || this.mediaQuery.matches;
    this.dataset.paused = String(stopped);
    this.track.setAttribute('aria-live', stopped ? 'polite' : 'off');
    if (
      !this.isConnected ||
      stopped ||
      !this.visible ||
      document.hidden ||
      this.messages.length < 2
    )
      return;
    this.timer = setTimeout(() => {
      this.show((this.index + 1) % this.messages.length);
      this.schedule();
    }, this.interval);
  }
}

class KnrProduct extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    this.data = JSON.parse(this.querySelector('[data-knr-product-data]').textContent);
    this.form = this.querySelector('[data-knr-product-form]');
    this.gallery = this.querySelector('[data-knr-gallery]');
    this.status = this.querySelector('[data-knr-product-status]');
    this.busy = false;
    this.activeForm = null;
    this.listen(this, 'click', (event) => this.onClick(event));
    this.listen(this.form, 'submit', (event) => this.addToCart(event));
    for (const form of this.querySelectorAll('[data-knr-quick-add-form]'))
      this.listen(form, 'submit', (event) => this.addToCart(event));
    this.listen(window, 'popstate', () =>
      this.selectVariant(
        new URL(location.href).searchParams.get('variant') ||
          this.data.variants.find((variant) => variant.available)?.id ||
          this.data.variants[0].id,
        false,
      ),
    );
    this.listen(this.gallery, 'scroll', () => this.updateProgress(), {
      passive: true,
    });
    this.listen(this.querySelector('[data-knr-gallery-previous]'), 'click', () =>
      this.moveGallery(-1),
    );
    this.listen(this.querySelector('[data-knr-gallery-next]'), 'click', () => this.moveGallery(1));
    this.listen(this.gallery, 'keydown', (event) => {
      if (event.target !== this.gallery || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      this.moveGallery(event.key === 'ArrowRight' ? 1 : -1);
    });
    const lightbox = this.querySelector('[data-knr-lightbox]');
    this.listen(this.querySelector('[data-knr-close]'), 'click', () => lightbox.close());
    this.listen(lightbox, 'click', (event) => {
      if (isClickedOutside(event, lightbox)) lightbox.close();
    });
    this.listen(lightbox, 'close', () => this.zoomOpener?.focus({ preventScroll: true }));
    this.stickyObserver?.disconnect();
    this.stickyObserver = new IntersectionObserver(([entry]) => {
      this.purchasePassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      this.updateSticky();
    });
    this.footerObserver?.disconnect();
    this.footerObserver = new IntersectionObserver(([entry]) => {
      this.footerVisible = entry.isIntersecting;
      this.updateSticky();
    });
    const button = this.form?.querySelector('[data-knr-add]');
    if (button) this.stickyObserver.observe(button);
    const footer = document.querySelector('.knr-footer');
    if (footer) this.footerObserver.observe(footer);
    this.selectVariant(this.form.elements.id.value, false, 'instant');
    this.updateProgress();
  }
  disconnectedCallback() {
    this.stickyObserver?.disconnect();
    this.footerObserver?.disconnect();
    super.disconnectedCallback();
  }
  updateSticky() {
    const sticky = this.querySelector('[data-knr-sticky]');
    if (sticky) sticky.hidden = !this.purchasePassed || this.footerVisible;
  }
  onClick(event) {
    if (!(event.target instanceof Element)) return;
    const variant = event.target.closest('[data-knr-variant]');
    if (variant && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      if (!this.busy) this.selectVariant(variant.dataset.knrVariant, true);
    }
    const zoom = event.target.closest('[data-knr-zoom]');
    if (zoom) {
      this.zoomOpener = zoom;
      this.querySelector('[data-knr-zoom-image]').src = zoom.dataset.knrZoom;
      this.querySelector('[data-knr-lightbox]').showModal();
    }
  }
  selectVariant(id, updateUrl, behavior = motion()) {
    const variant = this.data.variants.find((item) => String(item.id) === String(id));
    if (!variant) return;
    this.form.elements.id.value = variant.id;
    this.form.elements.quantity.value = variant.minimum;
    for (const link of this.querySelectorAll('[data-knr-variant]')) {
      if (link.dataset.knrVariant === String(variant.id)) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    for (const node of this.querySelectorAll('[data-knr-current]'))
      node.textContent = variant.price;
    for (const node of this.querySelectorAll('[data-knr-compare]')) {
      node.textContent = variant.compare || '';
      node.hidden = !variant.compare;
    }
    for (const node of this.querySelectorAll('[data-knr-unit]')) node.textContent = variant.unit;
    const availability = this.querySelector('[data-knr-availability]');
    if (availability)
      availability.textContent = variant.available
        ? this.data.labels.delivery
        : this.data.labels.soldOut;
    this.querySelector('knr-reassurance')?.setAvailability(variant.available);
    this.status.hidden = true;
    this.setButtons(false);
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('variant', variant.id);
      history.pushState({}, '', url);
    }
    const media = this.querySelector(`[data-media-id="${variant.mediaId}"]`);
    if (media) this.gallery.scrollTo({ left: media.offsetLeft, behavior });
  }
  setButtons(busy) {
    const variant = this.data.variants.find(
      (item) => String(item.id) === this.form.elements.id.value,
    );
    for (const button of this.querySelectorAll('[data-knr-add]')) {
      button.disabled = busy || !variant?.available;
      button.textContent =
        busy && this.activeForm === this.form
          ? this.data.labels.adding
          : variant?.available
            ? this.data.labels.add
            : this.data.labels.soldOut;
      button.setAttribute('aria-busy', String(busy && this.activeForm === this.form));
    }
    for (const button of this.querySelectorAll('[data-knr-quick-add]')) {
      const adding = busy && button.form === this.activeForm;
      button.disabled = busy || button.dataset.available !== 'true';
      button.setAttribute('aria-busy', String(adding));
      button.setAttribute('aria-label', adding ? this.data.labels.adding : button.dataset.label);
    }
    for (const link of this.querySelectorAll('[data-knr-variant]')) {
      if (busy) link.setAttribute('aria-disabled', 'true');
      else link.removeAttribute('aria-disabled');
    }
  }
  moveGallery(direction) {
    const count = this.gallery?.children.length || 0;
    const width = this.gallery?.clientWidth;
    if (count < 2 || !width) return;
    const current = Math.round(this.gallery.scrollLeft / width);
    const next = (current + direction + count) % count;
    this.gallery.scrollTo({ left: next * width, behavior: motion() });
  }
  updateProgress() {
    if (!this.gallery) return;
    const progress = this.querySelector('[data-knr-gallery-progress]');
    const count = this.gallery.children.length;
    if (progress && count) {
      progress.style.width = `${100 / count}%`;
      progress.style.transform = `translateX(${(this.gallery.scrollLeft / this.gallery.clientWidth) * 100}%)`;
    }
  }
  async addToCart(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (this.busy || !form.reportValidity() || event.submitter?.disabled) return;
    const status =
      form === this.form
        ? this.status
        : form.closest('.knr-related-card').querySelector('[data-knr-quick-add-status]');
    const variantId = form.elements.id.value;
    const quantity = Number(form.elements.quantity.value);
    this.busy = true;
    this.activeForm = form;
    this.setButtons(true);
    status.hidden = true;
    let confirmed = false;
    try {
      const sections = [
        ...new Set(
          [...document.querySelectorAll('cart-items-component')]
            .map((node) => node.dataset.sectionId)
            .filter(Boolean),
        ),
      ].slice(0, 5);
      const payload = new FormData(form);
      payload.set('sections', sections.join(','));
      payload.set('sections_url', `${location.pathname}${location.search}`);
      const response = await fetch(cartRoute('cart/add.js'), {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
        signal: this.controller.signal,
      });
      confirmed = response.ok;
      const result = await response.json();
      if (!response.ok || result.status) {
        confirmed = false;
        throw Object.assign(new Error('Cart request rejected'), {
          customerMessage: result.description || result.message || this.data.labels.error,
        });
      }
      const cartResponse = await fetch(cartRoute('cart.js'), {
        headers: { Accept: 'application/json' },
        signal: this.controller.signal,
      });
      if (!cartResponse.ok) throw new Error(this.data.labels.refreshError);
      const cart = await cartResponse.json();
      // Let the native drawer remember the enabled purchase control for focus restoration.
      this.setButtons(false);
      event.submitter?.focus({ preventScroll: true });
      const deferred = CartLinesUpdateEvent.createPromise();
      this.dispatchEvent(
        new CartLinesUpdateEvent({
          action: 'add',
          context: 'product',
          lines: [{ merchandiseId: variantId, quantity }],
          promise: deferred.promise,
        }),
      );
      deferred.resolve({
        cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart),
        detail: {
          items: cart.items,
          sections: result.sections,
          itemCount: cart.item_count,
          productId: form.dataset.productId || this.dataset.productId,
          source: 'product-form-component',
          sourceId: this.dataset.sectionId,
          didError: false,
        },
      });
      status.textContent = this.data.labels.added;
      status.hidden = false;
      status.classList.remove('knr-error');
    } catch (error) {
      if (error.name === 'AbortError') return;
      status.classList.add('knr-error');
      status.textContent = confirmed
        ? this.data.labels.refreshError
        : error.customerMessage || this.data.labels.error;
      status.hidden = false;
      if (confirmed) {
        const link = document.createElement('a');
        link.href = cartRoute('cart');
        link.textContent = this.data.labels.viewCart;
        link.className = 'knr-link';
        status.append(' ', link);
      }
    } finally {
      this.busy = false;
      if (this.isConnected) this.setButtons(false);
      this.activeForm = null;
    }
  }
}

class KnrScroller extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    this.track = this.querySelector('[data-knr-scroll]');
    this.listen(this.track, 'scroll', () => this.update(), { passive: true });
    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.update());
    if (this.track) this.resizeObserver.observe(this.track);
    this.update();
  }
  update() {
    const progress = this.querySelector('[data-knr-scroll-progress]');
    if (!progress || !this.track) return;
    const distance = this.track.scrollWidth - this.track.clientWidth;
    const fraction = distance > 0 ? Math.min(1, Math.max(0, this.track.scrollLeft / distance)) : 0;
    progress.style.width = distance > 0 ? '25%' : '100%';
    progress.style.transform = `translateX(${fraction * 300}%)`;
  }
  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    super.disconnectedCallback();
  }
}

class KnrTestimonials extends KnrScroller {
  connectedCallback() {
    super.connectedCallback();
    this.listen(this.querySelector('[data-knr-next]'), 'click', () => this.move(1));
    this.listen(this.querySelector('[data-knr-previous]'), 'click', () => this.move(-1));
    this.listen(this.track, 'scrollend', () => {
      const status = this.querySelector('[data-knr-slide-status]');
      if (status)
        status.textContent = `${Math.round(this.track.scrollLeft / this.track.clientWidth) + 1} / ${this.track.children.length}`;
    });
  }
  move(direction) {
    const count = this.track.children.length;
    const current = Math.round(this.track.scrollLeft / this.track.clientWidth);
    const next = (current + direction + count) % count;
    this.track.scrollTo({
      left: next * this.track.clientWidth,
      behavior: motion(),
    });
  }
}

class KnrComparison extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    const input = this.querySelector('[data-knr-comparison]');
    this.listen(input, 'input', () => {
      this.style.setProperty('--knr-compare', `${input.value}%`);
      input.setAttribute(
        'aria-valuetext',
        input.dataset.valueLabel.replace('[value]', input.value),
      );
    });
  }
}

class KnrReviews extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    this.filter = this.querySelector('[data-knr-filter]');
    this.limit = Number(this.dataset.pageSize) || 3;
    this.listen(this.filter, 'change', () => {
      this.limit = Number(this.dataset.pageSize);
      this.update(true);
    });
    this.listen(this.querySelector('[data-knr-load-more]'), 'click', (event) => {
      const previousCount = this.querySelectorAll('[data-knr-review]:not([hidden])').length;
      this.limit += Number(this.dataset.pageSize);
      this.update(true);
      // Keyboard and assistive-technology users continue at the newly revealed reviews.
      if (event.detail === 0)
        this.querySelectorAll('[data-knr-review]:not([hidden])')
          [previousCount]?.querySelector('h3')
          ?.focus({ preventScroll: true });
    });
    this.listen(this, 'click', (event) => {
      if (!(event.target instanceof Element)) return;
      const rating = event.target.closest('[data-knr-rating]');
      if (rating) {
        this.filter.value = rating.dataset.knrRating;
        this.limit = Number(this.dataset.pageSize);
        this.update(true);
      }
      const opener = event.target.closest('[data-knr-dialog-open]');
      if (opener) {
        this.dialogOpener = opener;
        const dialog = document.getElementById(opener.dataset.knrDialogOpen);
        if (dialog?.open) dialog.close();
        dialog?.showModal();
      }
      const closer = event.target.closest('[data-knr-dialog-close]');
      if (closer) closer.closest('dialog')?.close();
    });
    for (const dialog of this.querySelectorAll('dialog')) {
      this.listen(dialog, 'close', () => {
        if (!dialog.open) this.dialogOpener?.focus({ preventScroll: true });
      });
      this.listen(dialog, 'keydown', (event) => {
        if (event.key === 'Escape' && !dialog.matches(':modal')) dialog.close();
      });
      const form = dialog.querySelector('form');
      // Shopify inserts CAPTCHA outside the dialog. Release the modal top layer
      // on a valid submit while keeping the native form visible for verification
      // and retries. Constraint validation runs before this event.
      this.listen(
        form,
        'submit',
        () => {
          if (!dialog.matches(':modal')) return;
          dialog.close();
          dialog.show();
        },
        { capture: true },
      );
      if (dialog.querySelector('[data-knr-form-result]') && location.hash === `#${form?.id}`) {
        dialog.showModal();
        dialog.querySelector('[data-knr-form-result]')?.focus();
      }
    }
    this.update(false);
  }
  update(announce) {
    for (const rating of this.querySelectorAll('[data-knr-rating]'))
      rating.setAttribute('aria-pressed', String(rating.dataset.knrRating === this.filter.value));
    let total = 0;
    let visible = 0;
    for (const review of this.querySelectorAll('[data-knr-review]')) {
      const match = this.filter.value === 'all' || review.dataset.rating === this.filter.value;
      if (match) total += 1;
      review.hidden = !match || total > this.limit;
      if (!review.hidden) visible += 1;
    }
    this.querySelector('[data-knr-load-more]').hidden = visible >= total;
    this.querySelector('[data-knr-no-reviews]').hidden =
      total > 0 || !this.querySelector('[data-knr-review]');
    const status = this.querySelector('[data-knr-review-status]');
    if (announce)
      status.textContent = status.dataset.label
        .replace('[shown]', visible)
        .replace('[total]', total);
  }
}

class KnrFooter extends KnrComponent {
  connectedCallback() {
    super.connectedCallback();
    const localizationForm = this.querySelector('.knr-footer__localization form');
    if (localizationForm) {
      const hint = localizationForm.querySelector('[data-knr-localization-hint]');
      const submit = localizationForm.querySelector('[data-knr-localization-submit]');
      // Size to the selected label, rather than the longest native option.
      const updateSelection = (select) => {
        const selection = select.parentElement?.querySelector('[data-knr-selection]');
        if (!selection) return;
        selection.textContent = select.selectedOptions[0]?.textContent.trim() || '';
        selection.hidden = false;
        select.parentElement.classList.add('knr-footer__select--enhanced');
      };
      // Native submission keeps Shopify's locale/market routing and return URL.
      this.listen(localizationForm, 'change', (event) => {
        if (!(event.target instanceof HTMLSelectElement)) return;
        updateSelection(event.target);
        localizationForm.requestSubmit();
      });
      for (const select of localizationForm.querySelectorAll('select')) {
        if (hint) select.setAttribute('aria-describedby', hint.id);
        updateSelection(select);
      }
      if (hint) hint.hidden = false;
      // Keep an explicit submit button if the enhancement cannot initialize.
      if (submit) submit.hidden = true;
    }
    this.mediaQuery = matchMedia('(min-width:750px)');
    const update = () => {
      for (const menu of this.querySelectorAll('.knr-footer__menu')) {
        menu.open = this.mediaQuery.matches;
        menu.querySelector('summary').tabIndex = this.mediaQuery.matches ? -1 : 0;
      }
    };
    this.listen(this.mediaQuery, 'change', update);
    for (const menu of this.querySelectorAll('.knr-footer__menu')) {
      this.listen(menu, 'toggle', () => {
        if (this.mediaQuery.matches && !menu.open) menu.open = true;
      });
    }
    this.listen(this, 'click', async (event) => {
      const link =
        event.target instanceof Element && event.target.closest('a[data-knr-cookie-preferences]');
      if (!link || typeof window.privacyBanner?.showPreferences !== 'function') return;
      event.preventDefault();
      try {
        await window.privacyBanner.showPreferences();
      } catch {
        location.assign(link.href);
      }
    });
    update();
  }
}

for (const [name, constructor] of Object.entries({
  'knr-input-modality': KnrInputModality,
  'knr-reveals': KnrReveals,
  'knr-accordions': KnrAccordions,
  'knr-header': KnrHeader,
  'knr-reassurance': KnrReassurance,
  'knr-product': KnrProduct,
  'knr-scroller': KnrScroller,
  'knr-testimonials': KnrTestimonials,
  'knr-comparison': KnrComparison,
  'knr-reviews': KnrReviews,
  'knr-footer': KnrFooter,
})) {
  if (!customElements.get(name)) customElements.define(name, constructor);
}
