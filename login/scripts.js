// scripts.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí podrías agregar la lógica para autenticar al usuario
    if (username === 'user' && password === 'password') {
        alert('Login exitoso');
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
});
