import { productsServices } from "../services/products_services.js";

const form = document.getElementById("form_addProduct");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const image = document.getElementById("image_addProduct").value;
    // const category = document.getElementById("category_addProduct").value;
    const category = selectBox.options[selectBox.selectedIndex].text;
    const name = document.getElementById("name_addProduct").value;
    const price = document.getElementById("price_addProduct").value;
    const description = document.getElementById("description_addProduct").value;

    productsServices.addProduct(image, name, price, description, category)
    .then(response => {window.location.href = "../admin.html"; console.log(response)})
    .catch(error => {
        console.log(error);
    });
});


// CREAR LA LISTA DE OPCIONES EN AÑADIR PRODUCTO


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

productsServices.productsList().then((data) => {
    console.log("data: ", data);
    const mapa = data.map((data) => data.category);
    console.log("mapa: ", mapa);

    const categories = mapa.filter((c, index) => {return mapa.indexOf(c) === index});
    console.log("categories: ", categories);

    categories.forEach((category) => {
        const newOption = categoryOptions(category);
        console.log("Opcion: ", newOption);
        selectBox.appendChild(newOption);
    });

}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});