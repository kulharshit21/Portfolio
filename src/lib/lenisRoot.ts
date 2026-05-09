import type Lenis from 'lenis';

let lenisRef: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisRef = instance;
}

/** Keep Lenis and native scroll in sync at y=0 (e.g. after lazy routes / ST refresh). */
export function snapScrollTop() {
  lenisRef?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
