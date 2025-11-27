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
        if (itens.style.display == 'flex'){
        itens.style.display = 'none'
        } else { 
            itens.style.display = 'flex'
        }
        }

const addProdutoCarrinhoBotao = document.getElementsByClassName('add-carrinho')
for (var i = 0; i < addProdutoCarrinhoBotao.length; i++){
    addProdutoCarrinhoBotao[i].addEventListener('click',addProdutoCarrinho);
    
    }


function addProdutoCarrinho(event){
    const button = event.target
    console.log(button)
}