var dados = {
    "materiais": [
    ],
}

async function exibeMateriais() {
    const resposta = await fetch('/demanda')
    if (resposta.status != 200) {
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
                <div><h4 class="titulo">${material.tipo_demanda} - ${material.nome_demanda}</h4></div>
                <img class="thumbnail" src="${material.foto || 'img/default.jpg'}" alt="">
                <div><h8 class="">Estado de conservação: ${material.estado_conservacao}</h8></div>
                <div><h8 class="">Autor: ${material.autor}</h8></div>
                <div><h8 class="">Editora: ${material.editora}</h8></div>
                <div><h8 class="">Edição/Ano fabricação: ${material.edicao_anofabric}</h8></div>
                <button id="btnInteresse" type="button" class="btnModal" data-toggle="modal">
                <a href="#" class="card-text doar" data-codigo="${material.cod_demanda}">Quero doar!</a>
                </button>
            
            </div>
        `;
    };

    elemMain.innerHTML = textoHTML;

    $('.doar', elemMain).click(async (e) => {
        e.preventDefault()
        if (!confirm("Confirma a doação?")) {
            return;
        }
        try {
            const response = await fetch('/demanda/' + e.target.dataset.codigo + '/aceitar', {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                })
            })
            if (response.status == 409) {
                alert(await response.text())
            }
            else if (response.status != 200) {
                alert("Erro no servidor " + response.status)
            }
            else {
                alert("Solicitação enviada com sucesso! Clique na aba \"Em Andamento\"")
                location.pathname = "/CodigoPosLogin/perfil.html"
            }
        } catch (erro) {
            alert("não foi possível enviar a requisição")
        }
    })
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
                        <label>Tipo do Material</label>
                        <input name="tipo_demanda" type="text" class="form-control" id="tipo">
                    </div>

                    <div class="form-group">
                        <label>Nome do material</label>
                        <input name="nome_demanda" type="text" class="form-control" id="nome_material">
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Estado de conservação</label>
                        <select class="form-control" id="estado_conservacao">
                        <option value="novo">Novo</option>
                        <option value="semi-novo">Semi-Novo</option>
                        <option value="usado">Usado</option>
                        </select>
                    </div>

                </div>

                <div class="coluna">

                    <div class="form-group">
                        <label>autor</label>
                        <input name="autor" type="text" class="form-control" id="autor">
                    </div>

                    <div class="form-group">
                        <label>Edição/Ano de fabricação</label>
                        <input name="edicao_anofabric" type="text" class="form-control" id="ano_fabricacao">
                    </div>

                    <div class="form-group">
                        <label>editora</label>
                        <input name="editora" type="text" class="form-control" id="editora">
                    </div>

                </div>

            </div>

            <div class="form-group">
                <label for="exampleFormControlFile1">Foto do material</label>
                <input name="foto" type="file" class="form-control-file" id="foto">
            </div>

            <button type="submit" class="btn-material">Cadastrar</button>

        </form>
    </div>    
    `;

    elemMain.innerHTML = textoHTML;
    $('.formCadastro').submit(async (e) => {
        e.preventDefault()
        const tipo = $('#tipo').val()
        const nome_material = $('#nome_material').val()
        const estado_conservacao = $('#estado_conservacao').val()
        const ano_fabricacao = $('#ano_fabricacao').val()
        const editora = $('#editora').val()
        const autor = $('#autor').val()
        const foto = $('#foto')[0].files[0];

        try {
            const formData = new FormData();
            formData.append('tipo', tipo);
            formData.append('nome_material', nome_material);
            formData.append('estado_conservacao', estado_conservacao);
            formData.append('ano_fabricacao', ano_fabricacao);
            formData.append('editora', editora);
            formData.append('autor', autor);
            formData.append('foto', foto);
            const response = await fetch("/material", {
                method: "post",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`

                },
                body: formData
            })
            if (response.status != 200) {
                alert("Erro no servidor " + response.status)
            }
            else {
                location.pathname = "/CodigoPosLogin/perfil.html"
            }
        } catch (erro) {
            alert("não foi possível enviar a requisição")
        }
    })

}

document.getElementById('btn-abrirFormDemanda').addEventListener('click', exibeFormularioDemanda);


