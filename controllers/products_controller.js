import { productsServices } from "../services/products_services.js";

console.log("esto: ", productsServices);

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
            <a class="products__card__link" href="#">Ver producto</a>
        </div>
    `;

    card.innerHTML = content;

    return card;
};

const productsBox = document.getElementById("products_box");
console.log("box: ", productsBox);


productsServices.productsList().then((data) => {
    data.forEach((card) => {
        const newCard = createNewCard(card.image, card.name, card.price);
        productsBox.appendChild(newCard);
    });
}).catch((error) => alert("Ocurrió un error."));







