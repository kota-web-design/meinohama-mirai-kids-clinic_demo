const menuButton = document.querySelector(".mobile-menu-button") || document.querySelector("#menuButton");
const globalNav = document.querySelector("#globalNav");
const navLinks = document.querySelectorAll("#globalNav a");
const bookingModal = document.querySelector("#bookingModal");
const bookingButtons = document.querySelectorAll(".js-booking");
const modalClose = document.querySelector("#modalClose");
const demoReserve = document.querySelector("#demoReserve");
const siteHeader = document.querySelector(".site-header");

if (siteHeader && !document.querySelector(".demo-notice")) {
  siteHeader.insertAdjacentHTML(
    "afterend",
    '<div class="demo-notice" role="note"><strong>Portfolio Demo</strong><br class="sp-only"><span>このサイトはポートフォリオ用に制作した架空の医療機関デモサイトです。実際の診療・予約は行われません。</span></div>',
  );
}

function setMenu(open) {
  menuButton?.classList.toggle("is-open", open);
  globalNav?.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
}

menuButton?.addEventListener("click", () => {
  setMenu(!globalNav?.classList.contains("is-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

bookingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMenu(false);
    if (typeof bookingModal?.showModal === "function") bookingModal.showModal();
  });
});

modalClose?.addEventListener("click", () => bookingModal?.close());

bookingModal?.addEventListener("click", (event) => {
  if (event.target === bookingModal) bookingModal.close();
});

demoReserve?.addEventListener("click", () => {
  demoReserve.textContent = "デモ予約を受け付けました ✓";
  demoReserve.disabled = true;
  window.setTimeout(() => {
    bookingModal?.close();
    demoReserve.textContent = "予約画面を体験する";
    demoReserve.disabled = false;
  }, 1300);
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -45px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-current", current);
        });
      });
    },
    { rootMargin: "-28% 0px -62%", threshold: 0 },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
