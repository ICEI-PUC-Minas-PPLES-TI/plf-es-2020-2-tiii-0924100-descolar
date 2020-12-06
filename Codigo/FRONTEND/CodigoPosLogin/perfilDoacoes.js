var dados = {
    "materiais": [
    ],
}

async function exibeDemandas() {
    const resposta = await fetch('/demanda/cliente',{
        headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    if (resposta.status != 200){
        return
    } 


    const materiais = await resposta.json()
    dados.materiais = materiais
    var elemMain = document.getElementById('cards-demandas');
    var texto1 = '';

    for (i = 0; i < dados.materiais.length; i++) {

        var material = dados.materiais[i];

        texto1 = texto1 + `
            <div class="box-material box-perfil">
                <div><h4 class="titulo">${material.tipo_demanda} - ${material.nome_demanda}</h4></div>
                <img class="thumbnail" src="${material.foto || 'img/default.jpg'}" alt="">
                <div><h8 class="">Estado de conservação: ${material.estado_conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.autor}</h8></div>
                <div><h8 class="">Editora: ${material.editora}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.edicao_anofabric}</h8></div>
                <div class="atualizacao">
                <div>
                <input type="checkbox" class="checkAtualizacao" id="pendente" name="tipo">
                <label class="textAtualizacao" for="pendente" >
                        Pendente
                </label>
               
                <input type="checkbox" class="checkAtualizacao" id="atendida" name="tipo">
                <label class="textAtualizacao" for="atendida" >
                   Atendida
                </label>
               </div>
            <div class="atualizar">
                <button id="btnAtualizacao" type="button">
                 <a href="#" class="card-text">Atualizar </a>
                </button>
                </div>
            </div>
            </div>
        \`;
        `;
    };
    elemMain.innerHTML = texto1;
}
function someDemandas(){
    var elemMain = document.getElementById('cards-demandas');
    var texto1 = '';
    elemMain.innerHTML = texto1;
}

document.getElementById('btn-abrirFormMinhasDemandas').addEventListener('click', exibeDemandas);
document.getElementById('btn-abrirFormMeusMateriais').addEventListener('click', someDemandas);

var dados1 = {
    "materiais": [
    ],
}

async function exibeMateriais() {
    const resposta = await fetch('/material/cliente',{
        headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    if (resposta.status != 200){
        return
    } 
    const materiais = await resposta.json()
    dados1.materiais = materiais

    var elemMain = document.getElementById('cards-materiais');
    var texto2 = '';

    for (i = 0; i < dados1.materiais.length; i++) {

        var material = dados1.materiais[i];

        texto2 = texto2 + `
            <div class="box-material box-perfil">
                <div><h4 class="titulo">${material.tipo} - ${material.nome_material}</h4></div>
                <img class="thumbnail" src="${material.foto || 'img/default.jpg'}" alt="">
                <div><h8 class="">Estado de conservação: ${material.estado_conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.autor}</h8></div>
                <div><h8 class="">Editora: ${material.editora}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.ano_fabricacao}</h8></div>
                <div><h8 class="">Estado do material: ${material.status}</h8></div>
                <div><h8 class="">Data do cadastro: ${new Date(material.data_cadastro).toLocaleString('pt-br',{month:'long', day: 'numeric', year: 'numeric'})}</h8></div>
                <div class="atualizacao">
                    <div>
                        <input type="checkbox" class="checkAtualizacao" id="disponivel" name="tipo">
                        <label class="textAtualizacao" for="disponivel" >
                                Disponível
                        </label>
                    
                        <input type="checkbox" class="checkAtualizacao" id="indisponivel" name="tipo">
                        <label class="textAtualizacao" for="indisponivel" >
                        Indisponível 
                        </label>
                    </div>
                    
                    <div class="atualizar">
                        <button id="btnAtualizacao" type="button">
                        <a href="#" class="card-text">Atualizar </a>
                        </button>
                    </div>
                </div>
            </div>
        `;
    };

    elemMain.innerHTML = texto2;
}

function someMateriais(){
    var elemMain = document.getElementById('cards-materiais');
    var texto2 = '';
    elemMain.innerHTML = texto2;
}


document.getElementById('btn-abrirFormMeusMateriais').addEventListener('click', exibeMateriais);
document.getElementById('btn-abrirFormMinhasDemandas').addEventListener('click', someMateriais);





