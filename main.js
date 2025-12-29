async function getProdutos() {
    const rota = "http://localhost:3000/produtos"
    const req = await fetch(rota)
    const res = await req.json()
    console.log(res)
    const resultados = document.getElementById('resultados')
    res.forEach(element => {
        resultados.innerHTML += `
        <div class="card">
            <p>${element.produto_id} ${element.nome}</p>
            <p>${element.validade}</p>
        </div>
        `
    });
}

getProdutos()