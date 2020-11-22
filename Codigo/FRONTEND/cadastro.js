$(() => {
    $('.cadastro').submit(async (e) => {
        e.preventDefault()
        const email = $('#email').val()
        const nome = $('#nome').val()
        const senha = $('#senha').val()
        let cpf = $('#cpf').val()
        let cnpj = $('#cnpj').val()
        const estado = $('#estado').val()
        const cidade = $('#cidade').val()
        const rua = $('#rua').val()
        const numero = $('#numero').val()
        const cep = $('#cep').val()

        if(cpf == ""){
            cpf = null;
        }
        if(cnpj == ""){
            cnpj = null;
        }

        try {
            const response = await fetch("https://tidescolar.azurewebsites.net/cadastro", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email, nome, senha, cpf, cnpj, estado, cidade, rua, numero, cep
                })
            })
            if (response.status != 200) {
                alert("Erro no servidor " + response.status)
            }
            else{
                location.pathname="/entrar.html"
            }
        } catch (erro) {
            alert("não foi possível enviar a requisição")
        }
    })
})

