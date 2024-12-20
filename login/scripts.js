document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí podrías agregar la lógica para autenticar al usuario
    if (username === 'admin' && password === 'admin') {
        alert('contraseña correcta');
        // Redirige al panel de administración
        window.location.href = '/admin/index.html'; // Asegúrate de que esta URL sea correcta
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
});
