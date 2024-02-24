import { productsServices } from "../services/products_services.js";

const createCategory = (category) => {
    console.log("category: ", category);
    const categoryBox = document.createElement("section"); 
    categoryBox.classList.add("products__category");
    categoryBox.setAttribute("id", `products_category_${category}`);

    console.log("categoryBox: ", categoryBox);
   
    const content = `
    <div class="products__header">
        <h1 class="products__title">${category}</h1>
        <div class="products__link">
            <a href="viewAll.html?value=${category}">Ver todo</a>
            <svg class="products__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_back_black_24dp 1" clip-path="url(#clip0_1_67)">
                    <path id="Vector" d="M3.99976 13L16.1698 13L10.5798 18.59L11.9998 20L19.9998 12L11.9998 4L10.5898 5.41L16.1698 11L3.99976 11L3.99976 13Z" fill="#2A7AE4"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_67">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
    <div class="products__box" id="products_box" data-category="${category}"></div>
    `;

    categoryBox.innerHTML = content;

    return categoryBox;
};


const productsSection = document.getElementById("products");
console.log("productsSection: ", productsSection);




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
    console.log("data: ", data);
    const mapa = data.map((data) => data.category);
    console.log("mapa: ", mapa);

    const categories = mapa.filter((c, index) => {return mapa.indexOf(c) === index});
    console.log("categories: ", categories);

    

    // Crear categorias
    categories.forEach((category) => {
        const newCategory = createCategory(category);
        console.log("New card: ", newCategory);
        productsSection.appendChild(newCategory);
        console.log("THIS: ", category);

        const productsBox = document.querySelector(`[data-category="${category}"]`);
        console.log("productsBox: ", productsBox);

        console.log("WHATCH THIS: ", category, "array", categories);

        //Crear productos
        data.forEach((card) => {
            if (category === card.category) {
                const newCard = createNewCard(card.image, card.name, card.price, card.category, card.id);
                console.log("New product: ", newCard);
    
                if ((category === productsBox.dataset.category) && ( category === newCard.dataset.category)) {
                    productsBox.appendChild(newCard);
                };
            };
        });
        
    });
    
}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});
