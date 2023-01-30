const button = document.getElementById('button');
const user_name = document.getElementById('name');
const email = document.getElementById('mail');
const password = document.getElementById('password');
const check_password = document.getElementById('check-password');
const inputs = document.querySelectorAll('input');
const small_error = document.querySelectorAll('p');
const img = document.querySelectorAll('img');

//Agregar estilos si hay un error
function addErrorStyles(arg) {
    small_error[arg].style.visibility = 'visible';
    small_error[arg].innerHTML = "Rellene este campo";
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
user_name.oninvalid = function (e) {
    e.target.setCustomValidity("El nombre no puede contener números");
}

//Chequear que los campos estén completos y validarlos
user_name.onblur = function () { checkEmptyField(0) };
email.onblur = function () { checkEmptyField(1) };
password.onblur = function () { checkEmptyField(2) };
check_password.onblur = function () { checkEmptyField(3) };

function checkEmptyField(arg) {
    if (inputs[arg].value == 0) {
        addErrorStyles(arg);
    } else {
        checkValidity(arg)
    }

    //Resetear estilos al enfocar un input
    user_name.onfocus = function () { resetFieldStyles(0) };
    email.onfocus = function () { resetFieldStyles(1) };
    password.onfocus = function () { resetFieldStyles(2) };
    check_password.onfocus = function () { resetFieldStyles(3) };
}

function resetFieldStyles(arg) {
    small_error[arg].style.visibility = 'hidden';
    inputs[arg].classList.remove('not-valid');
    inputs[arg].classList.remove('valid');
    img[arg].style.visibility = 'hidden';

}

//Chequear validez según el campo y agregar estilos 
function checkValidity(arg) {
    switch (arg) {
        case 0:
            let user_name_recortado = user_name.value.trim()
            let validName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚçÇ\s]+$/;
            if (!validName.test(user_name_recortado)) {
                addErrorStyles(arg);
                small_error[arg].innerHTML = "El nombre no puede contener números";
            } else {
                addValidStyles(arg);
            }
            break;
        case 1:
            let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if (!validEmail.test(email.value)) {
                addErrorStyles(arg);
                small_error[arg].innerHTML = "Email inválido";
            } else {
                addValidStyles(arg);
            }
            break;
        case 2:
            if (password.value.length > 8) {
                addErrorStyles(arg);
                small_error[arg].innerHTML = "No debe tener más de 8 caracteres";
            } else {
                addValidStyles(arg);
            }
            break;
        case 3:
            if (password.value != check_password.value) {
                addErrorStyles(arg);
                small_error[arg].innerHTML = "Las contraseñas no coinciden";
            } else {
                addValidStyles(arg);
            }
            break;
    }
}

button.addEventListener("click", checkAllFields);

//Revisa si los inputs son todos válidos
function checkAllFields() {        
    let validInputs = document.querySelectorAll('.valid');
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
    ;
}
