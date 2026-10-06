function criarDecoracao() {
  const ambient = document.querySelector("#ambient");
  const symbols = ["♥", "♡", "✦", "·", "✧"];

  for (let index = 0; index < 19; index += 1) {
    const particle = document.createElement("span");
    const isHeart = index % 3 !== 0;
    particle.className = isHeart ? "ambient-heart" : "ambient-sparkle";
    particle.textContent = symbols[index % symbols.length];
    particle.setAttribute("aria-hidden", "true");
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty("--duration", `${11 + Math.random() * 12}s`);
    particle.style.setProperty("--delay", `${-Math.random() * 20}s`);
    particle.style.setProperty("--drift", `${Math.round(Math.random() * 90 - 45)}px`);
    particle.style.setProperty("--size", `${8 + Math.random() * 13}px`);
    ambient.append(particle);
  }
}

function mostrarFraseNao() {
  if (Math.random() > .42 || CONFIG.frasesBotaoNao.length === 0) return;

  const whisper = document.querySelector("#noWhisper");
  const phrase = CONFIG.frasesBotaoNao[Math.floor(Math.random() * CONFIG.frasesBotaoNao.length)];
  whisper.textContent = personalizarTexto(phrase);
  whisper.classList.add("is-visible");
  window.clearTimeout(mostrarFraseNao.timeoutId);
  mostrarFraseNao.timeoutId = window.setTimeout(() => whisper.classList.remove("is-visible"), 1350);
}

function fugirDoBotao(event) {
  const noButton = document.querySelector("#noButton");
  const yesButton = document.querySelector("#yesButton");
  const stage = document.querySelector("#buttonStage");
  const buttonRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const safeMargin = 22;
  const minX = Math.max(safeMargin, stageRect.left);
  const maxX = Math.min(window.innerWidth - buttonRect.width - safeMargin, stageRect.right - buttonRect.width);
  const minY = Math.max(safeMargin, stageRect.top);
  const maxY = Math.min(window.innerHeight - buttonRect.height - safeMargin, stageRect.bottom - buttonRect.height);

  if (maxX < minX || maxY < minY) return;

  let candidate = null;
  const pointerX = event && Number.isFinite(event.clientX) ? event.clientX : null;
  const pointerY = event && Number.isFinite(event.clientY) ? event.clientY : null;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const x = minX + Math.random() * (maxX - minX);
    const y = minY + Math.random() * (maxY - minY);
    const overlapsYes = x < yesRect.right + 16 && x + buttonRect.width > yesRect.left - 16 &&
      y < yesRect.bottom + 16 && y + buttonRect.height > yesRect.top - 16;
    const nearPointer = pointerX !== null && Math.hypot(x + buttonRect.width / 2 - pointerX, y + buttonRect.height / 2 - pointerY) < 82;

    if (!overlapsYes && !nearPointer) {
      candidate = { x, y };
      break;
    }
  }

  if (!candidate) {
    candidate = { x: Math.max(minX, Math.min(maxX, stageRect.right - buttonRect.width)), y: minY };
  }

  const stageX = candidate.x - stageRect.left;
  const stageY = candidate.y - stageRect.top;
  const baseX = noButton.offsetLeft;
  const baseY = noButton.offsetTop;
  noButton.classList.add("is-running");
  noButton.style.transform = `translate(${stageX - baseX}px, ${stageY - baseY}px)`;
  mostrarFraseNao();
}

function criarConfetes() {
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  const bits = ["♥", "♡", "✦", "✧", "•"];

  for (let index = 0; index < 32; index += 1) {
    const piece = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 180;
    piece.className = "celebration-piece";
    piece.textContent = bits[index % bits.length];
    piece.setAttribute("aria-hidden", "true");
    piece.style.setProperty("--x", `${startX}px`);
    piece.style.setProperty("--y", `${startY}px`);
    piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--dy", `${Math.sin(angle) * distance - 45}px`);
    piece.style.setProperty("--turn", `${Math.round(Math.random() * 240 - 120)}deg`);
    piece.style.setProperty("--duration", `${900 + Math.random() * 700}ms`);
    piece.style.setProperty("--size", `${12 + Math.random() * 14}px`);
    piece.style.color = index % 2 ? "#bd526c" : "#d8a252";
    document.body.append(piece);
    window.setTimeout(() => piece.remove(), 1800);
  }
}

function aceitarPedido() {
  const yesButton = document.querySelector("#yesButton");
  const noButton = document.querySelector("#noButton");
  const message = document.querySelector("#successMessage");

  if (yesButton.disabled) return;
  yesButton.disabled = true;
  noButton.hidden = true;
  message.textContent = "EU SABIA! ❤️";
  message.classList.add("is-visible");
  criarConfetes();
  window.setTimeout(() => window.location.assign("carta.html"), 1750);
}

function manterBotaoNaTela() {
  const noButton = document.querySelector("#noButton");
  noButton.classList.remove("is-running");
  noButton.style.transform = "";
  window.requestAnimationFrame(() => {
    if (noButton.getBoundingClientRect().right > window.innerWidth - 22 || noButton.getBoundingClientRect().left < 22) {
      fugirDoBotao();
    }
  });
}

function inicializarPaginaInicial() {
  const displayName = CONFIG.nomeDaPessoa === "[NOME_DA_PESSOA]" ? "Meu amor," : `${personalizarTexto("[NOME_DA_PESSOA]")},`;
  document.querySelector("#personName").textContent = displayName;
  const question = personalizarTexto(CONFIG.pergunta);
  document.querySelector("#questionText").textContent = ` ${question.charAt(0).toLocaleLowerCase()}${question.slice(1)}`;
  document.title = `${personalizarTexto("[NOME_DA_PESSOA]")} · Uma pergunta especial`;

  const noButton = document.querySelector("#noButton");
  noButton.addEventListener("pointerenter", fugirDoBotao);
  noButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    fugirDoBotao();
  });
  noButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    fugirDoBotao();
  }, { passive: false });
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    fugirDoBotao();
  });
  noButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fugirDoBotao();
    }
  });

  document.querySelector("#yesButton").addEventListener("click", aceitarPedido);
  window.addEventListener("resize", manterBotaoNaTela);
  criarDecoracao();
}

inicializarPaginaInicial();