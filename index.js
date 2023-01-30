const button = document.getElementById('button');
const userName = document.getElementById('name');
const email = document.getElementById('mail');
const password = document.getElementById('password');
const checkPassword = document.getElementById('check-password');
const inputs = document.querySelectorAll('input');
const smallError = document.querySelectorAll('p');
const img = document.querySelectorAll('img');

//Agregar estilos si hay un error
function addErrorStyles(arg) {
    smallError[arg].style.visibility = 'visible';
    smallError[arg].innerHTML = "Rellene este campo";
    inputs[arg].classList.add('not-valid');
    img[arg].src = "images/error-icon.svg";
    img[arg].style.visibility = 'visible';
    return false;
}

//Agregar estilos si NO hay un error
function addValidStyles(arg) {
    inputs[arg].classList.add('valid');
    img[arg].src = "images/success-icon.svg";
    img[arg].style.visibility = 'visible';
    return true;
}

//Personalizar tooltip de nombre si no cumple el patrón
userName.oninvalid = function (e) {
    e.target.setCustomValidity("El nombre no puede contener números");
}

//Chequear validez según el campo y agregar estilos 
function checkValidity(arg) {
    let userNameRecortado = userName.value.trim();
    const validName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚçÇ\s]+$/;
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    switch (arg) {
        case 0:
            if (!validName.test(userNameRecortado)) {
                addErrorStyles(arg);
                smallError[arg].innerHTML = "El nombre no puede contener números";
            } else {
                addValidStyles(arg);
            }
            break;
        case 1:
            if (!validEmail.test(email.value)) {
                addErrorStyles(arg);
                smallError[arg].innerHTML = "Email inválido";
            } else {
                addValidStyles(arg);
            }
            break;
        case 2:
            if (password.value.length > 8) {
                addErrorStyles(arg);
                smallError[arg].innerHTML = "No debe tener más de 8 caracteres";
            } else {
                addValidStyles(arg);
            }
            break;
        case 3:
            if (password.value != checkPassword.value) {
                addErrorStyles(arg);
                smallError[arg].innerHTML = "Las contraseñas no coinciden";
            } else {
                addValidStyles(arg);
            }
            break;
    }
}

//Chequear que los campos estén completos
function checkEmptyField(arg) {
    if (inputs[arg].value == 0) {
        addErrorStyles(arg);
    } else {
        checkValidity(arg);
    }
}

//Resetear estilos al enfocar un input
function resetFieldStyles(arg) {
    smallError[arg].style.visibility = 'hidden';
    inputs[arg].classList.remove('not-valid');
    inputs[arg].classList.remove('valid');
    img[arg].style.visibility = 'hidden';
}

//Revisar checkPassword solo si NO está vacío
function doOnPasswordBlur () {
    if (inputs[3].value != 0) {
        checkValidity(3);
    }
}

userName.onblur = function () { checkEmptyField(0) };
email.onblur = function () { checkEmptyField(1) };
password.onblur = function () { checkEmptyField(2), doOnPasswordBlur() };
checkPassword.onblur = function () { checkEmptyField(3) };

userName.onfocus = function () { resetFieldStyles(0) };
email.onfocus = function () { resetFieldStyles(1) };
password.onfocus = function () { resetFieldStyles(2) };
checkPassword.onfocus = function () { resetFieldStyles(3) };

//Revisa si los inputs son todos válidos
function checkAllFields() {
    const validInputs = document.querySelectorAll('.valid');
    if (validInputs.length != 4) {
        checkEmptyField(0);
        checkEmptyField(1);
        checkEmptyField(2);
        checkEmptyField(3);
        return false;
    } else {
        alert("La inscripción ha sido correcta");
        return true;
    }
}

button.addEventListener("click", checkAllFields);
