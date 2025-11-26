document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 1. Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault(); 

    // 2. Captura os valores dos campos
    const emailInput = document.getElementById('email').value.trim();
    const senhaInput = document.getElementById('senha').value.trim();
    const mensagemErro = document.getElementById('mensagemErro');
    
    // Limpa mensagens de erro anteriores
    mensagemErro.textContent = ''; 

    // --- 3. Validação Obrigatória (Campos Vazios) ---
    if (emailInput === '' || senhaInput === '') {
        // Mostrar mensagem alertando o usuário.
        mensagemErro.textContent = 'Por favor, preencha todos os campos.';
        return; // Não permite avançar
    }

    // --- 4. Regras de Acesso (Credenciais Válidas) ---

    // **IMPORTANTE:** As credenciais devem ser definidas aqui.
    // O seu requisito pede para aceitar as credenciais de qualquer um dos dois integrantes.
    
    // EX: Integrante 1 (João, Matrícula: 12345)
    const usuarioValido1 = 'ryan'; // Primeiro nome (em minúsculo para facilitar a comparação)
    const senhaValida1 = '12345';  // Matrícula
    
    // EX: Integrante 2 (Maria, Matrícula: 67890)
    const usuarioValido2 = 'rickelme';
    const senhaValida2 = '12345'; 
    
    // Normaliza o input do usuário para comparação (remove espaços extras e coloca em minúsculo)
    const usuarioDigitado = emailInput.toLowerCase();

    // Verifica se as credenciais digitadas correspondem a algum dos integrantes
    const loginValidoIntegrante1 = (usuarioDigitado === usuarioValido1 && senhaInput === senhaValida1);
    const loginValidoIntegrante2 = (usuarioDigitado === usuarioValido2 && senhaInput === senhaValida2);

    if (loginValidoIntegrante1 || loginValidoIntegrante2) {
        // --- 5. Após login bem-sucedido ---
        alert('Login realizado com sucesso!');
        
        // Redirecionar para a página pedido.html
        window.location.href = 'pedido.html'; // Muda a URL da página
        
    } else {
        // Credenciais incorretas
        mensagemErro.textContent = 'Usuário ou senha inválidos. Tente novamente.';
    }

   
});

    function clickMenu() {
           if (itens.style.display == 'flex'){
            itens.style.display = 'none'
            } else { 
                itens.style.display = 'flex'
            }
         }

    