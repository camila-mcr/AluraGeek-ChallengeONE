import { moreInfoList } from "../services/moreInfo_services.js";


// Retrieve the data from the URL parameters or local storage
const urlParams = new URLSearchParams(window.location.search);
const urlValue = urlParams.get('value');
console.log("Value URL: ", urlValue);


const createSection = (title, content) => {
   
    const infoBox = document.createElement("section"); 
    infoBox.classList.add("more__info");
    

    console.log("infoBox: ", infoBox);
   
    const infoContent = `
    <h1>${title}</h1>
    <p>${content}</p>
    `;

    infoBox.innerHTML = infoContent;

    return infoBox;
};


const moreInfoSection = document.querySelector('main');
console.log("moreInfoSection: ", moreInfoSection);


moreInfoList().then((data) => {
    console.log("data: ", data);
    //Crear productos
    const info = data.find((card) => card.id === urlValue);
   
    const newCard = createSection(info.title, info.content);
    console.log("New product: ", newCard);
    moreInfoSection.appendChild(newCard);
   
    
}).catch((error) => {alert("Ocurrió un error."); console.log("error: ", error)});
