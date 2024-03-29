$(() => {
    $('.login').submit(async (e) => {
        e.preventDefault()
        const email = $('#email').val()
        const senha = $('#senha').val()

        try {
            const response = await fetch("/entrar", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email, senha
                })
            })
            if (response.status == 404) {
                alert("Usuário ou Senha incorretos!")
            }else if (response.status != 200){
                alert("Erro no servidor " + response.status)
            }
            else{
                const token = await response.text()
                localStorage.setItem('token', token)
                location.pathname="/CodigoPosLogin/index.html"
            }
        } catch (erro) {
            alert("não foi possível enviar a requisição")
        }
    })
})

