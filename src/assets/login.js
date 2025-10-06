// Obtenemos los botones y el contenedor principal
const signUpButton = document.getElementById("signUp"); // Botón interno que cambia a registro
const signInButton = document.getElementById("signIn"); // Botón interno que cambia a login
const container = document.getElementById("container"); // Contenedor que muestra login/registro

// Evento: mostrar la vista de REGISTRO
signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

// Evento: mostrar la vista de LOGIN
signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// Al cargar la página, revisamos si hay parámetros en la URL
// Ejemplo: login.html?view=register
window.onload = function() {
    const params = new URLSearchParams(window.location.search);

    // Si el parámetro "view" es "register", abrimos directo el formulario de REGISTRO
    if (params.get("view") === "register") {
        container.classList.add("right-panel-active");
    }

    // Si el parámetro "view" es "login", abrimos la vista de LOGIN
    // (este bloque es opcional porque login ya es la vista por defecto)
    if (params.get("view") === "login") {
        container.classList.remove("right-panel-active");
    }
};