const GRAVIDADES = {
  leve:       { rotulo: "Leve",       pontos: 3, valor: 88.38 },
  media:      { rotulo: "Média",      pontos: 4, valor: 130.16 },
  grave:      { rotulo: "Grave",      pontos: 5, valor: 195.23 },
  gravissima: { rotulo: "Gravíssima", pontos: 7, valor: 293.47 },
};

const INFRACOES = [
  { nome: "Dirigir com o braço para fora do veículo", gravidade: "leve" },
  { nome: "Estacionar em local proibido",             gravidade: "media" },
  { nome: "Excesso de velocidade até 20%",            gravidade: "media" },
  { nome: "Dirigir sem usar o cinto de segurança",    gravidade: "grave" },
  { nome: "Avançar o sinal vermelho",                 gravidade: "gravissima" },
  { nome: "Usar o celular enquanto dirige",           gravidade: "gravissima" },
];

const LIMITE_PONTOS = 20;
const PONTOS_ATENCAO = 12;

const form = document.getElementById("form-multa");
const campoNome = document.getElementById("nome");
const campoPlaca = document.getElementById("placa");
const campoInfracao = document.getElementById("infracao");
const campoData = document.getElementById("data");
const erro = document.getElementById("erro");

const carteira = document.getElementById("carteira");
const pontosTotal = document.getElementById("pontos-total");
const medidor = document.querySelector(".medidor");
const barra = document.getElementById("barra");
const status = document.getElementById("status");
const valorTotal = document.getElementById("valor-total");

const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const botaoLimpar = document.getElementById("limpar");

const CHAVE = "multas-salvas";

function salvarMultas() {
  localStorage.setItem(CHAVE, JSON.stringify(multas));
}

function carregarMultas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch {
    return [];
  }
}

let multas = carregarMultas();

function formatarDinheiro(numero) {
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(texto) {
  const [ano, mes, dia] = texto.split("-");
  return `${dia}/${mes}/${ano}`;
}

function placaValida(placa) {
  return /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/.test(placa);
}

function dataDeHoje() {
  return new Date().toLocaleDateString("en-CA");
}

function preencherInfracoes() {
  INFRACOES.forEach((infracao, indice) => {
    const gravidade = GRAVIDADES[infracao.gravidade];
    const opcao = document.createElement("option");
    opcao.value = indice;
    opcao.textContent = `${infracao.nome} (${gravidade.rotulo})`;
    campoInfracao.appendChild(opcao);
  });
}

function registrarMulta(evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const placa = campoPlaca.value.trim().toUpperCase().replace(/\s/g, "");
  const data = campoData.value;

  if (nome === "") {
    erro.textContent = "Digite o nome do motorista.";
    campoNome.focus();
    return;
  }

  if (!placaValida(placa)) {
    erro.textContent = "Placa inválida. Use o formato ABC-1234 ou ABC1D23.";
    campoPlaca.focus();
    return;
  }

  if (data === "") {
    erro.textContent = "Escolha a data da infração.";
    campoData.focus();
    return;
  }

  erro.textContent = "";

  const infracao = INFRACOES[Number(campoInfracao.value)];
  const gravidade = GRAVIDADES[infracao.gravidade];

  multas.unshift({
    id: Date.now(),
    nome: nome,
    placa: placa,
    data: data,
    infracao: infracao.nome,
    gravidade: infracao.gravidade,
    pontos: gravidade.pontos,
    valor: gravidade.valor,
  });

  campoInfracao.selectedIndex = 0;
  campoPlaca.value = "";
  campoPlaca.focus();

  mostrarTela();
}

function criarItem(multa) {
  const gravidade = GRAVIDADES[multa.gravidade];

  const item = document.createElement("li");
  item.className = "item";

  const info = document.createElement("div");

  const titulo = document.createElement("div");
  titulo.className = "item-titulo";
  titulo.textContent = multa.infracao;

  const detalhe = document.createElement("div");
  detalhe.className = "item-detalhe";

  const selo = document.createElement("span");
  selo.className = `selo selo-${multa.gravidade}`;
  selo.textContent = `${gravidade.rotulo}, ${multa.pontos} pontos`;

  detalhe.append(selo, `${multa.nome} - ${multa.placa} - ${formatarData(multa.data)}`);
  info.append(titulo, detalhe);

  const lado = document.createElement("div");
  lado.className = "item-valor";

  const valor = document.createElement("div");
  valor.textContent = formatarDinheiro(multa.valor);

  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "remover";
  remover.textContent = "Remover";
  remover.setAttribute("aria-label", `Remover multa: ${multa.infracao}`);
  remover.addEventListener("click", () => removerMulta(multa.id));

  lado.append(valor, remover);
  item.append(info, lado);
  return item;
}

function removerMulta(id) {
  multas = multas.filter((multa) => multa.id !== id);
  mostrarTela();
}

function limparTudo() {
  if (confirm("Apagar todas as multas registradas?")) {
    multas = [];
    mostrarTela();
  }
}

function mostrarTela() {
  salvarMultas();
  lista.innerHTML = "";
  multas.forEach((multa) => lista.appendChild(criarItem(multa)));

  vazio.hidden = multas.length > 0;
  botaoLimpar.hidden = multas.length === 0;

  const pontos = multas.reduce((soma, multa) => soma + multa.pontos, 0);
  const dinheiro = multas.reduce((soma, multa) => soma + multa.valor, 0);

  pontosTotal.textContent = pontos;
  valorTotal.textContent = formatarDinheiro(dinheiro);

  const porcentagem = Math.min(pontos / LIMITE_PONTOS, 1) * 100;
  barra.style.width = `${porcentagem}%`;
  medidor.setAttribute("aria-valuenow", Math.min(pontos, LIMITE_PONTOS));

  if (pontos >= LIMITE_PONTOS) {
    carteira.dataset.nivel = "limite";
    status.textContent = "Limite de 20 pontos atingido: há risco de suspensão da CNH.";
  } else if (pontos >= PONTOS_ATENCAO) {
    carteira.dataset.nivel = "atencao";
    status.textContent = `Atenção: faltam ${LIMITE_PONTOS - pontos} pontos para o limite.`;
  } else if (pontos > 0) {
    carteira.dataset.nivel = "ok";
    status.textContent = `Situação regular. Faltam ${LIMITE_PONTOS - pontos} pontos para o limite.`;
  } else {
    carteira.dataset.nivel = "ok";
    status.textContent = "Nenhuma multa registrada.";
  }
}

preencherInfracoes();
campoData.value = dataDeHoje();
form.addEventListener("submit", registrarMulta);
botaoLimpar.addEventListener("click", limparTudo);
mostrarTela();
