import { productsServices } from "../services/products_services.js";

const headerSearch = document.getElementById("header_search");

if (window.screen.width <768) {
    headerSearch.classList.toggle("header__search--mobile");
};


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');


let products = [];

const searchProduct = (e) => {
    const value = e.toLowerCase();
    let notVisible = [];

    products.forEach((product) => {
        const isVisible = product.name.toLowerCase().includes(value);
        product.element.classList.toggle("hide", !isVisible);

        if (isVisible === false) {
            notVisible.push(product);
        };
    });

    const searchHeader = document.getElementById("search_header")
    const headerTitle = document.createElement("h1"); 
    headerTitle.classList.add("products__title");
    searchHeader.appendChild(headerTitle);

    if (products.length === notVisible.length) {
        headerTitle.textContent = "Lo sentimos. No se encontraron resultados.";
    } else {
        headerTitle.textContent = "Resultados de la búsqueda.";
    };
};


const createNewCard = (image, name, price, id) => {
    const card = document.createElement("div"); 
    card.classList.add("products__card");
    
    const content = `
        <div class="products__card__img">
            <img src=${image} alt="Producto">
        </div>
        <div class="products__card__info">
            <h3 class="products__card__name">${name}</h3>
            <h2 class="products__card__price">R$ ${price},00</h2>
            <a class="products__card__link" href="viewProduct.html?id=${id}">Ver producto</a>
        </div>
    `;

    card.innerHTML = content;

    return card;
};

const productsBox = document.getElementById("products_box");


productsServices.productsList().then((data) => {

    if (value != "") {
        products = data.map((product) => {
            const newCard = createNewCard(product.image, product.name, product.price, product.id);
            productsBox.appendChild(newCard);
            return {name: product.name, element: newCard};
        });
        searchProduct(value);
    };

}).catch((error) => alert("Ocurrió un error."));

