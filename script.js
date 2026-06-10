// ========== FUNCIONALIDADE DE ACESSIBILIDADE ==========

// Variável para controlar o tamanho da fonte
let tamanhoFonte = 100; // em porcentagem

// Botões
const aumentarBtn = document.getElementById('aumentarFonte');
const diminuirBtn = document.getElementById('diminuirFonte');
const contrasteBtn = document.getElementById('altoContraste');

// Aumentar fonte
aumentarBtn.addEventListener('click', function() {
    if (tamanhoFonte < 150) {
        tamanhoFonte += 10;
        document.body.style.fontSize = tamanhoFonte + '%';
    }
});

// Diminuir fonte
diminuirBtn.addEventListener('click', function() {
    if (tamanhoFonte > 70) {
        tamanhoFonte -= 10;
        document.body.style.fontSize = tamanhoFonte + '%';
    }
});

// Alto contraste
contrasteBtn.addEventListener('click', function() {
    document.body.classList.toggle('alto-contraste');
});

// ========== JOGO EDUCATIVO (Quiz sobre conservação do solo) ==========

// Banco de perguntas
const perguntas = [
    {
        texto: "O que causa a perda de fertilidade do solo?",
        opcoes: ["Uso excessivo de agrotóxicos", "Rotação de culturas", "Adubação orgânica"],
        correta: 0
    },
    {
        texto: "Qual prática ajuda a conservar o solo?",
        opcoes: ["Desmatamento", "Queimadas", "Plantio de árvores"],
        correta: 2
    },
    {
        texto: "A contaminação do solo pode prejudicar:",
        opcoes: ["Apenas as plantas", "Apenas os animais", "Todos os seres vivos"],
        correta: 2
    },
    {
        texto: "O que é agricultura sustentável?",
        opcoes: ["Produzir sem se importar com o meio ambiente", "Equilibrar produção e conservação ambiental", "Usar muitos agrotóxicos"],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

// Elementos do jogo
const perguntaTexto = document.getElementById('pergunta-texto');
const respostasDiv = document.getElementById('respostas');
const pontuacaoSpan = document.getElementById('pontuacao');
const proximaBtn = document.getElementById('proxima-pergunta');

// Função para carregar uma pergunta
function carregarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        // Fim do jogo
        perguntaTexto.textContent = "Parabéns! Você completou o jogo!";
        respostasDiv.innerHTML = "";
        proximaBtn.textContent = "Reiniciar";
        proximaBtn.onclick = reiniciarJogo;
        return;
    }
    
    const p = perguntas[perguntaAtual];
    perguntaTexto.textContent = p.texto;
    
    // Criar botões de resposta
    respostasDiv.innerHTML = "";
    p.opcoes.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.textContent = opcao;
        btn.classList.add('resposta-btn');
        btn.addEventListener('click', () => verificarResposta(index));
        respostasDiv.appendChild(btn);
    });
    
    proximaBtn.textContent = "Próxima pergunta";
    proximaBtn.onclick = null; // remove função anterior
}

// Verificar se a resposta está correta
function verificarResposta(respostaSelecionada) {
    const p = perguntas[perguntaAtual];
    if (respostaSelecionada === p.correta) {
        pontuacao += 10;
        alert("✅ Correto! Você ganhou 10 pontos.");
    } else {
        alert("❌ Resposta errada! A resposta correta é: " + p.opcoes[p.correta]);
    }
    pontuacaoSpan.textContent = "Pontuação: " + pontuacao;
    
    // Avançar para próxima pergunta
    perguntaAtual++;
    carregarPergunta();
}

// Reiniciar o jogo
function reiniciarJogo() {
    perguntaAtual = 0;
    pontuacao = 0;
    pontuacaoSpan.textContent = "Pontuação: 0";
    carregarPergunta();
    proximaBtn.onclick = null;
}

// Iniciar o jogo
carregarPergunta();

// Botão próxima pergunta (quando não é fim do jogo)
proximaBtn.addEventListener('click', function() {
    if (perguntaAtual < perguntas.length && proximaBtn.textContent !== "Reiniciar") {
        // Não faz nada automático, já avança na verificação
    } else if (proximaBtn.textContent === "Reiniciar") {
        reiniciarJogo();
    }
});

// ========== GERADOR DE DICAS SUSTENTÁVEIS ==========

const dicas = [
    "🌱 Plante árvores nativas para proteger o solo da erosão.",
    "💧 Evite desperdiçar água na irrigação. Use gotejamento.",
    "♻️ Recicle resíduos orgânicos e faça compostagem.",
    "🚜 Faça rotação de culturas para não esgotar os nutrientes do solo.",
    "🐛 Prefira adubos orgânicos ao invés de agrotóxicos.",
    "🌾 Mantenha a cobertura vegetal do solo para evitar a erosão.",
    "🚮 Nunca descarte lixo diretamente no solo ou em rios.",
    "📚 Estude e compartilhe práticas sustentáveis com sua comunidade."
];

const gerarDicaBtn = document.getElementById('gerar-dica');
const dicaTexto = document.getElementById('dica-texto');

gerarDicaBtn.addEventListener('click', function() {
    const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
    dicaTexto.textContent = dicaAleatoria;
});
