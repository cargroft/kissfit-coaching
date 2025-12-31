(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // =========================================
  // 1) Coaches room
  // =========================================
  const trainerCards = $$(".trainer-card");
  const room = $("#trainer-room");
  const roomImg = $("#room-img");
  const roomName = $("#room-name");
  const roomTagline = $("#room-tagline");
  const roomStyle = $("#room-style");
  const roomQuote = $("#room-quote");

  // (Opcional) Select de coach en el form (si existe)
  const coachSelect = $("#coach");

  const setCoachSelectByName = (coachName) => {
    if (!coachSelect || !coachName) return;

    const options = Array.from(coachSelect.options);
    const match = options.find((opt) =>
      opt.textContent.trim().toLowerCase().includes(coachName.trim().toLowerCase())
    );
    if (match) coachSelect.value = match.value;
  };

  if (
    trainerCards.length &&
    room &&
    roomImg &&
    roomName &&
    roomTagline &&
    roomStyle &&
    roomQuote
  ) {
    trainerCards.forEach((card) => {
      card.addEventListener("click", () => {
        trainerCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        const name = card.dataset.name || "";
        const tagline = card.dataset.tagline || "";
        const style = card.dataset.style || "";
        const quote = card.dataset.quote || "";
        const img = card.dataset.img || "";

        roomName.textContent = name;
        roomTagline.textContent = tagline;
        roomStyle.textContent = style;
        roomQuote.textContent = quote ? `“${quote}”` : "";
        if (img) roomImg.src = img;
        roomImg.alt = name || "Coach";

        room.classList.add("active");

        // Bonus UX: al elegir coach, también lo selecciona en el formulario
        setCoachSelectByName(name);
      });
    });
  }

  // =========================================
  // 2) Planes: sincronizar cards ↔ select
  // =========================================
  const planSelect = $("#plan");
  const pricingCards = $$(".pricing-card");

  const syncPlanVisual = () => {
    if (!planSelect) return;
    const selectedValue = planSelect.value;

    pricingCards.forEach((card) => card.classList.remove("is-selected"));
    if (!selectedValue) return;

    const target = $(`.pricing-card[data-plan="${selectedValue}"]`);
    if (target) target.classList.add("is-selected");
  };

  if (planSelect && pricingCards.length) {
    planSelect.addEventListener("change", syncPlanVisual);

    pricingCards.forEach((card) => {
      card.addEventListener("click", () => {
        const planKey = card.dataset.plan;
        if (!planKey) return;

        planSelect.value = planKey;
        syncPlanVisual();
      });
    });

    // Estado inicial (por si el select ya viene con value)
    syncPlanVisual();
  }

  // =========================================
  // 3) Smooth scroll con offset del header sticky
  // (para que no se “coma” el título de la sección)
  // =========================================
  const header = $("header");
  const getOffset = () => (header ? header.offsetHeight + 12 : 80);

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = $(href);
    if (!target) return;

    e.preventDefault();

    const y = target.getBoundingClientRect().top + window.scrollY - getOffset();
    window.scrollTo({ top: y, behavior: "smooth" });

    history.pushState(null, "", href);
  });
})();
