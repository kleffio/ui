const GLOW_FOLLOW_KEY = "__kleffioGlowFollowInstalled";
const GLOW_FOLLOW_SELECTOR = ".overview-glass-card[data-frosted][data-spotlight=\"true\"]";

declare global {
  interface Window {
    [GLOW_FOLLOW_KEY]?: boolean;
  }
}

function getGlowFollowElement(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const element = target.closest(GLOW_FOLLOW_SELECTOR);

  return element instanceof HTMLElement ? element : null;
}

export function setGlowFollowPosition(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

  element.style.setProperty("--glow-follow-x", `${x}px`);
  element.style.setProperty("--glow-follow-y", `${y}px`);
}

export function clearGlowFollowPosition(element: HTMLElement) {
  void element;
  // Keep the last position so the glow fades out where the pointer left.
}

export function installGlowFollow() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (window[GLOW_FOLLOW_KEY]) {
    return;
  }

  window[GLOW_FOLLOW_KEY] = true;

  document.addEventListener(
    "pointermove",
    (event) => {
      const element = getGlowFollowElement(event.target);

      if (element) {
        setGlowFollowPosition(element, event.clientX, event.clientY);
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "mousemove",
    (event) => {
      const element = getGlowFollowElement(event.target);

      if (element) {
        setGlowFollowPosition(element, event.clientX, event.clientY);
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "pointerout",
    (event) => {
      const element = getGlowFollowElement(event.target);

      if (!element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) {
        return;
      }

      clearGlowFollowPosition(element);
    },
    { passive: true },
  );

  document.addEventListener(
    "mouseout",
    (event) => {
      const element = getGlowFollowElement(event.target);

      if (!element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) {
        return;
      }

      clearGlowFollowPosition(element);
    },
    { passive: true },
  );
}

installGlowFollow();
