import { productsServices } from "../services/products_services.js";


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');
console.log("Value URL: ", value);


const createCategory = (category) => {
    console.log("category: ", category);
    const categoryBox = document.createElement("section"); 
    categoryBox.classList.add("products__category");
    categoryBox.setAttribute("id", `products_category_${category}`);

    console.log("categoryBox: ", categoryBox);
   
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
console.log("productsSection: ", productsSection);




const createNewCard = (image, name, price, category) => {
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
            <a class="products__card__link" href="#">Ver producto</a>
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
    const category = value;
       
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
            const newCard = createNewCard(card.image, card.name, card.price, card.category);
            console.log("New product: ", newCard);

            if ((category === productsBox.dataset.category) && ( category === newCard.dataset.category)) {
                productsBox.appendChild(newCard);
            };
        };
    });  
    
}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});
