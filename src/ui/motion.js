function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function initScrollReveal() {
  const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!nodes.length) return;

  if (prefersReducedMotion()) {
    for (const n of nodes) n.classList.add("reveal-visible");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("reveal-visible");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  for (const n of nodes) io.observe(n);
}

export function initSubtleParallax() {
  const targets = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!targets.length) return;
  if (prefersReducedMotion()) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY || 0;
    const offset = Math.min(24, y * 0.06);

    for (const t of targets) {
      t.style.setProperty("--parallaxY", `${offset}px`);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}

export function initTilt() {
  if (prefersReducedMotion()) return;

  const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
  if (!canHover) return;

  const targets = Array.from(document.querySelectorAll(".card, .hero-card"));
  if (!targets.length) return;

  const maxDeg = 3;

  for (const node of targets) {
    // Initialize sheen position so first hover looks intentional.
    node.style.setProperty("--hx", "50%");
    node.style.setProperty("--hy", "30%");

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      const rx = clamp(-dy * maxDeg, -maxDeg, maxDeg);
      const ry = clamp(dx * maxDeg, -maxDeg, maxDeg);

      node.style.setProperty("--rx", `${rx}deg`);
      node.style.setProperty("--ry", `${ry}deg`);

      // Sheen / highlight position (percent coords within the element)
      const px = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
      const py = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
      node.style.setProperty("--hx", `${px.toFixed(1)}%`);
      node.style.setProperty("--hy", `${py.toFixed(1)}%`);
    };

    const onLeave = () => {
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
      node.style.setProperty("--hx", "50%");
      node.style.setProperty("--hy", "30%");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
  }
}

export function initHeroSpotlight() {
  if (prefersReducedMotion()) return;

  const hero = document.querySelector(".hero");
  if (!hero) return;

  const setToCenter = () => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${Math.round(rect.width * 0.48)}px`);
    hero.style.setProperty("--my", `${Math.round(rect.height * 0.28)}px`);
  };

  const onMove = (e) => {
    const rect = hero.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    hero.style.setProperty("--mx", `${Math.round(x)}px`);
    hero.style.setProperty("--my", `${Math.round(y)}px`);
  };

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", setToCenter);

  // Initialize so the spotlight looks intentional on first paint.
  setToCenter();
}
