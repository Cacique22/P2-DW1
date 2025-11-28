function loginUsuario() {

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;
    var usuario1 = "rickelme";
    var senha1 = "12345678";
    var usuario2 = "ryan";
    var senha2 = "87654321";

    if((login == usuario1 && senha == senha1) || (login == usuario2 && senha == senha2)){
        window.alert("Login realizado com sucesso!");
        location.href = "pedido.html";
    } else {
        window.alert("Login ou senha incorretos!");
    }   
}

function clickMenu() {
        if (itens.classList.contains('active')){
        itens.classList.remove('active')
        } else { 
            itens.classList.add('active')
        }
        }

const addProdutoCarrinhoBotao = document.getElementsByClassName('add-carrinho')

const finalizarDiv = document.getElementsByClassName('finalizar-pedido')[0]
const finalizarBtn = finalizarDiv ? finalizarDiv.querySelector('button') : null
const totalSpan = finalizarDiv ? finalizarDiv.querySelector('span') : null

let carrinhoLista = null
if (finalizarDiv) {
    carrinhoLista = finalizarDiv.querySelector('.pedido-carrinho-lista')
    if (!carrinhoLista) {
        carrinhoLista = document.createElement('div')
        carrinhoLista.className = 'pedido-carrinho-lista'
        finalizarDiv.insertBefore(carrinhoLista, totalSpan)
    }
}

const placeholderP = finalizarDiv ? finalizarDiv.querySelector('p') : null

let totalCarrinho = 0.0

function parsePreco(precoStr){
    if(!precoStr) return 0
    const match = precoStr.match(/R\$\s*[\d\.,]+/)
    let s = match ? match[0] : precoStr
    s = s.replace(/\s/g,'').replace('R$','').replace('r$','')
    s = s.replace(/\./g,'').replace(',','.')
    const n = parseFloat(s)
    return isNaN(n) ? 0 : n
}

function formatPreco(n){
    return 'R$ ' + n.toFixed(2).replace('.',',')
}

function atualizarUICarrinho(){
    if (!totalSpan) return
    totalSpan.innerText = 'Total: ' + formatPreco(totalCarrinho)
    const temItens = carrinhoLista && carrinhoLista.querySelectorAll('.pedido-carrinho-item').length > 0
    if (placeholderP) placeholderP.style.display = temItens ? 'none' : 'block'
    if (finalizarBtn) finalizarBtn.disabled = !temItens
}

function addProdutoCarrinho(event){
    const button = event.currentTarget || event.target
    const card = button.closest('.pedido-item') || button.closest('.produto-item') || button.parentElement
    const produInfo = card
    const produImgEl = produInfo.getElementsByClassName("pedido-img")[0]
    const produImg = produImgEl ? produImgEl.src : ''
    const produNomeEl = produInfo.getElementsByClassName("pedido-nome")[0]
    const produNome = produNomeEl ? produNomeEl.innerText.trim() : 'Produto'
    let produPreco = ''
    const elPreco = produInfo.getElementsByClassName("pedido-preco")[0]
    if (elPreco) {
        produPreco = elPreco.innerText
    } else {
        const spans = produInfo.getElementsByTagName('span')
        for (let s of spans){
            if (s.innerText && s.innerText.indexOf('R$') !== -1) { produPreco = s.innerText; break }
        }
    }
    const precoNum = parsePreco(produPreco)

    if (placeholderP) placeholderP.style.display = 'none'

    const item = document.createElement('div')
    item.className = 'pedido-carrinho-item'
    item.dataset.preco = precoNum

    item.innerHTML = `
        <img src="${produImg}" class="pedido-carrinho-img" alt="${produNome}">
        <div class="pedido-carrinho-info">
            <h3 class="pedido-carrinho-nome">${produNome}</h3>
            <span class="pedido-carrinho-preco">${formatPreco(precoNum)}</span>
        </div>
        <div class="pedido-carrinho-actions">
            <button type="button" class="remover-carrinho">Remover</button>
        </div>
    `

    carrinhoLista.appendChild(item)


    const btnRemover = item.querySelector('.remover-carrinho')
    btnRemover.addEventListener('click', function(){
        removerProdutoCarrinho(item)
    })


    totalCarrinho += precoNum
    atualizarUICarrinho()
}

function removerProdutoCarrinho(elemento){
    const preco = parseFloat(elemento.dataset.preco) || 0
    totalCarrinho -= preco
    if (totalCarrinho < 0) totalCarrinho = 0
    elemento.remove()

    const temItens = carrinhoLista && carrinhoLista.querySelectorAll('.pedido-carrinho-item').length > 0
    if (!temItens && placeholderP) placeholderP.style.display = 'block'
    atualizarUICarrinho()
}

function somarTotal(valor){
    totalCarrinho += valor
    if (totalCarrinho < 0) totalCarrinho = 0
    atualizarUICarrinho()
}

for (let i = 0; i < addProdutoCarrinhoBotao.length; i++){
    addProdutoCarrinhoBotao[i].addEventListener('click', addProdutoCarrinho)
}

if (finalizarBtn){
    finalizarBtn.addEventListener('click', function(){
        const temItens = carrinhoLista && carrinhoLista.querySelectorAll('.pedido-carrinho-item').length > 0
        if (!temItens) {
            alert('Seu carrinho está vazio. Adicione itens antes de finalizar.')
            return
        }
        alert('Pedido finalizado com sucesso!')
        // limpa carrinho e reseta total
        carrinhoLista.innerHTML = ''
        totalCarrinho = 0
        if (placeholderP) placeholderP.style.display = 'block'
        atualizarUICarrinho()
    })
}
