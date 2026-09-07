import '@testing-library/jest-dom/vitest';
import { MotionGlobalConfig } from 'framer-motion';

// Resolve Framer Motion animations (incl. AnimatePresence exit) synchronously in tests,
// so a node is actually gone from the DOM by the time an assertion runs.
MotionGlobalConfig.skipAnimations = true;

/**
 * jsdom doesn't implement these browser APIs. Framer Motion (useInView,
 * useReducedMotion) and a few components touch them, so stub them for tests.
 */
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('IntersectionObserver' in globalThis)) {
  // @ts-expect-error - test-only stub
  globalThis.IntersectionObserver = IntersectionObserverStub;
}
if (!('ResizeObserver' in globalThis)) {
  // @ts-expect-error - test-only stub
  globalThis.ResizeObserver = ResizeObserverStub;
}
if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
