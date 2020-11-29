var dados = {
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
            "Foto_Material": "img/exemplo1.jpg",
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
            "Foto_Material": "img/exemplo2.jpg",
            "Cod_Cliente": "125"
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
                <div><h8 class="">Estado do material: ${material.Estado_Material}</h8></div>
                <div><h8 class="">Data do cadastro: ${material.Data_Cadastro}</h8></div>
                
                <button id="btnInteresse" type="button" class="btnModal" data-toggle="modal">
                <a href="#" class="card-text">Tenho interesse!</a>
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
                <form class="formDemanda">

                    <a class="backToLog" href="materiais.html">🡐 Voltar para a lista de materiais disponíveis</a>

                    <h3>Cadastre sua demanda</h3>

                    <div class="linha">
                        <div class="coluna">

                            <div class="form-group">
                                <label>Tipo do material</label>
                                <input name="tipo_material" type="text" class="form-control">
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

                            <div class="form-group">
                                <label>Autor</label>
                                <input name="autor" type="text" class="form-control">
                            </div>

                        </div>

                        <div class="coluna">

                            <div class="form-group">
                                <label>Edição/Ano de fabricação</label>
                                <input name="edicao_anofabric" type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label>Editora</label>
                                <input name="editora" type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label>Urgência</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>menos de 30 dias</option>
                                    <option>30 dias ou mais</option>
                                    <option>60 dias ou mais</option>
                                    <option>90 dias ou mais</option>
                                    <option>120 dias ou mais</option>
                                    <option>150 dias ou mais</option>
                                    <option>sem urgência</option>
                                </select>
                            </div>

                        </div>

                    </div>    

                    <div class="form-group">
                        <label for="exampleFormControlFile1">Foto do material</label>
                        <input name="Foto_Material" type="file" class="form-control-file" id="exampleFormControlFile1">
                    </div>

                    <button type="submit" class="btn-demanda">Cadastrar</button>
                
                </form>
            </div>    
        `;

    elemMain.innerHTML = textoHTML;
}

document.getElementById('btn-abrirFormDemanda').addEventListener('click', exibeFormularioDemanda);