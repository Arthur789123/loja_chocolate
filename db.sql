CREATE DATABASE loja_chocolate;

USE loja_chocolate;

CREATE TABLE clientes (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(45),
    cpf VARCHAR(14) UNIQUE,
    e_mail VARCHAR(75),
    telefone VARCHAR(20),
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    estado Varchar(2),
    data_nascimento DATE,
    genero ENUM('M', 'F', 'O'),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    tipo VARCHAR(30),
    validade DATE,
    peso DECIMAL(6,2) COMMENT '100.00',
    unidade ENUM('g','kg'),
    marca VARCHAR(20),
    preço DECIMAL(7,2) COMMENT '1000.00'
)

CREATE TABLE vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT,
    id_cliente INT,
    valor_total DECIMAL(7,2) COMMENT '1000.00',
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pagamento ENUM('Cartão de Débito','Cartão de Crédito', 'Boleto', 'Pix', 'Dinheiro'),


    FOREIGN KEY (id_cliente) REFERENCES clientes(client_id),
    FOREIGN KEY (id_produto) REFERENCES produtos(produto_id) 
) 

CREATE TABLE funcionarios (
  funcionarios_id INT AUTO_INCREMENT PRIMARY KEY,
  nome  VARCHAR(45),
  telefone VARCHAR(20),
  cargo VARCHAR(30),
  e_mail VARCHAR(80),
  senha VARCHAR(20),
  genero ENUM('M', 'F', 'O'),
  data_nascimento DATE,
  data_admissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cpf VARCHAR(14) UNIQUE
)

INSERT INTO clientes(nome_completo, cpf, e_mail, telefone, bairro, cidade, estado, genero, data_nascimento)
VALUES("Arthur Matos Viana Versiani", "239.212.784-45","arthur.matos@gmail.com","(23) 96483-1247","Centro","brasilia","DF","M","1990-05-15"),
("Ana Beatriz Silva", "123.456.789-00","ana.beatriz@gmail.com", "(21) 91234-5678","Copacabana","Rio de Janeiro","RJ","F","1995-09-30");

INSERT INTO produtos(nome, tipo, validade, peso, unidade, marca, preço)
VALUES("Chocolate ao Leite", "Chocolate", "2025-12-10", 90.00, "g", "Cacau Show", 12.90),
("Ovo de Páscoa", "Ovo de Páscoa", "2026-03-25", 250.00, "g", "Lacta", 39.90);

INSERT INTO vendas(id_produto, id_cliente, valor_total, metodo_pagamento)
VALUES(3, 3, 39.90, "Pix");

INSERT INTO funcionarios(nome, telefone, cargo, e_mail, senha, genero, data_nascimento, cpf)
VALUES("Marcos Oliveira", "(11) 98882-9911", "Caixa", "marcos@chocolateria.com", "M@rcos22", "M", "1992-03-29", "484.654.711-20"),
("João Ribeiro", "(11) 99456-7780", "Gerente", "joao@chocolateria.com", "J0@0Ad!", "M", "1985-07-12", "454.163.759-55");
SELECT * FROM clientes