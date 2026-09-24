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
});
