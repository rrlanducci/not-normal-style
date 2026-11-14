const yearElement = document.querySelector("#current-year");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#main-navigation");
const submenuButton = document.querySelector(".submenu-button");
const servicesSubmenu = document.querySelector("#services-submenu");

if (yearElement) yearElement.textContent = new Date().getFullYear();

const closeMainMenu = () => {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
};
const closeSubmenu = () => {
  if (!submenuButton || !servicesSubmenu) return;
  servicesSubmenu.classList.remove("is-open");
  submenuButton.setAttribute("aria-expanded", "false");
};

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    if (!open) closeSubmenu();
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    closeMainMenu();
    closeSubmenu();
  }));
}
if (submenuButton && servicesSubmenu) {
  submenuButton.addEventListener("click", () => {
    const open = servicesSubmenu.classList.toggle("is-open");
    submenuButton.setAttribute("aria-expanded", String(open));
  });
}
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const submenuOpen = servicesSubmenu?.classList.contains("is-open");
  closeSubmenu();
  closeMainMenu();
  (submenuOpen ? submenuButton : menuButton)?.focus();
});

document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".service-item").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const modal = document.querySelector("#consultation-success-modal");
const closeModalButton = document.querySelector("#close-success-modal");
const modalTitle = document.querySelector("#success-modal-title");
let previousFocus = null;
const openModal = () => {
  if (!modal) return;
  previousFocus = document.activeElement;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  modalTitle?.focus();
};
const closeModal = () => {
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
};
closeModalButton?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") closeModal();
});

const consultationForm = document.querySelector("#consultation-form");
if (consultationForm) {
  const status = document.querySelector("#form-status");
  const submitButton = consultationForm.querySelector(".form-submit");
  const buttonText = submitButton?.textContent || "Send enquiry";
  const setError = (field, message) => {
    const error = document.querySelector(`#${field.id}-error`);
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  };
  const clearErrors = () => {
    consultationForm.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
    consultationForm.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
    if (status) status.textContent = "";
  };
  const setSubmitting = (active) => {
    if (!submitButton) return;
    submitButton.disabled = active;
    submitButton.textContent = active ? "Sending..." : buttonText;
  };

  consultationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    let firstInvalid = null;
    const name = consultationForm.elements["full-name"];
    const email = consultationForm.elements.email;
    const confirmEmail = consultationForm.elements["confirm-email"];
    const language = consultationForm.elements.language;
    const message = consultationForm.elements.message;
    const privacy = consultationForm.elements["privacy-acknowledgement"];
    const interests = consultationForm.querySelectorAll("input[name='interest']:checked");

    if (!name.value.trim()) { setError(name, "Please enter your name."); firstInvalid ||= name; }
    if (!email.value.trim() || !email.validity.valid) { setError(email, "Please enter a valid email address, for example name@example.com."); firstInvalid ||= email; }
    if (!confirmEmail.value.trim() || confirmEmail.value.trim().toLowerCase() !== email.value.trim().toLowerCase()) { setError(confirmEmail, "The email addresses must match."); firstInvalid ||= confirmEmail; }
    if (!language.value) { setError(language, "Please select your preferred language."); firstInvalid ||= language; }
    if (!interests.length) {
      const error = document.querySelector("#interest-error");
      if (error) error.textContent = "Please select at least one option.";
      firstInvalid ||= consultationForm.querySelector("input[name='interest']");
    }
    if (!message.value.trim()) { setError(message, "Please tell us briefly what you would like help with."); firstInvalid ||= message; }
    if (!privacy.checked) { setError(privacy, "Please confirm that you have read the Privacy Policy."); firstInvalid ||= privacy; }

    if (firstInvalid) {
      if (status) status.textContent = "Please review the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    setSubmitting(true);
    if (status) status.textContent = "Sending your enquiry...";
    try {
      const response = await fetch(consultationForm.action, {
        method: "POST",
        body: new FormData(consultationForm),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Submission failed");
      consultationForm.reset();
      if (status) status.textContent = "";
      openModal();
    } catch (error) {
      if (status) status.textContent = "Something went wrong while sending your enquiry. Please try again or contact us by email.";
    } finally {
      setSubmitting(false);
    }
  });
}

/* Style Discovery consultation integration */
(() => {
  const form = document.querySelector("#consultation-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const style = params.get("style");
  const influence = params.get("influence");
  const concern = params.get("concern");
  const service = params.get("service");

  if (!style && !influence && !concern && !service) return;

  const safeText = (value, max = 120) => (value || "").trim().slice(0, max);
  const result = {
    style: safeText(style),
    influence: safeText(influence),
    concern: safeText(concern),
    service: safeText(service)
  };

  const concernLabels = {
    comfort: "Comfort is important, but outfits can feel unfinished.",
    predictable: "The wardrobe feels dependable but too predictable.",
    outfits: "Quality pieces are difficult to turn into complete outfits.",
    coherence: "The wardrobe has ideas but lacks coherence.",
    confidence: "More confidence is wanted without feeling overdone.",
    current: "Delicate details are appealing but can be difficult to make current.",
    stronger: "Stronger outfits are wanted without feeling like a costume.",
    unsure: "The personal style direction is still unclear."
  };

  const title = document.createElement("h2");
  title.id = "style-discovery-summary-title";
  title.textContent = "Your Style Discovery result";

  const summary = document.createElement("section");
  summary.className = "style-discovery-summary";
  summary.setAttribute("aria-labelledby", title.id);
  summary.appendChild(title);

  const intro = document.createElement("p");
  intro.textContent = "Your quiz result has been carried into this enquiry so Camila can review it with your message.";
  summary.appendChild(intro);

  const list = document.createElement("dl");
  const addItem = (label, value) => {
    if (!value) return;
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    list.append(dt, dd);
  };
  addItem("Leading direction", result.style);
  addItem("Secondary influence", result.influence);
  addItem("Recommended next step", result.service);
  addItem("Main styling concern", concernLabels[result.concern] || result.concern);
  summary.appendChild(list);

  const editLink = document.createElement("a");
  editLink.href = "style-quiz.html";
  editLink.className = "style-discovery-summary__link";
  editLink.textContent = "Retake Style Discovery";
  summary.appendChild(editLink);

  form.insertBefore(summary, form.firstChild);

  const hiddenFields = {
    "style-discovery-primary": result.style,
    "style-discovery-secondary": result.influence,
    "style-discovery-concern": concernLabels[result.concern] || result.concern,
    "style-discovery-service": result.service
  };

  Object.entries(hiddenFields).forEach(([name, value]) => {
    if (!value) return;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  const message = form.elements.message;
  if (message && !message.value.trim()) {
    const lines = [
      "I completed the Style Discovery quiz.",
      result.style ? `Leading direction: ${result.style}` : "",
      result.influence ? `Secondary influence: ${result.influence}` : "",
      result.service ? `Recommended next step: ${result.service}` : "",
      result.concern ? `Main styling concern: ${concernLabels[result.concern] || result.concern}` : "",
      "",
      "I would also like help with: "
    ].filter((line, index, array) => line || (index > 0 && array[index - 1]));
    message.value = lines.join("\n");
  }

  summary.scrollIntoView({ block: "start" });
})();

