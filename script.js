const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = siteMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelector(".subscribe").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  input.value = "";
  input.placeholder = "Thanks for subscribing";
});
