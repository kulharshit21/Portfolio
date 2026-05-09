import type Lenis from 'lenis';

/** Fixed header allowance for in-page anchor targets (matches scroll-spy). */
export const NAV_SCROLL_OFFSET_PX = 112;

type LenisScrollListener = (lenis: Lenis) => void;

let lenisRef: Lenis | null = null;
const scrollListeners = new Set<LenisScrollListener>();

export function setLenisInstance(instance: Lenis | null) {
  if (lenisRef) {
    for (const fn of scrollListeners) lenisRef.off('scroll', fn);
  }
  lenisRef = instance;
  if (instance) {
    for (const fn of scrollListeners) instance.on('scroll', fn);
  }
}

/**
 * Subscribe to Lenis scroll (handlers run on the Lenis RAF path).
 * Safe if Lenis is not ready yet — listeners attach when `setLenisInstance` runs.
 */
export function subscribeLenisScroll(listener: LenisScrollListener) {
  scrollListeners.add(listener);
  lenisRef?.on('scroll', listener);
  return () => {
    scrollListeners.delete(listener);
    lenisRef?.off('scroll', listener);
  };
}

/** Current vertical scroll position (Lenis-smoothed when active). */
export function getLenisScrollY(): number {
  if (lenisRef) return lenisRef.scroll;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/** Smooth scroll to a DOM selector using Lenis when available. */
export function lenisScrollToElement(
  selector: string,
  options?: { offset?: number }
) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  const offset = options?.offset ?? 0;
  if (lenisRef) {
    lenisRef.scrollTo(el, { offset });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function lenisScrollToTop() {
  if (lenisRef) lenisRef.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Keep Lenis and native scroll in sync at y=0 (e.g. after lazy routes / ST refresh). */
export function snapScrollTop() {
  lenisRef?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
