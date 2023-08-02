import _ from 'lodash';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

//***** Scripts de pagina ******/


//***** Habilitar Webpack ******/
function component() {
    const element = document.createElement('div');
  
      // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }

  document.body.appendChild(component());

  //***** Inicializa firebase ******/



// Configuración de tu aplicación de Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "test-316c4.firebaseapp.com",
  projectId: "test-316c4",
  storageBucket: "test-316c4.appspot.com",
  messagingSenderId: "150243191496",
  appId: "1:150243191496:web:222644ff3bf06a769b53fd"
};
const app = initializeApp(firebaseConfig);
// Inicializar Firebase

const form = document.getElementById('myForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm_password');
const notificationContainer = document.getElementById('notificationContainer');
let currentNotification = null;

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    if (passwordInput.value !== confirmInput.value) {
        // Muestra una notificación de error
        showNotification('Error', 'Las contraseñas no coinciden', 'error');
        return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Obtener el usuario registrado
            const user = userCredential.user;

            // Limpiar los campos del formulario
            emailInput.value = '';
            passwordInput.value = '';
            confirmInput.value = '';

            // Mostrar una notificación de éxito
            showNotification('Éxito', 'Registro exitoso', 'success');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Mostrar una notificación de error
            showNotification('Error', errorMessage, 'error');
        });
});

function showNotification(title, message, type) {
    // Cerrar la notificación anterior si existe
    if (currentNotification) {
        currentNotification.remove();
        currentNotification = null;
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(type);

    const closeButton = document.createElement('span');
    closeButton.classList.add('notification-close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function () {
        notification.remove();
        currentNotification = null;
    });

    const titleElement = document.createElement('strong');
    titleElement.textContent = title;

    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    notification.appendChild(closeButton);
    notification.appendChild(titleElement);
    notification.appendChild(messageElement);

    notificationContainer.appendChild(notification);

    currentNotification = notification;
}