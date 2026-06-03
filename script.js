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

document.querySelectorAll("video[data-force-muted]").forEach((video) => {
  const keepMuted = () => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
  };

  keepMuted();
  video.addEventListener("play", keepMuted);
  video.addEventListener("volumechange", keepMuted);
});

const expandableImages = document.querySelectorAll(".maze-comparison img");

if (expandableImages.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="image-lightbox__close" type="button" aria-label="画像を閉じる">×</button>
    <figure class="image-lightbox__content">
      <img class="image-lightbox__image" alt="" />
      <figcaption class="image-lightbox__caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".image-lightbox__image");
  const lightboxCaption = lightbox.querySelector(".image-lightbox__caption");
  const closeButton = lightbox.querySelector(".image-lightbox__close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  expandableImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");

    const openLightbox = () => {
      const caption = image.closest("figure")?.querySelector("figcaption")?.textContent?.trim() ?? image.alt;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton?.focus();
    };

    image.addEventListener("click", openLightbox);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
