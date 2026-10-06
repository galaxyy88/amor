const CONFIG = {
  seuNome: "[SEU_NOME]",
  nomeDaPessoa: "[NOME_DA_PESSOA]",
  pergunta: "Quer namorar comigo?",

  frasesBotaoNao: [
    "Tem certeza? 🥺",
    "Não vale clicar aqui!",
    "Pensa melhor 😭",
    "Você não vai conseguir!",
    "Ei! 😳",
    "Escolhe o outro botão! ❤️"
  ],

  tituloCarta: "Para [NOME_DA_PESSOA] ❤️",

  mensagemCarta: `
        Você é uma pessoa muito especial para mim.
        Estar ao seu lado torna meus dias mais felizes
        e eu queria transformar esse sentimento em algo
        ainda mais especial.

        Por isso, preparei tudo isso para fazer uma
        pergunta que eu queria muito te fazer...
    `,

  mensagemFinal: "Eu gosto muito de você. ❤️",

  assinatura: "Com carinho, [SEU_NOME]"
};

function personalizarTexto(texto) {
  const nomeDeQuemEnvia = CONFIG.seuNome === "[SEU_NOME]" ? "" : CONFIG.seuNome;
  const nomeDeQuemRecebe = CONFIG.nomeDaPessoa === "[NOME_DA_PESSOA]" ? "meu amor" : CONFIG.nomeDaPessoa;

  return texto
    .replaceAll("[SEU_NOME]", nomeDeQuemEnvia)
    .replaceAll("[NOME_DA_PESSOA]", nomeDeQuemRecebe);
}