import { productsServices } from "../services/products_services.js";

const headerSearch = document.getElementById("header_search");
console.log("header-search: ", headerSearch);

if (window.screen.width <768) {
    headerSearch.classList.toggle("header__search--mobile");
}

let products = [];


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');
console.log("Value URL: ", value);

const searchProduct = (e) => {
    const value = e.toLowerCase();
    console.log("Value searchProduct: ", value);
    console.log("productos: ", products);

    let notVisible = [];

    console.log("#productos:", products.length);

    products.forEach((product) => {
        const isVisible = product.name.toLowerCase().includes(value);
        console.log("isVisible", isVisible);
        console.log("product.element: ", product.element);
        product.element.classList.toggle("hide", !isVisible);

        if (isVisible === false) {
            notVisible.push(product);
        };
    });

    console.log("productos no visibles: ", notVisible);
    const searchHeader = document.getElementById("search_header")
    const headerTitle = document.createElement("h1"); 
    headerTitle.classList.add("products__title");
    searchHeader.appendChild(headerTitle)

    if (products.length === notVisible.length) {
        // const noResult = document.createElement("p"); 
        // noResult.textContent = "Lo sentimos. No se encontraron resultados.";
        // productsBox.appendChild(noResult);

        headerTitle.textContent = "Lo sentimos. No se encontraron resultados.";
    } else {
        headerTitle.textContent = "Resultados de la búsqueda.";
    }
};



const createNewCard = (image, name, price) => {
    const card = document.createElement("div"); 
    card.classList.add("products__card");
    
    const content = `
        <div class="products__card__img">
            <img src=${image} alt="Producto">
        </div>
        <div class="products__card__info">
            <h3 class="products__card__name">${name}</h3>
            <h2 class="products__card__price">R$ ${price},00</h2>
        </div>
    `;

    card.innerHTML = content;

    return card;
};



const productsBox = document.getElementById("products_box");
console.log("box: ", productsBox);


productsServices.productsList().then((data) => {
    console.log("data: ", data);

    if (value != "") {
        // const searchHeader = document.getElementById("search_header")
        // const headerTitle = document.createElement("h1"); 
        // headerTitle.classList.add("products__title");
        // searchHeader.appendChild(headerTitle)

        products = data.map((product) => {
            const newCard = createNewCard(product.image, product.name, product.price);
            productsBox.appendChild(newCard);
            return {name: product.name, element: newCard};
        });
        searchProduct(value);
    };

}).catch((error) => alert("Ocurrió un error."));

