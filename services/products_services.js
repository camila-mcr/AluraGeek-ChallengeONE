// const url = "http://localhost:3000";
const url = "https://camila-mcr.github.io/AluraGeek-api";


//GET-- Mostrar productos en el index

const productsList = () => {
    return fetch(`${url}/products.json`).then((response) => {
        return response.json();
    });
};


//POST --- Agregar nuevo producto addProduct

const addProduct = (image, name, price, description, category) => {
    return fetch(`${url}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: uuid.v4(), image, name, price, description, category})
    });
    // .then(response => {
    //     if (response.ok) {
    //         return respuesta.body
    //     }
    // })
    // throw new Error("No se pudo crear el producto");
};


//DELETE

const deleteProduct = (id) => {
    console.log("Eliminar a : ", id);
    return fetch(`${url}/products/${id}`, {
        method: "DELETE",
    });
};

//PUT-- Editar producto

const productInfo = (id) => {
    return fetch(`${url}/products/${id}`).then((response) => response.json());
};

const editProduct = (id, image, name, price, description, category) => {
    return fetch(`${url}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({image, name, price, description, category})
    }).then((response) => response).catch(error => console.log(error));
};


export const productsServices = {productsList, addProduct, deleteProduct, productInfo, editProduct};