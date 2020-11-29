require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const { Client } = require('pg')
const { v4: gerarID } = require("uuid")

const client = new Client()
client.connect()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('public'));


app.get('/usuarios', async (req, res) => {
    const clientes = await client.query('SELECT *FROM cliente');
    res.header("content-type", "application/json")
    res.send(JSON.stringify(clientes.rows, null, 2))
})

app.post('/cadastro', async (req, res) => {
    try {
        const resposta = await client.query('INSERT INTO cliente (nome, email, senha, cpf, cnpj) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [req.body.nome, req.body.email, req.body.senha, req.body.cpf, req.body.cnpj]);

        await client.query('INSERT INTO endereco (cod_cliente,logradouro, numero, complemento, bairro, cep, cidade, estado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
            [resposta.rows[0].cod_cliente, req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cep, req.body.cidade, req.body.estado]);
        res.send('OK!')

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.post('/entrar', async (req, res) => {
    try {
        const resultado = await client.query('SELECT* FROM cliente WHERE email = $1 AND senha = $2',
            [req.body.email, req.body.senha])
        if (resultado.rowCount == 0) {
            res.status(404)
            res.send("not found")
        }
        else {
            const token = gerarID()
            await client.query('INSERT INTO token (token, cod_cliente) VALUES ($1,$2)',
                [token, resultado.rows[0].cod_cliente])
            res.send(token)
        }

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})
app.delete('/session/:id', async (req, res) => {
    try {
        req.params.id
        await client.query('DELETE FROM token WHERE token = $1',
            [token])
        res.send('ok')


    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
