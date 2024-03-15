import { productsServices } from "../services/products_services.js";


const createNewCard = (id, image, name, price, category, description) => {
    const card = document.createElement("div"); 
    card.classList.add("category__card");
    
    const content = `
        <div class="category__card__edit">
            <button class="bin" type="button" id="delete_card" data-productId=${id}>
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
            </button>
            <a class="edit" href="editProduct.html?id=${id}" id="edit_card">
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
            </a>
        </div>
        <div class="category__img">
            <img src=${image} alt="Producto">
        </div>
        <div class="category__info">
            <h3 class="category__name">${name}</h3>
            <h2 class="category__price">R$ ${price},00</h2>
            <h3 class="category__category">${category}</h3>
            <h3 class="category__description">${description}</h3>
        </div>
    `;

    card.innerHTML = content;


    //DELETE
    const delete_button = card.querySelector("#delete_card");

    delete_button.addEventListener("click", () => {
        //Modal - Eliminar producto
        const modal = document.getElementById("delete_modal");
        const confirm_button = document.getElementById("delete_confirm");
        const cancel_button = document.getElementById("delete_cancel");

        modal.style.display = "block";
        cancel_button.addEventListener("click", ()=>{
            modal.style.display = "none";
        });

        confirm_button.addEventListener("click", ()=>{
            productsServices.deleteProduct(id).then(response => console.log("eliminado", response)).catch(error => alert("Error al eliminar"));
        });

    });

    return card;
};

const categoryBox = document.getElementById("category_box");


productsServices.productsList().then((data) => {
    data.forEach((card) => {
        const {id, image, name, price, category, description} = card;
        const newCard = createNewCard(id, image, name, price, category, description);
        categoryBox.appendChild(newCard);
    });
}).catch((error) => alert("Ocurrió un error."));

