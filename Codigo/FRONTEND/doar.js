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
            "Foto_Material": "img/demanda1.jpg",
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
            "Foto_Material": "img/demanda2.jpg",
            "Cod_Cliente": "789"
        }
    ],
}




function exibeMateriais() {
    var elemMain = document.getElementById('cards-materiais');
    var textoHTML = '';

    for (i = 0; i < dados.materiais.length; i++) {

        var material = dados.materiais[i];

        textoHTML = textoHTML + `
            <div class="box-material">
                <div><h4 class="titulo">${material.Tipo} - ${material.Nome_Material}</h4></div>
                <img class="thumbnail" src="${material.Foto_Material}" alt="">
                <div><h8 class="">Estado de conservação: ${material.Estado_Conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.Autor}</h8></div>
                <div><h8 class="">Editora: ${material.Editoria}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.Edicao_anoFabricacao}</h8></div>
                <div><h8 class="">Urgencia: ${material.Urgencia}</h8></div>
                <button id="btnInteresse" type="button" class="btnModal" data-toggle="modal">
                <a href="#" class="card-text">Quero doar!</a>
                </button>
            
            </div>
        `;
    };

    elemMain.innerHTML = textoHTML;
}



window.onload = exibeMateriais();

function exibeFormularioDemanda() {
    var elemMain = document.getElementById('tela');
    var textoHTML = '';

    textoHTML = textoHTML + `
    <div class="container">
        <form class="formCadastro">

            <a class="backToLog" href="queroDoar.html">🡐 Voltar para a lista de demandas</a>

            <h3>Cadastre seu material</h3>

            <div class="linha">
                <div class="coluna">

                    <div class="form-group">
                        <label>Tipo do material</label>
                        <input name="tipo_material" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Nome do material</label>
                        <input name="nome_material" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Estado de conservação</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Novo</option>
                            <option>Semi-novo</option>
                            <option>Usado</option>
                        </select>
                    </div>

                </div>

                <div class="coluna">

                    <div class="form-group">
                        <label>Autor</label>
                        <input name="autor" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Edição/Ano de fabricação</label>
                        <input name="edicao_anofabric" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Editora</label>
                        <input name="editora" type="text" class="form-control">
                    </div>

                </div>

            </div>

            <div class="form-group">
                <label for="exampleFormControlFile1">Foto do material</label>
                <input name="Foto_Material" type="file" class="form-control-file" id="exampleFormControlFile1">
            </div>

            <button type="submit" class="btn-material">Cadastrar</button>

        </form>
    </div>    
    `;

    elemMain.innerHTML = textoHTML;
}

document.getElementById('btn-abrirFormDemanda').addEventListener('click', exibeFormularioDemanda);


