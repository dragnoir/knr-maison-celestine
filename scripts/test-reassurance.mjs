import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

// Exercise the actual component's timer/lifecycle contracts without changing store stock.
// Browser checks separately cover real DOM, layout, keyboard and Shopify section reloads.
const source = await readFile(
  new URL('../theme/assets/knr-components.js', import.meta.url),
  'utf8',
);
const base = source.slice(
  source.indexOf('class KnrComponent'),
  source.indexOf('/** Optional editorial'),
);
const carousel = source.slice(
  source.indexOf('class KnrReassurance'),
  source.indexOf('class KnrProduct'),
);

function fixture({ autoplay = true, available = true, reduced = false, editor = false } = {}) {
  class Node extends EventTarget {
    constructor() {
      super();
      this.attributes = {};
      this.dataset = {};
      this.isConnected = true;
    }
    setAttribute(key, value) {
      this.attributes[key] = value;
    }
    removeAttribute(key) {
      delete this.attributes[key];
    }
    connectedCallback() {}
    disconnectedCallback() {}
    updatedCallback() {}
    contains() {
      return false;
    }
  }
  const nodes = Array.from({ length: 4 }, () => new Node());
  const controls = Array.from({ length: 4 }, () => new Node());
  const track = new Node(),
    ticks = new Node();
  const document = new Node(),
    media = new Node();
  media.matches = reduced;
  const timers = new Map();
  let timerId = 0,
    observer;
  const Controller = runInNewContext(`${base}\n${carousel}\nKnrReassurance`, {
    Component: Node,
    AbortController,
    document,
    window: { Shopify: { designMode: editor } },
    matchMedia: () => media,
    setTimeout: (callback) => {
      timers.set(++timerId, callback);
      return timerId;
    },
    clearTimeout: (id) => timers.delete(id),
    IntersectionObserver: class {
      constructor(callback) {
        this.callback = callback;
        observer = this;
      }
      observe() {}
      disconnect() {
        this.disconnected = true;
      }
    },
  });
  const component = new Controller();
  component.dataset = {
    autoplay: String(autoplay),
    available: String(available),
    interval: '4000',
  };
  component.querySelectorAll = (selector) => (selector === '[data-knr-message]' ? nodes : controls);
  component.querySelector = (selector) =>
    ({
      '.knr-product__delivery': track,
      '.knr-product__ticks': ticks,
    })[selector];
  component.connectedCallback();
  const visible = (value) =>
    observer.callback([{ isIntersecting: value, intersectionRatio: value ? 1 : 0 }]);
  visible(true);
  const advance = () => {
    const callbacks = [...timers.values()];
    timers.clear();
    callbacks.forEach((callback) => callback());
  };
  return {
    component,
    nodes,
    controls,
    document,
    media,
    timers,
    visible,
    advance,
    observer: () => observer,
  };
}

test('cycles all four messages with one timer, and stops while offscreen or in a hidden tab', () => {
  const f = fixture();
  for (const expected of [1, 2, 3, 0]) {
    assert.equal(f.timers.size, 1);
    f.advance();
    assert.equal(f.component.index, expected);
  }
  f.visible(false);
  assert.equal(f.timers.size, 0);
  f.visible(true);
  assert.equal(f.timers.size, 1);
  f.document.hidden = true;
  f.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(f.timers.size, 0);
  f.document.hidden = false;
  f.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(f.timers.size, 1);
});

test('sold-out selection restores the stock slide and prevents misleading rotation or manual selection', () => {
  const f = fixture();
  f.advance();
  f.component.setAvailability(false);
  assert.equal(f.component.index, 0);
  assert.equal(f.timers.size, 0);
  assert.ok(f.controls.every((control) => control.disabled));
  f.controls[2].dispatchEvent(new Event('click'));
  assert.equal(f.component.index, 0);
  f.component.setAvailability(true);
  assert.ok(f.controls.every((control) => !control.disabled));
  assert.equal(f.timers.size, 1);
});

test('focus pauses manual selection until leaving the carousel; reduced motion stops rotation', () => {
  const f = fixture();
  assert.equal(f.component.interval, 4000);
  f.component.dispatchEvent(new Event('focusin'));
  f.controls[2].dispatchEvent(new Event('click'));
  assert.equal(f.component.index, 2);
  assert.equal(f.timers.size, 0);
  f.component.dispatchEvent(new Event('focusout'));
  assert.equal(f.timers.size, 1);
  f.media.matches = true;
  f.media.dispatchEvent(new Event('change'));
  assert.equal(f.timers.size, 0);
  f.controls[3].dispatchEvent(new Event('click'));
  assert.equal(f.component.index, 3);
});

test('autoplay setting, initial reduced motion and editor mode prevent timer startup', () => {
  for (const options of [{ autoplay: false }, { reduced: true }, { editor: true }]) {
    const f = fixture(options);
    assert.equal(f.timers.size, 0);
    f.controls[1].dispatchEvent(new Event('click'));
    assert.equal(f.component.index, 1);
  }
});

test('disconnect and section refresh remove timers/observers and do not duplicate listeners', () => {
  const f = fixture();
  f.component.disconnectedCallback();
  assert.equal(f.timers.size, 0);
  assert.equal(f.observer().disconnected, true);
  f.component.connectedCallback();
  f.visible(true);
  f.component.updatedCallback();
  f.visible(true);
  assert.equal(f.timers.size, 1);
  f.component.dispatchEvent(new Event('focusin'));
  f.controls[1].dispatchEvent(new Event('click'));
  assert.equal(f.timers.size, 0);
  f.component.dispatchEvent(new Event('focusout'));
  assert.equal(f.timers.size, 1);
});
