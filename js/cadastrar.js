function validarSenha(senha) {
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
  return regexSenha.test(senha);
}


// Mostrar mensagem de erro
function mostrarMensagem(mensagem) {
  alert(mensagem)
}

// Cadastrar o cliente
const formulario= document.querySelector('#form').addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = formularioCliente.nome.value;
  const senha = formularioCliente.senha.value;
  const repetirSenha = formularioCliente.repetirSenha.value;
  const email = formularioCliente.email.value;

  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "") {
    alert("Preencha todos os campos");
    return;
  }

  if (senha.length < 8 || !validarSenha(senha)) {
    alert("A senha precisa ter mais de 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um símbolo");
    return;
  }

  if (senha !== repetirSenha) {
    alert("As senhas não são iguais.");
    return;
  }
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('senha', senha);
  formData.append('email', email);

  fetch('http://localhost:3000/usuario', {
    method: 'POST',
    body: formData,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 422) {
          return response.json().then(error => {
            throw new Error(`Erro: ${error.error}`);
          });
        }
        throw new Error(`Erro na solicitação. Status: ${response.status}`);
      }
      document.location.href = "./login.html";
      return response.json();
    })
    .catch(err => {
      console.error("Erro:", err.message);
    });
})