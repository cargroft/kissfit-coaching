// --- LÓGICA DEL ROOM DE COACHES ---
const trainerCards = document.querySelectorAll('.trainer-card');
const room = document.getElementById('trainer-room');
const roomImg = document.getElementById('room-img');
const roomName = document.getElementById('room-name');
const roomTagline = document.getElementById('room-tagline');
const roomStyle = document.getElementById('room-style');
const roomQuote = document.getElementById('room-quote');

trainerCards.forEach(card => {
  card.addEventListener('click', () => {
    // 1) Quitamos "active" de todos los coaches
    trainerCards.forEach(c => c.classList.remove('active'));

    // 2) Marcamos el coach clickeado como activo
    card.classList.add('active');

    // 3) Tomamos la info del entrenador
    const name = card.dataset.name;
    const tagline = card.dataset.tagline;
    const style = card.dataset.style;
    const quote = card.dataset.quote;
    const img = card.dataset.img;

    // 4) La ponemos en el room
    roomName.textContent = name;
    roomTagline.textContent = tagline;
    roomStyle.textContent = style;
    roomQuote.textContent = `"${quote}"`;
    roomImg.src = img;
    roomImg.alt = name;

    // 5) Mostramos el room si estaba oculto
    room.classList.add('active');

    // 6) Scroll suave desactivado
    // room.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// --- Sincronizar el select de plan con las tarjetas de precios ---
const planSelect = document.getElementById('plan');
const pricingCards = document.querySelectorAll('.pricing-card');

if (planSelect) {
  // Cuando el usuario cambia el plan en el formulario
  planSelect.addEventListener('change', () => {
    const selectedValue = planSelect.value;

    // Quitamos selección visual de todos
    pricingCards.forEach(card => card.classList.remove('is-selected'));

    if (!selectedValue) return; // si elige "Aún no estoy seguro"

    // Buscamos la tarjeta que coincida con el value
    const targetCard = document.querySelector(
      `.pricing-card[data-plan="${selectedValue}"]`
    );

    if (targetCard) {
      targetCard.classList.add('is-selected');
    }
  });

  // Extra: si el usuario hace clic en una tarjeta, actualizamos el select
  pricingCards.forEach(card => {
    card.addEventListener('click', () => {
      const planKey = card.dataset.plan;
      if (!planKey) return;

      planSelect.value = planKey;
      planSelect.dispatchEvent(new Event('change'));
    });
  });
}

console.log('main.js cargado correctamente ✅');
