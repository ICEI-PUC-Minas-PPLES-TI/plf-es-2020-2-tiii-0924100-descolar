require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const { Client } = require('pg')

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
        await client.query('INSERT INTO cliente (nome, email, senha, cpf, cnpj) VALUES ($1,$2,$3,$4,$5)',
            [req.body.nome, req.body.email, req.body.senha, req.body.cpf, req.body.cnpj]);
            res.send('OK!')

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
