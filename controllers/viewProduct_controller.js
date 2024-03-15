import { productsServices } from "../services/products_services.js";


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const idProduct = urlParams.get('id');

const createProduct = (image, name, price, category, description) => {
    const viewProductCard = document.createElement("div"); 
    viewProductCard.classList.add("viewProduct__card");
   
    const content = `
    <div class="viewProduct__img"><img src=${image} alt="Imagen del producto"></div>
    <div class="viewProduct__info">
        <h1 class="viewProduct__name">${name}</h1>
        <h3 class="viewProduct__price">R$ ${price},00</h3>
        <h3 class="viewProduct__category">${category}</h3>
        <h3 class="viewProduct__description">${description}</h3>
    </div>
    `;

    viewProductCard.innerHTML = content;

    return viewProductCard;
};

const viewProduct = document.getElementById("viewProduct");


const createSimilarProduct = (image, name, price, category, id) => {
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

const productsBox = document.getElementById("products_box");


productsServices.productsList().then((data) => {
    //Crear producto
    const clickedProduct = data.find((card) => card.id === idProduct);
    const {id, image, name, price, category, description} = clickedProduct;
    const newCard = createProduct(image, name, price, category, description);
    viewProduct.appendChild(newCard);

    //Crear productos similares

    const similarCategory = data.filter((filter) => filter.category === category);  

    let similarProductsList = [];

    const randomSelection = (n) => {
        if (n >= similarCategory.length) {
            return similarCategory;
        };
        for (let i = 0; i < n; i++) {
            let newElem = similarCategory[Math.floor(Math.random() * similarCategory.length)];
            while (similarProductsList.includes(newElem) || newElem === clickedProduct) {
                newElem = similarCategory[Math.floor(Math.random() * similarCategory.length)];
            };
            similarProductsList.push(newElem);
        };
    };


    if (window.screen.width <1024) {
        randomSelection(4);
    } else {
        randomSelection(6);
    };

    similarProductsList.forEach(product => {
        const similarProduct= createSimilarProduct(product.image, product.name, product.price, product.category, product.id);
        productsBox.appendChild(similarProduct);
    });
}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});
