require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const multer = require('multer')
const { BlobServiceClient } = require('@azure/storage-blob');
const { Client } = require('pg')
const { v4: gerarID } = require("uuid")

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const client = new Client()
client.connect()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('public'));
app.use(async function verificaLogado(req, res, next) {
    const authorization = req.header('authorization');
    if (authorization === undefined) {
        return next()
    }
    const [type, token] = authorization.split(' ');
    if (type != 'Bearer') {
        return next()
    }
    try {
        const resposta = await client.query('SELECT C.*FROM token T INNER JOIN cliente C ON T.cod_cliente = C.cod_cliente WHERE token = $1', [token]);
        const cliente = resposta.rows[0];
        req.cliente = cliente;
    } catch (error) {
        next(error)
    }
    next()
})
app.get('/', (req, res) => {
    res.redirect('/home.html')
})


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
        await client.query('DELETE FROM token WHERE token = $1',
            [req.params.id])
        res.send('ok')


    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.get('/demanda', async (req, res) => {
    try {

        const clientes = await client.query('SELECT D.*, C.nome FROM demanda D INNER JOIN cliente C ON D.cod_cliente = C.cod_cliente WHERE status = \'disponivel\'');
        res.header("content-type", "application/json")
        res.send(JSON.stringify(clientes.rows, null, 2))

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.get('/material', async (req, res) => {
    try {
        const clientes = await client.query('SELECT M.*, C.nome FROM material M INNER JOIN cliente C ON M.cod_cliente = C.cod_cliente WHERE status = \'disponivel\'');
        res.header("content-type", "application/json")
        res.send(JSON.stringify(clientes.rows, null, 2))

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.get('/material/cliente', soLogado, async (req, res) => {
    try {
        const clientes = await client.query('SELECT * FROM material WHERE cod_cliente = $1', [req.cliente.cod_cliente])

        res.header("content-type", "application/json")
        res.send(JSON.stringify(clientes.rows, null, 2))

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.get('/demanda/cliente', soLogado, async (req, res) => {
    try {
        const clientes = await client.query('SELECT * FROM demanda WHERE cod_cliente = $1', [req.cliente.cod_cliente])

        res.header("content-type", "application/json")
        res.send(JSON.stringify(clientes.rows, null, 2))

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

function soLogado(req, res, next) {
    if (!req.cliente) {
        res.status(401)
        res.send('Unauthorized');
        return;
    }
    next()
}

app.post('/demanda', soLogado, upload.single('foto'), async (req, res) => {
    try {
        let url = null;

        if (req.file) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOBAZURE);
            const containerClient = blobServiceClient.getContainerClient('fotos');
            const blobName = gerarID() + path.extname(req.file.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(req.file.buffer, req.file.size)
            url=blockBlobClient.url;
        }


        await client.query('INSERT INTO demanda (cod_cliente, tipo_demanda, nome_demanda, estado_conservacao, autor, edicao_anofabric, editora, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
            [req.cliente.cod_cliente, req.body.tipo_demanda, req.body.nome_demanda, req.body.estado_conservacao, req.body.autor, req.body.edicao_anofabric, req.body.editora, url]);
        res.send('OK!')

    } catch (error) {
        res.status(500)
        console.error(error.message)
        res.send(error.message)
    }
})

app.post('/material', soLogado, upload.single('foto'), async (req, res) => {
    try {
        let url = null;

        if (req.file) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOBAZURE);
            const containerClient = blobServiceClient.getContainerClient('fotos');
            const blobName = gerarID() + path.extname(req.file.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(req.file.buffer, req.file.size)
            url=blockBlobClient.url;
        }

        await client.query('INSERT INTO material (tipo, nome_material, autor, estado_conservacao, ano_fabricacao, editora, cod_cliente, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
            [req.body.tipo, req.body.nome_material, req.body.autor, req.body.estado_conservacao, req.body.ano_fabricacao, req.body.editora, req.cliente.cod_cliente, url]);
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
