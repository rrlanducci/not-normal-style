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


/* Consultation form validation. */
const consultationForm = document.querySelector("#consultation-form");
if (consultationForm) {
  const status = document.querySelector("#form-status");

  const setError = (field, message) => {
    const error = document.querySelector(`#${field.id}-error`);
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  };

  const clearErrors = () => {
    consultationForm.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
    consultationForm.querySelectorAll(".field-error").forEach((error) => error.textContent = "");
    status.textContent = "";
  };

  consultationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    let firstInvalid = null;

    const name = consultationForm.elements["full-name"];
    const email = consultationForm.elements.email;
    const confirmEmail = consultationForm.elements["confirm-email"];
    const language = consultationForm.elements.language;
    const message = consultationForm.elements.message;
    const privacy = consultationForm.elements["privacy-acknowledgement"];
    const interest = consultationForm.querySelector("input[name='interest']:checked");

    if (!name.value.trim()) { setError(name, "Please enter your name."); firstInvalid ||= name; }
    if (!email.value.trim() || !email.validity.valid) { setError(email, "Please enter a valid email address, for example name@example.com."); firstInvalid ||= email; }
    if (!confirmEmail.value.trim() || confirmEmail.value.trim().toLowerCase() !== email.value.trim().toLowerCase()) { setError(confirmEmail, "The email addresses must match."); firstInvalid ||= confirmEmail; }
    if (!language.value) { setError(language, "Please select your preferred language."); firstInvalid ||= language; }
    if (!interest) { document.querySelector("#interest-error").textContent = "Please choose what brings you here."; firstInvalid ||= consultationForm.querySelector("input[name='interest']"); }
    if (message.value.trim().length < 20) { setError(message, "Please add at least 20 characters so Camila Rades can understand your enquiry."); firstInvalid ||= message; }
    if (!privacy.checked) { setError(privacy, "Please confirm that you have read the Privacy Policy."); firstInvalid ||= privacy; }

    if (firstInvalid) {
      status.textContent = "Please review the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    status.textContent = "The form is complete. Delivery is not connected in this local preview, so no information has been sent.";
  });
}
