import { productsServices } from "../services/products_services.js";

const form = document.getElementById("form_editProduct");

const getInformation = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        console.log("Hubo un error");
        // window.location.href = "oops-error"
    };

    const image = document.getElementById("image_editProduct");
    const category= document.getElementById("category_editProduct");
    const name = document.getElementById("name_editProduct");
    const price = document.getElementById("price_editProduct");
    const description = document.getElementById("description_editProduct");

    console.log(image, "-", category, "-", name, "-", price, "-", description);

    productsServices.productInfo(id).then( product => {
        image.value = product.image;
        category.value = product.category;
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
    const category= document.getElementById("category_editProduct").value;
    const name = document.getElementById("name_editProduct").value;
    const price = document.getElementById("price_editProduct").value;
    const description = document.getElementById("description_editProduct").value;

    console.log(image, "-", category, "-", name, "-", price, "-", description);

    productsServices.editProduct(id, image, name, price, description, category);
    // .then(()=>{
    //     window.location.href = "edicion-consluida"
    // });
} );