const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm_password');

form.addEventListener('submit', function(event) {
  if (passwordInput.value !== confirmInput.value) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Muestra un mensaje de error
    const error = document.createElement('p');
    error.textContent = 'Las contraseñas no coinciden';
    error.style.color = 'red';
    form.appendChild(error);

    // Resalta los campos de contraseña
    passwordInput.style.borderColor = 'red';
    confirmInput.style.borderColor = 'red';
  }
});