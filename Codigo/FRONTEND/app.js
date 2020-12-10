var dados = {
    "materiais": [
    ],
}

async function exibeMateriais() {
    const resposta = await fetch('/material')
    if (resposta.status != 200){
        return
    } 
    const materiais = await resposta.json()
    dados.materiais = materiais

    var elemMain = document.getElementById('cards-materiais');
    var textoHTML = '';

    for (i = 0; i < dados.materiais.length; i++) {

        var material = dados.materiais[i];

        textoHTML = textoHTML + `
            <div class="box-material">
                <div><h4 class="titulo">${material.tipo} - ${material.nome_material}</h4></div>
                <img class="thumbnail" src="${material.foto || 'img/default.jpg'}" alt="">
                <div><h8 class="">Estado de conservação: ${material.estado_conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.autor}</h8></div>
                <div><h8 class="">Editora: ${material.editora}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.ano_fabricacao}</h8></div>
                <div><h8 class="">Estado do material: ${material.status}</h8></div>
                <div><h8 class="">Data do cadastro: ${new Date(material.data_cadastro).toLocaleString('pt-br',{month:'long', day: 'numeric', year: 'numeric'})}</h8></div>
                
                <button id="btnInteresse" type="button" class="btnModal" data-toggle="modal">
                <a href="entrar.html" class="card-text">Tenho interesse!</a>
                </button>
            
            </div>
        `;
    };

    elemMain.innerHTML = textoHTML;
}

window.onload = exibeMateriais();