const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createPool({
    host: "localhost", // Seu host do MySQL
    user: "root", // Seu usuário do MySQL
    password: "12345678", // Sua senha do MySQL
    database: "loja_chocolate", // nome do BD Sakila
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`A conexão está sendo executada na porta ${PORT}`);

    // O código abaixo é para testarmos a comunicação com o MySQL
    const [result] = await connection.execute("SELECT 1");
    if (result) {
        console.log("Conexão ao BD feita com sucesso!");
    }
});


app.get('/clientes', async (req, res) => {
    const [clientes] = await connection.execute("SELECT * FROM clientes");
    return res.json(clientes);
})

app.post('/clientes', async (req, res) => {
    const { nome_completo, cpf, e_mail, telefone, bairro, cidade, estado, genero, data_nascimento } = req.body
    const [insert] = await connection.execute(`INSERT INTO clientes(nome_completo, cpf, e_mail, telefone, bairro, cidade, estado, genero, data_nascimento)
    VALUES(?,?,?,?,?,?,?,?,?)`, [nome_completo, cpf, e_mail, telefone, bairro, cidade, estado, genero, data_nascimento])
    return res.json(insert);
})

app.get('/produtos', async (req, res) => {
    const [produtos] = await connection.execute("SELECT * FROM produtos"); 
    return res.json(produtos);
})

app.post('/produtos', async (req, res) => {
    const { nome, tipo, validade, peso, unidade, marca, preço } = req.body
    const [insert] = await connection.execute(`INSERT INTO produtos(nome, tipo, validade, peso, unidade, marca, preço)
    VALUES(?,?,?,?,?,?,?)`, [nome, tipo, validade, peso, unidade, marca, preço])
    return res.json(insert);
})

app.get('/funcionarios', async (req, res) => {
    const [funcionarios] = await connection.execute("SELECT * FROM funcionarios");
    return res.json(funcionarios);
})

app.post('/funcionarios', async (req, res) => {
    const { nome, telefone, cargo, e_mail, senha, genero, data_nascimento, cpf } = req.body
    const [insert] = await connection.execute(`INSERT INTO funcionarios(nome, telefone, cargo, e_mail, senha, genero, data_nascimento, cpf)
    VALUES(?,?,?,?,?,?,?,?)`, [nome, telefone, cargo, e_mail, senha, genero, data_nascimento, cpf])
    return res.json(insert);
})

app.get('/vendas', async (req, res) => {
    const [vendas] = await connection.execute("SELECT * FROM vendas");
    return res.json(vendas);
})

app.post('/vendas', async (req, res) => {
    const {id_produto, id_cliente, valor_total, metodo_pagamento} = req.body
    const [insert] =  await connection.execute(`INSERT INTO vendas(id_produto, id_cliente, valor_total, metodo_pagamento)
    VALUES(?,?,?,?)`, [id_produto, id_cliente, valor_total, metodo_pagamento])
    return res.json(insert);
})

app.get("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const [clientes] = await connection.execute(
        "SELECT * FROM clientes WHERE client_id = ?",
        [id]
    )

    return res.json(clientes);
})

app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const [produtos] = await connection.execute(
        "SELECT * FROM produtos WHERE produto_id = ?",
        [id]
    )

    return res.json(produtos);
})

app.get("/funcionarios/:id", async (req, res) => {
    const { id } = req.params;
    const [funcionarios] = await connection.execute(
        "SELECT * FROM funcionarios WHERE funcionario_id = ?",
        [id]
    )

    return res.json(funcionarios);
})

app.get("/vendas/:id", async (req, res) => {
    const { id } = req.params;
    const [vendas] = await connection.execute(
        "SELECT * FROM vendas WHERE id_venda = ?",
        [id]
    )

    return res.json(vendas);
})

app.get("/vendasCliente/:idCliente", async (req, res) => {
    const { idCliente } = req.params;

    const [clientes] = await connection.execute(
        "SELECT * FROM clientes WHERE client_id = ?",
        [idCliente]
    )

    const [vendas] = await connection.execute(
        "SELECT * FROM vendas WHERE id_cliente = ?",
        [idCliente]
    )

    vendas.push(clientes);

    return res.json(vendas);
})