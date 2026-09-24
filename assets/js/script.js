document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const backdrop = document.querySelector(".nav-backdrop");

  const closeMenu = () => {
    links.classList.remove("open");
    backdrop?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    links.classList.add("open");
    backdrop?.classList.add("open");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  if (toggle && links) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      links.classList.contains("open") ? closeMenu() : openMenu();
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeMenu)
    );
    backdrop?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // Scroll-in reveal. Uses a plain getBoundingClientRect check on every
  // scroll/resize frame rather than IntersectionObserver, so an element
  // can never end up permanently stuck invisible if a fast or
  // programmatic scroll jumps past it without an intersection firing.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealSelectors = [
    ".card", ".step-card", ".feature-item", ".compare-card",
    ".timeline-item", ".price-card", ".contact-card", ".section-head",
    ".hero-art", ".cta-band"
  ];
  const revealEls = Array.from(document.querySelectorAll(revealSelectors.join(",")));

  if (revealEls.length && !reduceMotion) {
    const groupSelectors = ".card-grid, .feature-grid, .steps, .loc-grid, .compare, .timeline";
    revealEls.forEach((el) => {
      el.classList.add("reveal");
      if (el.parentElement && el.parentElement.matches(groupSelectors)) {
        el.parentElement.classList.add("reveal-group");
      }
    });

    let pending = revealEls.slice();
    let ticking = false;
    const checkReveal = () => {
      ticking = false;
      const vh = window.innerHeight;
      pending = pending.filter((el) => {
        // Reveal once the element's top has reached the viewport threshold —
        // deliberately not requiring r.bottom > 0, so an element a fast or
        // programmatic scroll jumps straight past (already above the
        // viewport by the time we check) still gets revealed instead of
        // staying stuck invisible forever.
        const r = el.getBoundingClientRect();
        if (r.top < vh - 60) {
          el.classList.add("in-view");
          return false;
        }
        return true;
      });
      if (pending.length === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkReveal);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    checkReveal();
  }

  // Back to top
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("show", window.scrollY > 480);
      },
      { passive: true }
    );
  }
});
