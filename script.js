// ========== JOGO DE PERGUNTAS E RESPOSTAS ==========
// Banco de perguntas sobre conservação do solo
const perguntas = [
    {
        texto: "O que é agricultura sustentável?",
        opcoes: [
            "Usar muitos agrotóxicos para produzir mais",
            "Produzir respeitando o meio ambiente e conservando o solo",
            "Desmatar áreas para plantar",
            "Ignorar a qualidade do solo"
        ],
        correta: 1,
        dica: "A palavra 'sustentável' significa algo que dura no tempo sem prejudicar o planeta."
    },
    {
        texto: "Qual prática ajuda a conservar o solo?",
        opcoes: [
            "Queimadas para limpar o terreno",
            "Uso excessivo de fertilizantes químicos",
            "Rotação de culturas",
            "Plantar sempre a mesma coisa no mesmo lugar"
        ],
        correta: 2,
        dica: "Alternar as plantações evita que o solo perca nutrientes."
    },
    {
        texto: "O que a erosão causa no solo?",
        opcoes: [
            "Aumenta a fertilidade",
            "Remove a camada fértil e prejudica a produção",
            "Melhora a qualidade da água",
            "Não causa problemas"
        ],
        correta: 1,
        dica: "Erosão é quando a terra fértil é levada pela água ou vento."
    },
    {
        texto: "Qual destes é um problema causado pelo uso excessivo de agrotóxicos?",
        opcoes: [
            "Contaminação do solo e da água",
            "Aumento da biodiversidade",
            "Solo mais fértil",
            "Menos pragas permanentemente"
        ],
        correta: 0,
        dica: "Produtos químicos em excesso podem contaminar o solo e os rios."
    },
    {
        texto: "Como o desmatamento afeta o solo?",
        opcoes: [
            "Deixa o solo mais forte",
            "Protege o solo contra a chuva",
            "Deixa o solo exposto, causando erosão e perda de nutrientes",
            "Aumenta a matéria orgânica"
        ],
        correta: 2,
        dica: "As árvores seguram o solo com suas raízes. Sem elas, o solo fica desprotegido."
    }
];

// Variáveis do jogo
let pontuacao = 0;
let nivel = 1;
let perguntaAtual = 0;
let jogoIniciado = false;
let respostaSelecionada = false;
let opcoesBloqueadas = false;

// Elementos do DOM
const pontuacaoSpan = document.getElementById("pontuacao");
const nivelSpan = document.getElementById("nivel");
const numPerguntaSpan = document.getElementById("numPergunta");
const totalPerguntasSpan = document.getElementById("totalPerguntas");
const perguntaTexto = document.getElementById("perguntaTexto");
const respostasDiv = document.getElementById("respostasOpcoes");
const btnIniciar = document.getElementById("btnIniciar");
const btnProximo = document.getElementById("btnProximo");
const mensagemFinalDiv = document.getElementById("mensagemFinal");
const textoDica = document.getElementById("textoDica");

// Definir total de perguntas
totalPerguntasSpan.textContent = perguntas.length;

// ========== FUNÇÕES DO JOGO ==========

// Função para atualizar a dica do duende
function atualizarDica(texto) {
    textoDica.textContent = texto;
}

// Função para carregar uma pergunta
function carregarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        finalizarJogo();
        return;
    }
    
    const pergunta = perguntas[perguntaAtual];
    perguntaTexto.textContent = pergunta.texto;
    numPerguntaSpan.textContent = perguntaAtual + 1;
    
    // Atualizar dica
    atualizarDica(pergunta.dica);
    
    // Criar botões das opções
    respostasDiv.innerHTML = "";
    pergunta.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.classList.add("opcao-btn");
        btn.addEventListener("click", () => verificarResposta(index, btn));
        respostasDiv.appendChild(btn);
    });
    
    respostaSelecionada = false;
    opcoesBloqueadas = false;
    btnProximo.disabled = true;
}

// Função para verificar a resposta
function verificarResposta(index, botao) {
    if (opcoesBloqueadas) return;
    
    const pergunta = perguntas[perguntaAtual];
    const isCorreta = (index === pergunta.correta);
    
    // Bloquear novas respostas
    opcoesBloqueadas = true;
    respostaSelecionada = true;
    
    if (isCorreta) {
        // Adicionar pontos (10 pontos por pergunta)
        pontuacao += 10;
        pontuacaoSpan.textContent = pontuacao;
        botao.classList.add("correta-click");
        atualizarDica("✅ Muito bem! Você acertou! Continue assim, Guardião!");
        
        // Subir de nível a cada 20 pontos
        const novoNivel = Math.floor(pontuacao / 20) + 1;
        if (novoNivel > nivel && novoNivel <= 5) {
            nivel = novoNivel;
            nivelSpan.textContent = nivel;
            atualizarDica(`🎉 Parabéns! Você subiu para o NÍVEL ${nivel}!`);
        }
    } else {
        botao.classList.add("errada-click");
        atualizarDica(`❌ Ops! A resposta correta era: ${pergunta.opcoes[pergunta.correta]}. Não desista!`);
        
        // Destacar resposta correta
        const botoes = document.querySelectorAll(".opcao-btn");
        botoes[pergunta.correta].classList.add("correta-click");
    }
    
    // Habilitar botão próximo
    btnProximo.disabled = false;
}

// Função para ir para a próxima pergunta
function proximaPergunta() {
    if (!respostaSelecionada) return;
    
    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarJogo();
    }
}

// Função para finalizar o jogo
function finalizarJogo() {
    perguntaTexto.textContent = "🎉 Fim do jogo! Você completou todas as perguntas!";
    respostasDiv.innerHTML = "";
    btnProximo.disabled = true;
    
    let mensagem = "";
    if (pontuacao === perguntas.length * 10) {
        mensagem = `🏆 PERFEITO! Você acertou todas! Pontuação: ${pontuacao} - Nível Máximo Alcançado! Você é um verdadeiro Guardião do Agro Verde! 🌟`;
    } else if (pontuacao >= 30) {
        mensagem = `🌱 Bom trabalho! Pontuação: ${pontuacao} - Nível ${nivel}. Continue aprendendo sobre conservação do solo!`;
    } else {
        mensagem = `📚 Você fez ${pontuacao} pontos. Que tal jogar novamente para aprender mais sobre conservação do solo?`;
    }
    
    mensagemFinalDiv.innerHTML = `<div class="mensagem-sucesso">${mensagem}</div>`;
    atualizarDica("Jogue novamente para aprender ainda mais sobre como proteger o solo!");
    
    // Desabilitar iniciar e mostrar botão para reiniciar
    btnIniciar.textContent = "🔄 Jogar Novamente";
}

// Função para iniciar o jogo
function iniciarJogo() {
    pontuacao = 0;
    nivel = 1;
    perguntaAtual = 0;
    respostaSelecionada = false;
    opcoesBloqueadas = false;
    jogoIniciado = true;
    
    pontuacaoSpan.textContent = pontuacao;
    nivelSpan.textContent = nivel;
    mensagemFinalDiv.innerHTML = "";
    
    carregarPergunta();
    btnIniciar.textContent = "🔄 Reiniciar Jogo";
    atualizarDica("Vamos começar! Leia cada pergunta com atenção. Eu estou aqui para te ajudar!");
}

// Eventos dos botões do jogo
btnIniciar.addEventListener("click", iniciarJogo);
btnProximo.addEventListener("click", proximaPergunta);

// ========== ACESSIBILIDADE ==========
// Controle de fonte
let tamanhoFonteAtual = 2; // 1-pequena, 2-normal, 3-grande, 4-muito-grande
const tamanhos = ["fonte-pequena", "fonte-normal", "fonte-grande", "fonte-muito-grande"];

function aplicarTamanhoFonte(indice) {
    document.body.classList.remove(...tamanhos);
    document.body.classList.add(tamanhos[indice]);
}

document.getElementById("aumentarFonte").addEventListener("click", () => {
    if (tamanhoFonteAtual < 3) {
        tamanhoFonteAtual++;
        aplicarTamanhoFonte(tamanhoFonteAtual);
    }
});

document.getElementById("diminuirFonte").addEventListener("click", () => {
    if (tamanhoFonteAtual > 0) {
        tamanhoFonteAtual--;
        aplicarTamanhoFonte(tamanhoFonteAtual);
    }
});

// Alto contraste
let contrasteAtivo = false;
document.getElementById("altoContraste").addEventListener("click", () => {
    contrasteAtivo = !contrasteAtivo;
    if (contrasteAtivo) {
        document.body.classList.add("alto-contraste");
        document.getElementById("altoContraste").textContent = "🌓 Modo Normal";
    } else {
        document.body.classList.remove("alto-contraste");
        document.getElementById("altoContraste").textContent = "🌓 Alto Contraste";
    }
});

// Painel de acessibilidade toggle
const btnAcess = document.getElementById("btnAcessibilidade");
const painel = document.getElementById("painelAcessibilidade");

btnAcess.addEventListener("click", () => {
    painel.classList.toggle("ativo");
});

// Fechar painel ao clicar fora
document.addEventListener("click", (e) => {
    if (!btnAcess.contains(e.target) && !painel.contains(e.target)) {
        painel.classList.remove("ativo");
    }
});

// ========== BOTÃO DE PAISAGEM COM IMAGEM REAL ==========
let paisagemAtiva = false;
const btnPaisagem = document.getElementById("btnPaisagem");

// IMAGEM REAL de paisagem com árvores e natureza
const urlImagemPaisagem = "https://images.pexels.com/photos/158028/bison-herd-yellowstone-national-park-wyoming-158028.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";

btnPaisagem.addEventListener("click", () => {
    paisagemAtiva = !paisagemAtiva;
    if (paisagemAtiva) {
        // Aplica a imagem real de fundo
        document.body.style.background = `url('${urlImagemPaisagem}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
        btnPaisagem.textContent = "🌾 Voltar para fundo original";
    } else {
        // Volta para o fundo original com gradiente
        document.body.style.background = "";
        document.body.style.backgroundImage = "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)";
        btnPaisagem.textContent = "🌄 Mudar para Paisagem";
    }
});
