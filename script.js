document.getElementById('produto-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // obter os valores do formulário
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').files[0];
    
    // criar um objeto URL para a imagem
    const imageUrl = URL.createObjectURL(imagem);
    
    // criar um novo produto
    const produto = document.createElement('div');
    produto.className = 'produto';
    produto.innerHTML = `
        <img src="${imageUrl}" alt="${nome}">
        <p>${nome}</p>
        <div class="info"><span>$${preco}</span>
         <button class="apagar"><img src="icon/Icono.png" alt="apagar"></button></div>
    `;
    
    // adicionar o produto a lista
    document.getElementById('lista-produtos').appendChild(produto);
    
    //  limpar o formulário
    document.getElementById('produto-form').reset();
    
    // Adicionar evento para eliminar o produto
    produto.querySelector('.apagar').addEventListener('click', function() {
        produto.remove();
    });
});

// Função para carregar produtos do arquivo JSON
function carregarProdutos() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const listaProdutos = document.getElementById('lista-produtos');
            data.produtos.forEach(prod => {
                const produto = document.createElement('div');
                produto.className = 'produto';
                produto.innerHTML = `
                    <img src="${prod.image}" alt="${prod.name}">
                    <p>${prod.name}</p>
                    <div class="info"><span>$${prod.price}</span>
                    <button class="apagar"><img src="icon/Icono.png" alt="apagar"></button></div>
                `;
                listaProdutos.appendChild(produto);

                // Adicionar evento para eliminar o produto
                produto.querySelector('.apagar').addEventListener('click', function() {
                    produto.remove();
                });
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
}

// Carregar produtos ao carregar a página
window.addEventListener('DOMContentLoaded', carregarProdutos);
