const form = document.querySelector(".login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const button = form.querySelector("button");
const togglePassword = document.getElementById("togglePassword");

// SVGs do olho
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

// mensagem de erro
const errorMsg = document.createElement("p");
errorMsg.style.color = "#ff4d4d";
errorMsg.style.fontSize = "14px";
errorMsg.style.textAlign = "center";
form.appendChild(errorMsg);



// 👁️ mostrar/ocultar senha (AGORA COM SVG)
togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        eyeOpen.style.display = "none";
        eyeClosed.style.display = "block";
    } else {
        password.type = "password";
        eyeOpen.style.display = "block";
        eyeClosed.style.display = "none";
    }
});



// função de erro
function showError(message) {
    errorMsg.style.color = "#ff4d4d";
    errorMsg.textContent = message;

    username.style.borderBottom = "2px solid #ff4d4d";
    password.style.borderBottom = "2px solid #ff4d4d";

    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 300);
}



// limpar erro ao digitar
username.addEventListener("input", () => {
    username.style.borderBottom = "2px solid rgba(255,255,255,0.3)";
    errorMsg.textContent = "";
});

password.addEventListener("input", () => {
    password.style.borderBottom = "2px solid rgba(255,255,255,0.3)";
    errorMsg.textContent = "";
});



// sucesso
function showSuccess(message) {
    errorMsg.style.color = "#00ff99";
    errorMsg.textContent = message;

    username.style.borderBottom = "2px solid #00ff99";
    password.style.borderBottom = "2px solid #00ff99";
}



// submit
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === "" || passwordValue === "") {
        showError("Por favor, preencha todos os campos.");
        return;
    }

    if (passwordValue.length < 4) {
        showError("A senha deve conter no mínimo 4 caracteres.");
        return;
    }

    // loading
    button.textContent = "Carregando...";
    button.disabled = true;

    setTimeout(() => {
        if (usernameValue === "admin" && passwordValue === "1234") {
            showSuccess("Login realizado com sucesso!");

            // salvar
            localStorage.setItem("user", usernameValue);
            localStorage.setItem("pass", passwordValue);

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

        } else {
            showError("Usuário ou senha incorretos.");
            button.textContent = "Entrar";
            button.disabled = false;
        }
    }, 1000);
});