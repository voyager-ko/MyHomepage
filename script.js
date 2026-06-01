const root = document.documentElement;
const header = document.querySelector(".site-sidebar");
const menuButton = document.querySelector(".menu-button");
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  root.dataset.theme = "dark";
  themeButton?.setAttribute("aria-pressed", "true");
  if (themeIcon) themeIcon.textContent = "☀";
}

menuButton?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".global-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

themeButton?.addEventListener("click", () => {
  const isDark = root.dataset.theme === "dark";
  if (isDark) {
    delete root.dataset.theme;
    localStorage.setItem("theme", "light");
    themeButton.setAttribute("aria-pressed", "false");
    if (themeIcon) themeIcon.textContent = "☾";
  } else {
    root.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
    themeButton.setAttribute("aria-pressed", "true");
    if (themeIcon) themeIcon.textContent = "☀";
  }
});
