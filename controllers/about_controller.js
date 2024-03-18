import { aboutList } from "../services/about_services.js";


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const urlValue = urlParams.get('value');


const createSection = (title, content) => {
    const infoBox = document.createElement("section"); 
    infoBox.classList.add("about");
   
    const infoContent = `
    <h1>${title}</h1>
    <p>${content}</p>
    `;

    infoBox.innerHTML = infoContent;

    return infoBox;
};

const aboutSection = document.querySelector('main');



aboutList().then((data) => {
    //Crear productos
    const info = data.find((card) => card.id === urlValue);
    const newCard = createSection(info.title, info.content);
    aboutSection.appendChild(newCard);
}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});
