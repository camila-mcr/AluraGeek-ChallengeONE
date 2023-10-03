//GET-- Mostrar productos en el index

const productsList = () => {
    return fetch("http://localhost:3000/products").then((response) => {
        return response.json();
    });
};


//POST --- Agregar nuevo producto addProduct

const addProduct = (image, name, price, description, category) => {
    return fetch("http://localhost:3000/products", {
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
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    });
};

//PUT-- Editar producto

const productInfo = (id) => {
    return fetch(`http://localhost:3000/products/${id}`).then((response) => response.json());
};

const editProduct = (id, image, name, price, description, category) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({image, name, price, description, category})
    }).then((response) => response).catch(error => console.log(error));
};


export const productsServices = {productsList, addProduct, deleteProduct, productInfo, editProduct};