import { productsServices } from "../services/products_services.js";

const form = document.getElementById("form_addProduct");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const image = document.getElementById("image_addProduct").value;
    const category = document.getElementById("category_addProduct").value;
    const name = document.getElementById("name_addProduct").value;
    const price = document.getElementById("price_addProduct").value;
    const description = document.getElementById("description_addProduct").value;

    productsServices.addProduct(image, name, price, description, category)
    .then(response => {window.location.href = "../admin.html"; console.log(response)})
    .catch(error => {
        console.log(error);
    });
});