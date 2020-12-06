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
                                <label>tipo do material</label>
                                <input name="tipo" type="text" class="form-control">
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
                                <label>autor</label>
                                <input name="autor" type="text" class="form-control">
                            </div>

                        </div>

                        <div class="coluna">

                            <div class="form-group">
                                <label>Edição/Ano de fabricação</label>
                                <input name="edicao_anofabric" type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label>editora</label>
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
                        <input name="foto" type="file" class="form-control-file" id="exampleFormControlFile1">
                    </div>

                    <button type="submit" class="btn-demanda">Cadastrar</button>
                
                </form>
            </div>    
        `;

    elemMain.innerHTML = textoHTML;
}

document.getElementById('btn-abrirFormDemanda').addEventListener('click', exibeFormularioDemanda);