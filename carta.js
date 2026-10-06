function inserirMensagem(element, message) {
  const paragraphs = personalizarTexto(message).trim().split(/\n\s*\n/);
  paragraphs.forEach((paragraph) => {
    const line = document.createElement("p");
    line.textContent = paragraph.trim().replace(/\s*\n\s*/g, " ");
    element.append(line);
  });
}

function criarCoracoesDaCarta() {
  const ambient = document.querySelector("#letterAmbient");
  const symbols = ["♡", "♥", "✧", "·"];
  for (let index = 0; index < 12; index += 1) {
    const heart = document.createElement("span");
    heart.className = "ambient-heart";
    heart.textContent = symbols[index % symbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--duration", `${14 + Math.random() * 10}s`);
    heart.style.setProperty("--delay", `${-Math.random() * 18}s`);
    heart.style.setProperty("--drift", `${Math.round(Math.random() * 80 - 40)}px`);
    heart.style.setProperty("--size", `${9 + Math.random() * 14}px`);
    ambient.append(heart);
  }
}

function abrirCarta() {
  const scene = document.querySelector("#letterScene");
  window.setTimeout(() => scene.classList.add("is-open"), 650);
  window.setTimeout(() => scene.classList.add("is-rising"), 1550);
  window.setTimeout(() => scene.classList.add("is-readable"), 2450);
}

function inicializarCarta() {
  document.title = personalizarTexto(CONFIG.tituloCarta);
  document.querySelector("#tituloCarta").textContent = personalizarTexto(CONFIG.tituloCarta);
  inserirMensagem(document.querySelector("#mensagemCarta"), CONFIG.mensagemCarta);
  document.querySelector("#mensagemFinal").textContent = personalizarTexto(CONFIG.mensagemFinal);
  document.querySelector("#assinatura").textContent = personalizarTexto(CONFIG.assinatura);
  criarCoracoesDaCarta();
  abrirCarta();
}

inicializarCarta();