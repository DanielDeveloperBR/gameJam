const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = form.login.value;
    const senha = form.senha.value;
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": login, "senha": senha })
        });

        if (response.ok) {
            window.location.href = 'http://localhost:3000/dashboard';
        } else {
            alert("Login ou senha incorretos!")
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
})