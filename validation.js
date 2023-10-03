
//VALIDACIONES DE LOS INPUTS

const inputs = [
    document.getElementById("contact_name"),
    document.getElementById("contact_message"),
    document.getElementById("login_email"),
    document.getElementById("login_password"),
    document.getElementById("image_addProduct"),
    document.getElementById("category_addProduct"),
    document.getElementById("name_addProduct"),
    document.getElementById("price_addProduct"),
    document.getElementById("description_addProduct"),
];

console.log("Inputs: ", inputs);


const inputInfo = {
    contact_name: {
        errorMessages: {
            valueMissing: "El campo 'nombre' no puede estar vacío.",
            patternMismatch: "Al menos 10 caracteres, máximo 40 caracteres."
        },
        
    },
    contact_message: {
        errorMessages: {
            valueMissing: "El campo 'mensaje' no puede estar vacío.",
            tooShort: "Al menos 15 caracteres, máximo 120 caracteres.",
            tooLong: "Al menos 15 caracteres, máximo 120 caracteres."
        },
    },
    login_email: {
        errorMessages: {
            valueMissing: "El campo 'email' no puede estar vacío.",
            typeMismatch: "Debe contener el carácter especial @ seguido de un dominio o proveedor, seguido de un punto (.) Ejemplo: text@text.com"
        },
        
    },
    login_password: {
        errorMessages: {
            valueMissing: "El campo 'contraseña' no puede estar vacío.",
            patternMismatch: "Debe contener de 8 a 16 caracteres, al menos una letra mayúscula, un número y un caracter especial; sin espacios."
        },
        
    },
    image_addProduct: {
        errorMessages: {
            valueMissing: "El campo 'URL' no puede estar vacío.",
            typeMismatch: "Ingrese una URL válida. Ejemplo: 'https://example.com'."
        },
        
    },
    category_addProduct: {
        errorMessages: {
            valueMissing: "El campo 'categoria' no puede estar vacío.",
            patternMismatch: "Máximo 20 caracteres."
        },
        
    },
    name_addProduct: {
        errorMessages: {
            valueMissing: "El campo 'nombre del producto' no puede estar vacío.",
            patternMismatch: "Máximo 20 caracteres."
        },
        
    },
    price_addProduct: {
        errorMessages: {
            valueMissing: "El campo 'precio' no puede estar vacío.",
            patternMismatch: "Ingrese solo números."
        },
        
    },
    description_addProduct: {
        errorMessages: {
            valueMissing: "El campo 'descripción' no puede estar vacío.",
            tooShort: "Al menos 5 caracteres, máximo 120 caracteres.",
            tooLong: "Al menos 5 caracteres, máximo 120 caracteres."
        },
        
    },
};

const errorType = [
    "valueMissing",
    "patternMismatch",
    "typeMismatch",
    "tooShort",
    "tooLong"
];


inputs.filter((input) => { return input != null}).forEach((input) => {
    input.addEventListener("blur", (input) => {validate(input.target)});
});


function validate(input){
    const inputId = input.id;
    console.log("inputId: ", inputId);
    console.log("input", input);
    console.log("Validity: ", input.validity);

    if (!input.validity.valid) {
        input.parentElement.classList.add("form_input_error");
        input.parentElement.querySelector("#input__errorMessage").innerHTML = showErrorMessage(inputId, input);
    } else {
        input.parentElement.classList.remove("form_input_error");
        input.parentElement.querySelector("#input__errorMessage").innerHTML = "";
    };

};

function showErrorMessage(inputId, input){
    let message = "";
    errorType.forEach((error) => {
        if(input.validity[error]) {
            console.log("Show: ", error, inputId);
            message = inputInfo[inputId].errorMessages[error];
            console.log("message: ", message);
        };
    });
    return message;
};


//VALIDACIÓN DE LOS FORMULARIOS

const contactForm = document.getElementById("contact_form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("enviado");
    console.log("contactForm enviado: ", contactForm);
    console.log("contactForm Id: ", contactForm.id);
    

    const formInputs = contactForm.querySelectorAll("input, textarea");
        
    console.log("inputs del form: ", formInputs);


    formInputs.forEach((input) => {
        console.log("input", input);
        console.log("input valor:", input.value);
        if (input.value == ""){
            validate(input);

        };
        console.log(input.id, " - ", input.value )
        input.value = "";
    });

    alert("Formulario 'habla con nosotros' ha sido enviado.");
});



