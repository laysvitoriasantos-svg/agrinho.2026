// ========== BOTÃO DE PAISAGEM ==========
let paisagemAtiva = false;
const btnPaisagem = document.getElementById("btnPaisagem");

// URL de uma imagem REAL de paisagem com árvores e natureza
const urlImagemPaisagem = "https://images.pexels.com/photos/158028/bison-herd-yellowstone-national-park-wyoming-158028.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";

// Imagem alternativa (caso a primeira não carregue)
const urlImagemAlternativa = "https://images.pexels.com/photos/2190255/pexels-photo-2190255.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";

btnPaisagem.addEventListener("click", () => {
    paisagemAtiva = !paisagemAtiva;
    if (paisagemAtiva) {
        document.body.style.background = `url('${urlImagemPaisagem}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
        btnPaisagem.textContent = "🌾 Voltar para fundo original";
        
        // Se preferir usar imagem local (salva no seu computador), descomente a linha abaixo:
        // document.body.style.background = "url('imagens/paisagem.jpg') no-repeat center center fixed";
    } else {
        document.body.style.background = "";
        document.body.style.backgroundImage = "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)";
        btnPaisagem.textContent = "🌄 Mudar para Paisagem";
    }
});
