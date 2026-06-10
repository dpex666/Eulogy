// Helpers for running inside an iframe on the Gaia Digital website.

export function isEmbedded(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin access to window.top throws — which means we are framed.
    return true;
  }
}

// Stripe Checkout refuses to render inside an iframe, so when embedded we
// navigate the parent (Gaia) page instead of the frame. Assigning to
// window.top.location is permitted cross-origin even though reading is not.
export function redirectTopLevel(url: string) {
  if (isEmbedded() && window.top) {
    window.top.location.href = url;
  } else {
    window.location.href = url;
  }
}
