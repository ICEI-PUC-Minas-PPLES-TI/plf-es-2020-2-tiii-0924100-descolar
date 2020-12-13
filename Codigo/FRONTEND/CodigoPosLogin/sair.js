$(() => {
    $('.deslogar').click(async (e) => {
        e.preventDefault()
        if(! confirm("Deseja realmente deslogar?")){
            return;
        }
        try {
            const response = await fetch("/session/" +  localStorage.getItem('token') , {
                method: "delete",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                })
            })
            if (response.status != 200){
                alert("Erro no servidor " + response.status)
            }
            else{
                localStorage.removeItem('token')
                location.pathname="/index.html"
            }
        } catch (erro) {
            alert("não foi possível enviar a requisição")
        }
    })
})