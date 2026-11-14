(() => {
  const navigator = document.querySelector("#service-navigator");
  if (!navigator) return;

  const stepOne = navigator.querySelector("#service-navigator-step-one");
  const stepTwo = navigator.querySelector("#service-navigator-step-two");
  const resultPanel = navigator.querySelector("#service-navigator-result");
  const refineTitle = navigator.querySelector("#service-navigator-refine-title");
  const refineChoices = navigator.querySelector("#service-navigator-refine");
  const resultTitle = navigator.querySelector("#service-navigator-result-title");
  const resultCopy = navigator.querySelector("#service-navigator-result-copy");
  const viewButton = navigator.querySelector("#service-navigator-view");
  const consultLink = navigator.querySelector("#service-navigator-consult");

  const serviceData = {
    "Complete Image Consulting": {
      group: "signature",
      copy: "A complete exploration of your image, bringing style, colour, proportion and wardrobe together into one clear and confident direction."
    },
    "Personal Style Analysis": {
      group: "discover",
      copy: "Define the visual language that feels most like you and learn how to express it consistently through clothing, accessories and styling."
    },
    "Personal Colour Analysis": {
      group: "discover",
      copy: "Identify the colours that complement your natural characteristics and learn how to use them confidently throughout your wardrobe."
    },
    "Body & Facial Feature Analysis": {
      group: "discover",
      copy: "Understand how proportion, silhouette and detail interact with your natural characteristics, so every styling choice feels more intentional."
    },
    "The Wardrobe Edit": {
      group: "wardrobe",
      copy: "See your existing wardrobe with greater clarity, uncover new outfit possibilities and identify what is genuinely missing."
    },
    "The Capsule Wardrobe — Online": {
      group: "wardrobe",
      copy: "Build a focused, versatile wardrobe in which every piece supports your style, lifestyle and everyday needs."
    },
    "Outfit Styling & Look Creation": {
      group: "wardrobe",
      copy: "Transform familiar pieces into considered outfits that make your wardrobe feel fresh, relevant and easier to wear."
    },
    "Personal Shopping": {
      group: "shopping",
      copy: "Shop with a clear strategy, focusing on pieces that complement your wardrobe, support your lifestyle and earn their place."
    },
    "The Travel Edit — Suitcase Styling": {
      group: "shopping",
      copy: "Travel with a thoughtfully planned wardrobe that works across your destination, itinerary and personal style."
    },
    "Event Styling": {
      group: "occasions",
      copy: "Create a complete look that reflects your personality while responding confidently to the occasion, setting and dress code."
    },
    "Bridal Image Consulting": {
      group: "occasions",
      copy: "Shape a wedding image that feels coherent, personal and unmistakably yours, from silhouette and colour to accessories and finishing details."
    },
    "Styling & Photoshoot Experience": {
      group: "occasions",
      copy: "Prepare a visually coherent selection of looks for portraits, branding, social media or editorial photography."
    },
    "Corporate Image & Personal Branding": {
      group: "corporate",
      copy: "Align your professional appearance with the confidence, credibility and individuality you want to communicate."
    },
    "Corporate Workshops": {
      group: "corporate",
      copy: "Practical and engaging sessions that help teams understand professional presence, personal image and intentional workplace dressing."
    }
  };

  const paths = {
    style: {
      title: "Which part of your style would you like to understand?",
      choices: [
        ["My overall style direction", "Personal Style Analysis"],
        ["The colours that suit me", "Personal Colour Analysis"],
        ["Proportion, silhouettes and features", "Body & Facial Feature Analysis"]
      ]
    },
    wardrobe: {
      title: "What would make your wardrobe more useful?",
      choices: [
        ["Review and refine what I own", "The Wardrobe Edit"],
        ["Build a simpler capsule wardrobe", "The Capsule Wardrobe — Online"],
        ["Create more outfits from familiar pieces", "Outfit Styling & Look Creation"]
      ]
    },
    occasion: {
      title: "What are you preparing for?",
      choices: [
        ["An event", "Event Styling"],
        ["A wedding", "Bridal Image Consulting"],
        ["A portrait, branding or editorial photoshoot", "Styling & Photoshoot Experience"]
      ]
    },
    professional: {
      title: "Who is the professional-image support for?",
      choices: [
        ["An individual professional, executive or entrepreneur", "Corporate Image & Personal Branding"],
        ["A team or organisation", "Corporate Workshops"]
      ]
    }
  };

  function reset() {
    stepOne.hidden = false;
    stepTwo.hidden = true;
    resultPanel.hidden = true;
    refineChoices.replaceChildren();
    const first = stepOne.querySelector("button");
    first?.focus();
  }

  function showRefinement(pathName) {
    const path = paths[pathName];
    if (!path) return;
    refineTitle.textContent = path.title;
    refineChoices.replaceChildren();
    path.choices.forEach(([label, service]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.dataset.service = service;
      refineChoices.appendChild(button);
    });
    stepOne.hidden = true;
    resultPanel.hidden = true;
    stepTwo.hidden = false;
    refineTitle.setAttribute("tabindex", "-1");
    refineTitle.focus();
  }

  function showResult(serviceName) {
    if (serviceName === "consultation") {
      resultTitle.textContent = "Begin with a conversation";
      resultCopy.textContent = "Share what you would like to discover, change or prepare for. Your enquiry will be reviewed personally, with a recommendation for the most relevant starting point.";
      viewButton.hidden = true;
      consultLink.href = "consultation.html?source=service-guide";
    } else {
      const service = serviceData[serviceName];
      if (!service) return;
      resultTitle.textContent = serviceName;
      resultCopy.textContent = service.copy;
      viewButton.hidden = false;
      viewButton.dataset.service = serviceName;
      viewButton.dataset.group = service.group;
      const params = new URLSearchParams({ service: serviceName, source: "service-guide" });
      consultLink.href = `consultation.html?${params.toString()}`;
    }
    stepOne.hidden = true;
    stepTwo.hidden = true;
    resultPanel.hidden = false;
    resultPanel.focus();
  }

  function findServiceDetails(serviceName) {
    return [...document.querySelectorAll("details.service-item")].find((details) =>
      details.querySelector("summary strong")?.textContent.trim() === serviceName
    );
  }

  navigator.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.path) showRefinement(button.dataset.path);
    if (button.dataset.service) showResult(button.dataset.service);
  });

  navigator.querySelector(".service-navigator__back").addEventListener("click", reset);
  navigator.querySelector("#service-navigator-restart").addEventListener("click", reset);

  viewButton.addEventListener("click", () => {
    const details = findServiceDetails(viewButton.dataset.service);
    if (!details) return;
    document.querySelectorAll("details.service-item[open]").forEach((item) => {
      if (item !== details) item.open = false;
    });
    details.open = true;
    details.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => details.querySelector("summary")?.focus(), 450);
  });
})();
