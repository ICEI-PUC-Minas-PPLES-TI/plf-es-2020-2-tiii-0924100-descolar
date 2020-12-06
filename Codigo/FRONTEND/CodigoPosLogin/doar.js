var dados = {
    "materiais": [
        {
            "cod_demanda": 1,
            "data_demanda": "14/11/2020",
            "tipo_demanda": "Livro",
            "nome_demanda": "Filosofia Jorge",
            "estado_conservacao": "Novo",
            "autor": "Jorge matins",
            "edicao_anofabric": "1ª edição",
            "editora": "Peacock",
            "foto": "img/demanda1.jpg",
            "cod_cliente": "563"
        },
        {
            "cod_demanda": 2,
            "data_demanda": "1/11/2020",
            "tipo_demanda": "Livro",
            "nome_demanda": "Universe in a nutshell",
            "estado_conservacao": "Novo",
            "autor": "Stephen Hawking",
            "edicao_anofabric": "2005",
            "editora": "Kalmas",
            "foto": "img/demanda2.jpg",
            "cod_cliente": "789"
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
                <div><h4 class="titulo">${material.tipo_demanda} - ${material.nome_demanda}</h4></div>
                <img class="thumbnail" src="${material.foto}" alt="">
                <div><h8 class="">Estado de conservação: ${material.estado_conservacao}</h8></div>
                <div><h8 class="">autor: ${material.autor}</h8></div>
                <div><h8 class="">editora: ${material.editora}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.edicao_anofabric}</h8></div>
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
                        <label>tipo_demanda do material</label>
                        <input name="tipo_demanda" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Nome do material</label>
                        <input name="nome_demanda" type="text" class="form-control">
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
                        <label>autor</label>
                        <input name="autor" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Edição/Ano de fabricação</label>
                        <input name="edicao_anofabric" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>editora</label>
                        <input name="editora" type="text" class="form-control">
                    </div>

                </div>

            </div>

            <div class="form-group">
                <label for="exampleFormControlFile1">Foto do material</label>
                <input name="foto" type="file" class="form-control-file" id="exampleFormControlFile1">
            </div>

            <button type="submit" class="btn-material">Cadastrar</button>

        </form>
    </div>    
    `;

    elemMain.innerHTML = textoHTML;
}

document.getElementById('btn-abrirFormDemanda').addEventListener('click', exibeFormularioDemanda);


