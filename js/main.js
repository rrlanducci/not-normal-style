const yearElement = document.querySelector("#current-year");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#main-navigation");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}


/* Keep only one detailed service open at a time. */
const serviceItems = document.querySelectorAll(".service-item");
serviceItems.forEach((currentItem) => {
  currentItem.addEventListener("toggle", () => {
    if (!currentItem.open) return;
    serviceItems.forEach((otherItem) => {
      if (otherItem !== currentItem) otherItem.open = false;
    });
  });
});


/* Services category submenu. */
const submenuButton = document.querySelector(".submenu-button");
const servicesSubmenu = document.querySelector("#services-submenu");

if (submenuButton && servicesSubmenu) {
  const closeServicesSubmenu = () => {
    servicesSubmenu.classList.remove("is-open");
    submenuButton.setAttribute("aria-expanded", "false");
  };

  submenuButton.addEventListener("click", () => {
    const isOpen = servicesSubmenu.classList.toggle("is-open");
    submenuButton.setAttribute("aria-expanded", String(isOpen));
  });

  servicesSubmenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeServicesSubmenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServicesSubmenu();
      submenuButton.focus();
    }
  });
}
