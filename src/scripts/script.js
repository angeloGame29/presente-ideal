// ================= DATAS =================
const dataInicioPistas = new Date("2025-12-29T00:00:00");
const dataFinal = new Date("2026-01-12T00:00:00");

// ================= PISTAS =================
const pistas = [
  "Não tem cheiro, mas é novo.",
  "Cabe na mão ou fica sobre a mesa.",
  "Fica quieto até ser chamado.",
  "Quando acorda, muda o ambiente.",
  "Não gosta de água, mas adora luz.",
  "Obedece sem entender palavras.",
  "Vai longe sem sair do lugar.",
  "Guarda muito sem parecer cheio.",
  "Funciona melhor quando está limpo.",
  "Não se dobra, não se estica.",
  "Pode ensinar ou distrair.",
  "Responde a gestos simples.",
  "Não é grande. Não é pequeno.",
  "Já esteve perto de você sem ser visto."
];

// ================= CRONÔMETRO =================
function atualizarCronometro() {
  const agora = new Date();
  const diferenca = dataFinal - agora;

  if (diferenca <= 0) {
    document.getElementById("cronometro").style.display = "none";
    document.getElementById("pista").style.display = "none";
    document.getElementById("surpresa").classList.remove("escondido");
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;

  mostrarPista();
}

// ================= PISTAS POR DIA =================
function mostrarPista() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (hoje < dataInicioPistas) {
    document.getElementById("pista").textContent =
      "As pistas ainda não começaram...";
    return;
  }

  const diasPassados = Math.floor(
    (hoje - dataInicioPistas) / (1000 * 60 * 60 * 24)
  );

  if (diasPassados >= 0 && diasPassados < pistas.length) {
    document.getElementById("pista").textContent =
      "Pista do dia: " + pistas[diasPassados];
  } else {
    document.getElementById("pista").textContent =
      "Hoje é o grande dia 🎉";
  }
}

// ================= PALPITE =================
const respostaCorreta = "tablet";

function verificaPalpite() {
  const palpite = document.getElementById("palpite").value
    .trim()
    .toLowerCase();

  const mensagem = document.getElementById("mensagem");
  const botao = document.getElementById("mensagem");

  if (palpite === "") {
    mensagem.textContent = "Digite algo primeiro 😊";
    return;
  }

  // 🔒 DESATIVA O BOTÃO POR 3 SEGUNDOS
  botao.disabled = true;
  botao.style.backgroundColor = "#ccc";
  botao.style.cursor = "not-allowed";

  let tempo = 3;
  const textoOriginal = botao.textContent;
  botao.textContent = `Aguarde ${tempo}s`;

  const intervalo = setInterval(() => {
    tempo--;
    botao.textContent = `Aguarde ${tempo}s`;

    if (tempo === 0) {
      clearInterval(intervalo);
      botao.disabled = false;
      botao.style.backgroundColor = "";
      botao.style.cursor = "pointer";
      botao.textContent = textoOriginal;
    }
  }, 1000);

  // ✅ VERIFICA PALPITE
  if (palpite === respostaCorreta) {
    mensagem.textContent = "🎉 Você acertou! Essa é a surpresa!";
    mensagem.style.color = "#000";
    soltarConfetes();

    document.getElementById("imagemPresente")
      .classList.remove("escondido");

    document.getElementById("surpresa")
      .classList.remove("escondido");
  } else {
    mensagem.textContent = "👀 Ainda não é isso... tente novamente!";
    mensagem.style.color = "#000";
  }
}

// ================= INICIAR =================
setInterval(atualizarCronometro, 1000);

function soltarConfetes() {
  const confetes = document.getElementById("confetes");

  for (let i = 0; i < 100; i++) {
    const confete = document.createElement("div");
    confete.classList.add("confete");

    confete.style.left = Math.random() * 100 + "vw";
    confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confete.style.animationDuration = (Math.random() * 2 + 2) + "s";

    confetes.appendChild(confete);

    setTimeout(() => {
      confete.remove();
    }, 3000);
  }
}

