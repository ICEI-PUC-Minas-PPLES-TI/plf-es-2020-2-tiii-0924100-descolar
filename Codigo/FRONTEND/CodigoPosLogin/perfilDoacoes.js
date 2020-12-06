var dados = {
    "materiais": [
        {
            "Cod_Demanda": 1,
            "Data_Demanda": "14/11/2020",
            "Tipo": "Livro",
            "Nome_Material": "Filosofia Jorge",
            "Estado_Conservacao": "Novo",
            "Autor": "Jorge matins",
            "Edicao_anoFabricacao": "1ª edição",
            "Editoria": "Peacock",
            "Urgencia": "30 dias ou menos",
            "Foto_Material": "img2/demanda1.jpg",
            "Cod_Cliente": "563"
        },
        {
            "Cod_Demanda": 2,
            "Data_Demanda": "1/11/2020",
            "Tipo": "Livro",
            "Nome_Material": "Universe in a nutshell",
            "Estado_Conservacao": "Novo",
            "Autor": "Stephen Hawking",
            "Edicao_anoFabricacao": "2005",
            "Editoria": "Kalmas",
            "Urgencia": "Sem urgencia",
            "Foto_Material": "img2/demanda2.jpg",
            "Cod_Cliente": "789"
        }
    ],
}



function exibeDemandas() {
    var elemMain = document.getElementById('cards-demandas');
    var texto1 = '';

    for (i = 0; i < dados.materiais.length; i++) {

        var material = dados.materiais[i];

        texto1 = texto1 + `
            <div class="box-material box-perfil">
                <div><h4 class="titulo">${material.Tipo} - ${material.Nome_Material}</h4></div>
                <img class="thumbnail" src="${material.Foto_Material}" alt="">
                <div><h8 class="">Estado de conservação: ${material.Estado_Conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.Autor}</h8></div>
                <div><h8 class="">Editora: ${material.Editoria}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.Edicao_anoFabricacao}</h8></div>
                <div><h8 class="">Urgencia: ${material.Urgencia}</h8></div>
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
        {
            "Cod_Material": 1,
            "Data_Cadastro": "18/11/2020",
            "Tipo": "Livro",
            "Nome_Material": "Cálculo A",
            "Estado_Conservacao": "Semi-novo",
            "Autor": "Diva Marília Flemming",
            "Estado_Material": "disponível",
            "Edicao_anoFabricacao": "6ª edição",
            "Editoria": "Pearson",
            "Foto_Material": "img2/exemplo1.jpg",
            "Cod_Cliente": "123"
        },
        {
            "Cod_Material": 2,
            "Data_Cadastro": "18/11/2020",
            "Tipo": "Fichário",
            "Nome_Material": "Fichário Yes 96 páginas 5 divisórias",
            "Estado_Conservacao": "Novo",
            "Autor": "-",
            "Estado_Material": "disponível",
            "Edicao_anoFabricacao": "-",
            "Editoria": "-",
            "Foto_Material": "img2/exemplo2.jpg",
            "Cod_Cliente": "125"
        }
    ],
}

function exibeMateriais() {
    var elemMain = document.getElementById('cards-materiais');
    var texto2 = '';

    for (i = 0; i < dados1.materiais.length; i++) {

        var material = dados1.materiais[i];

        texto2 = texto2 + `
            <div class="box-material box-perfil">
                <div><h4 class="titulo">${material.Tipo} - ${material.Nome_Material}</h4></div>
                <img class="thumbnail" src="${material.Foto_Material}" alt="">
                <div><h8 class="">Estado de conservação: ${material.Estado_Conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.Autor}</h8></div>
                <div><h8 class="">Editora: ${material.Editoria}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.Edicao_anoFabricacao}</h8></div>
                <div><h8 class="">Estado do material: ${material.Estado_Material}</h8></div>
                <div><h8 class="">Data do cadastro: ${material.Data_Cadastro}</h8></div>
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






function someMateriais(){
    var elemMain = document.getElementById('cards-materiais');
    var texto2 = '';
    elemMain.innerHTML = texto2;
}


document.getElementById('btn-abrirFormMeusMateriais').addEventListener('click', exibeMateriais);
document.getElementById('btn-abrirFormMinhasDemandas').addEventListener('click', someMateriais);





