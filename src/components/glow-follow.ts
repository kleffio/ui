const GLOW_FOLLOW_KEY = "__kleffioGlowFollowInstalled";
const GLOW_FOLLOW_SELECTOR = ".overview-glass-card[data-frosted][data-spotlight=\"true\"]";
const GLOW_FOLLOW_EASE = 0.055;
const GLOW_FOLLOW_SETTLE_DISTANCE = 0.1;

type GlowFollowState = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  frame: number | null;
};

const glowFollowStates = new WeakMap<HTMLElement, GlowFollowState>();

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
  const state = glowFollowStates.get(element);

  if (!state) {
    glowFollowStates.set(element, {
      currentX: x,
      currentY: y,
      targetX: x,
      targetY: y,
      frame: null,
    });

    element.style.setProperty("--glow-follow-x", `${x}px`);
    element.style.setProperty("--glow-follow-y", `${y}px`);
    return;
  }

  state.targetX = x;
  state.targetY = y;

  if (state.frame === null) {
    state.frame = window.requestAnimationFrame(() => animateGlowFollow(element, state));
  }
}

function animateGlowFollow(element: HTMLElement, state: GlowFollowState) {
  const nextX = state.currentX + (state.targetX - state.currentX) * GLOW_FOLLOW_EASE;
  const nextY = state.currentY + (state.targetY - state.currentY) * GLOW_FOLLOW_EASE;
  const distanceX = Math.abs(state.targetX - nextX);
  const distanceY = Math.abs(state.targetY - nextY);

  state.currentX = distanceX < GLOW_FOLLOW_SETTLE_DISTANCE ? state.targetX : nextX;
  state.currentY = distanceY < GLOW_FOLLOW_SETTLE_DISTANCE ? state.targetY : nextY;

  element.style.setProperty("--glow-follow-x", `${state.currentX}px`);
  element.style.setProperty("--glow-follow-y", `${state.currentY}px`);

  if (state.currentX === state.targetX && state.currentY === state.targetY) {
    state.frame = null;
    return;
  }

  state.frame = window.requestAnimationFrame(() => animateGlowFollow(element, state));
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
