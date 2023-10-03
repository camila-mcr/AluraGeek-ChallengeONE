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








// const products = document.getElementById("category_box");


{/* <div class="products__card">
    <div class="products__card__img">
        <img src="images/helmet_white.jpg" alt="Producto">
    </div>
    <div class="products__card__info">
        <h3 class="products__card__name">Producto XYZ</h3>
        <h2 class="products__card__price">R$ 60,00</h2>
        <a class="products__card__link" href="#">Ver producto</a>
    </div>
</div> */}



{/* <div class="category__card">
    <div class="category__card__edit">
        <div class="bin">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_1_1020)">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_1020">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        <div class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_1_1017)">
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_1017">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
    <div class="category__img">
        <img src="images/helmet_white.jpg" alt="Producto">
    </div>
    <div class="category__info">
        <h3 class="category__name">Producto XYZ</h3>
        <h2 class="category__price">R$ 60,00</h2>
        <h3 class="category__description">#1111111</h3>
    </div>
</div> */}