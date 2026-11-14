(() => {
  const styles = {
    sporty: { title: "Sporty", summary: "You are drawn to ease, practicality and clothes that support the way you move through daily life.", qualities: ["Comfort", "Versatility", "Approachability"], guidance: "Build from relaxed layers, breathable fabrics and practical separates, then add finish through texture, proportion and purposeful accessories." },
    traditional: { title: "Traditional", summary: "You value coordination, reliability and a wardrobe that feels appropriate across different situations.", qualities: ["Classic", "Coordinated", "Dependable"], guidance: "Refine trusted formulas through excellent fit, considered tailoring and small details that make familiar combinations feel personal." },
    elegant: { title: "Elegant", summary: "You are naturally drawn to refinement, quality and a polished result that never feels excessive.", qualities: ["Sophistication", "Quality", "Precision"], guidance: "Explore tonal colour, excellent fabrics and clean silhouettes. Let fit, finish and restraint create the impact." },
    creative: { title: "Creative", summary: "You see clothes as a space for individuality and enjoy combinations that feel expressive rather than prescribed.", qualities: ["Originality", "Experimentation", "Expression"], guidance: "Use texture, layering, proportion and unexpected combinations, while repeating a few colours or shapes to keep the result coherent." },
    alluring: { title: "Alluring", summary: "You are drawn to confident silhouettes and details that create presence and celebrate the body with intention.", qualities: ["Confidence", "Presence", "Sensuality"], guidance: "Explore defined silhouettes, rich textures and selective statement details. Balance impact with fit and comfort so the result remains authentically yours." },
    romantic: { title: "Romantic", summary: "You appreciate softness, delicacy and details that bring warmth and grace to an outfit.", qualities: ["Delicacy", "Warmth", "Grace"], guidance: "Explore fluid fabrics, gentle colour and considered detail. Mix softer elements with a clean or modern piece to keep the result current." },
    dramatic: { title: "Dramatic", summary: "You are attracted to strength, contrast and design that creates a clear, memorable point of view.", qualities: ["Impact", "Structure", "Distinction"], guidance: "Build around architectural shapes, strong contrast or one decisive statement piece, then keep supporting elements intentional and controlled." }
  };

  const styleOrder = ["sporty", "traditional", "elegant", "creative", "alluring", "romantic", "dramatic"];
  const questions = [
    ["What matters most when an outfit feels right?", ["I can move freely and feel comfortable.", "Everything feels coordinated and appropriate.", "The fit and finish feel refined.", "The combination feels original and personal.", "The silhouette helps me feel confident and noticeable.", "The details feel soft and delicate.", "The overall impression feels strong and distinctive."]],
    ["Which wardrobe would be easiest for you to wear repeatedly?", ["Relaxed layers, practical separates and comfortable shoes.", "Coordinated staples, tailoring and dependable classics.", "Quality essentials in refined fabrics and tonal colours.", "Interesting shapes, textures, prints and unexpected combinations.", "Fitted pieces, statement details and defined silhouettes.", "Soft fabrics, delicate prints and graceful details.", "Structured pieces, strong contrasts and architectural shapes."]],
    ["How do you generally use accessories?", ["They should be practical and easy to wear.", "I prefer coordinated accessories that complete the outfit.", "I choose a few refined, high-quality pieces.", "I use accessories to make an outfit more individual.", "I like accessories that draw attention and add impact.", "I prefer small, delicate or meaningful details.", "I choose bold accessories with a strong design."]],
    ["Which colour direction feels most natural?", ["Easy neutrals with occasional practical colour.", "Classic, coordinated colour combinations.", "Monochromatic or tonal combinations.", "Unexpected combinations and expressive colour.", "Bold, vivid or high-impact colour.", "Light, soft, pastel or gentle neutral colour.", "Strong contrast, graphic combinations or statement colour."]],
    ["When buying something new, what persuades you?", ["It is comfortable and works with several outfits.", "It is timeless and appropriate for many situations.", "The quality, fabric and fit are excellent.", "It is unusual and gives me new styling possibilities.", "It makes me feel confident and attractive.", "It has a beautiful, delicate detail.", "Its design or shape creates immediate impact."]],
    ["Which approach to getting dressed feels most like you?", ["I combine useful pieces quickly and naturally.", "I prefer a reliable formula that always looks correct.", "I keep the outfit simple but pay close attention to finish.", "I enjoy experimenting until the combination feels unique.", "I build the outfit around the silhouette or statement piece.", "I create a soft, harmonious and graceful impression.", "I begin with a strong piece and build the look around it."]],
    ["What should your clothes communicate?", ["Ease and approachability.", "Reliability and confidence.", "Sophistication and discernment.", "Individuality and imagination.", "Confidence and presence.", "Warmth and delicacy.", "Strength and distinction."]],
    ["Which description best reflects your everyday life?", ["Active, informal and varied.", "Structured, established and predictable.", "Considered, selective and quality-focused.", "Flexible, expressive and open to experimentation.", "Social, visible and presentation-conscious.", "Personal, thoughtful and detail-oriented.", "Fast-paced, ambitious or creatively demanding."]]
  ].map(([text, options], index) => ({ text, options: options.map((label, i) => ({ label, style: styleOrder[i] })), index }));

  const concerns = [
    ["comfort", "I prioritise comfort but my outfits feel unfinished."],
    ["predictable", "My wardrobe is dependable but feels too predictable."],
    ["outfits", "I buy quality pieces but struggle to create complete outfits."],
    ["coherence", "I have many ideas but my wardrobe lacks coherence."],
    ["confidence", "I want more confidence without feeling overdone."],
    ["current", "I like delicate details but struggle to make them feel current."],
    ["stronger", "I want stronger outfits without feeling as though I am wearing a costume."],
    ["unsure", "I am not sure what really feels like me."]
  ];

  const intro = document.querySelector("#quiz-intro");
  const shell = document.querySelector("#quiz-shell");
  const result = document.querySelector("#quiz-result");
  if (!intro || !shell || !result) return;
  const answers = Array(9).fill(null);
  let current = 0;

  const region = document.querySelector("#question-region");
  const error = document.querySelector("#quiz-error");
  const previous = document.querySelector("#previous-question");
  const next = document.querySelector("#next-question");

  function renderQuestion() {
    const finalQuestion = current === 8;
    const number = current + 1;
    const options = finalQuestion ? concerns.map(([value, label]) => ({ value, label })) : questions[current].options.map(({ label, style }) => ({ value: style, label }));
    const title = finalQuestion ? "What is your main styling frustration?" : questions[current].text;
    region.innerHTML = `<fieldset class="quiz-question"><legend><span>0${number}</span>${title}</legend><p class="question-help">${finalQuestion ? "This helps us recommend a useful next step." : "Choose the answer that feels most natural to you."}</p><div class="answer-grid">${options.map((option, index) => `<label><input type="radio" name="question-${current}" value="${option.value}" ${answers[current] === option.value ? "checked" : ""}><span><b>${String.fromCharCode(65 + index)}</b>${option.label}</span></label>`).join("")}</div></fieldset>`;
    region.querySelectorAll("input").forEach(input => input.addEventListener("change", () => { answers[current] = input.value; error.textContent = ""; }));
    previous.hidden = current === 0;
    next.textContent = finalQuestion ? "Reveal my direction" : "Next";
    document.querySelector("#progress-label").textContent = `Question ${number} of 9`;
    const percent = Math.round(number / 9 * 100);
    document.querySelector("#progress-percent").textContent = `${percent}%`;
    document.querySelector("#progress-bar").style.width = `${percent}%`;
    const legend = region.querySelector("legend");
    legend.setAttribute("tabindex", "-1");
    legend.focus({ preventScroll: true });
      requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const questionTop = window.scrollY + shell.getBoundingClientRect().top;
        window.scrollTo({
          top: Math.max(0, questionTop - headerHeight - 16),
          left: 0,
          behavior: "auto"
        });
      });
  }

  function serviceFor(concern) {
    if (["comfort", "predictable", "outfits", "coherence"].includes(concern)) return ["The Wardrobe Edit", "Bring greater clarity to what you own, identify gaps and create more useful outfit combinations."];
    if (["confidence", "current", "stronger"].includes(concern)) return ["Personal Style Analysis", "Define a visual direction that feels natural, intentional and personal to you."];
    return ["Complete Image Consulting", "Explore style, colour, proportion and wardrobe together to create a complete personal direction."];
  }

  function showResult() {
    const scores = Object.fromEntries(styleOrder.map(style => [style, 0]));
    answers.slice(0, 8).forEach(style => scores[style]++);
    const ranked = styleOrder.slice().sort((a, b) => scores[b] - scores[a] || styleOrder.indexOf(a) - styleOrder.indexOf(b));
    const primary = styles[ranked[0]], secondary = styles[ranked[1]];
    const tied = scores[ranked[0]] === scores[ranked[1]];
    document.querySelector("#result-title").textContent = tied ? `${primary.title} + ${secondary.title}` : primary.title;
    document.querySelector("#result-summary").textContent = tied ? `Your choices reveal a balanced blend of ${primary.title} and ${secondary.title}. ${primary.summary} ${secondary.summary}` : primary.summary;
    document.querySelector("#secondary-title").textContent = secondary.title;
    document.querySelector("#secondary-summary").textContent = secondary.summary;
    document.querySelector("#result-qualities").innerHTML = [...new Set([...primary.qualities, ...secondary.qualities])].slice(0, 4).map(item => `<li>${item}</li>`).join("");
    document.querySelector("#result-guidance").textContent = `${primary.guidance} Your ${secondary.title.toLowerCase()} influence can add another layer without replacing your leading direction.`;
    const [service, summary] = serviceFor(answers[8]);
    document.querySelector("#service-title").textContent = service;
    document.querySelector("#service-summary").textContent = summary;
    const params = new URLSearchParams({ style: primary.title, influence: secondary.title, concern: answers[8], service });
    document.querySelector("#consultation-link").href = `consultation.html?${params.toString()}`;
    shell.hidden = true;
    result.hidden = false;
    result.focus({ preventScroll: true });
      requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const resultTop = window.scrollY + result.getBoundingClientRect().top;
        window.scrollTo({
          top: Math.max(0, resultTop - headerHeight - 16),
          left: 0,
          behavior: "auto"
        });
      });
  }

  document.querySelector("#start-quiz").addEventListener("click", () => { intro.hidden = true; shell.hidden = false; renderQuestion(); });
  previous.addEventListener("click", () => { if (current > 0) { current--; renderQuestion(); } });
  next.addEventListener("click", () => {
    if (!answers[current]) { error.textContent = "Please choose one answer before continuing."; region.querySelector("input")?.focus(); return; }
    if (current < 8) { current++; renderQuestion(); } else showResult();
  });
  document.querySelector("#restart-quiz").addEventListener("click", () => { answers.fill(null); current = 0; result.hidden = true; intro.hidden = false; document.querySelector("#start-quiz").focus(); });
})();
