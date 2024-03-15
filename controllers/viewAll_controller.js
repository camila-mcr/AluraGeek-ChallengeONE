import { productsServices } from "../services/products_services.js";


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');


const createCategory = (category) => {
    const categoryBox = document.createElement("section"); 
    categoryBox.classList.add("products__category");
    categoryBox.setAttribute("id", `products_category_${category}`);
   
    const content = `
    <div class="products__header">
        <h1 class="products__title">${category}</h1>
    </div>
    <div class="products__box" id="products_box" data-category="${category}"></div>
    `;

    categoryBox.innerHTML = content;

    return categoryBox;
};

const productsSection = document.getElementById("products");


const createNewCard = (image, name, price, category, id) => {
    const card = document.createElement("div"); 
    card.classList.add("products__card");
    card.setAttribute("data-category", `${category}`);
    
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


productsServices.productsList().then((data) => {
    const mapa = data.map((data) => data.category);
    const categories = mapa.filter((c, index) => {return mapa.indexOf(c) === index});
    
    // Crear categorias
    const category = value;
    const newCategory = createCategory(category);
    productsSection.appendChild(newCategory);
    const productsBox = document.querySelector(`[data-category="${category}"]`);
    
    
    //Crear productos
    data.forEach((card) => {
        if (category === card.category) {
            const newCard = createNewCard(card.image, card.name, card.price, card.category, card.id);

            if ((category === productsBox.dataset.category) && ( category === newCard.dataset.category)) {
                productsBox.appendChild(newCard);
            };
        };
    });  
    
}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});
