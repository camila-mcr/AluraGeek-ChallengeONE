import { productsServices } from "../services/products_services.js";


// CREAR LA LISTA DE CATEGORIAS EN AÑADIR PRODUCTO

const categoryOptions = (category) => {
    const wrapper = document.createElement("div"); 

    const content = `
    <option value=${category}>${category}</option>
    `;
    
    wrapper.innerHTML = content;

    const option = wrapper.firstElementChild;

    return option;
};

const selectBox = document.getElementById("category_select");


//EDITAR PRODUCTO

const form = document.getElementById("form_editProduct");

const getInformation = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        console.log("Hubo un error");
        // window.location.href = "oops-error"
    };

    const image = document.getElementById("image_editProduct");
    const category = selectBox;
    const name = document.getElementById("name_editProduct");
    const price = document.getElementById("price_editProduct");
    const description = document.getElementById("description_editProduct");

    console.log(image, "-", category, "-", name, "-", price, "-", description);

    productsServices.productInfo(id).then( product => {
        //Select
        productsServices.productsList().then((data) => {
            const mapa = data.map((data) => data.category);
            const categories = mapa.filter((c, index) => {return mapa.indexOf(c) === index});
            const editCategory = product.category;

            categories.forEach((category) => {
                const newOption = categoryOptions(category);
                
                if (newOption.value === editCategory) {
                    newOption.setAttribute("selected", "selected");
                };

                selectBox.appendChild(newOption);
            });

        }).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});

        //Fin

        image.value = product.image;
        name.value = product.name;
        price.value = product.price;
        description.value = product.description;

    });
};

getInformation();

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const image = document.getElementById("image_editProduct").value;
    const category = selectBox.options[selectBox.selectedIndex].text;
    const name = document.getElementById("name_editProduct").value;
    const price = document.getElementById("price_editProduct").value;
    const description = document.getElementById("description_editProduct").value;

    productsServices.editProduct(id, image, name, price, description, category).then(()=>{
        window.location.href = "/pages/editMessage.html";
    });
} );