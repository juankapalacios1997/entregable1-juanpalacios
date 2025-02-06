import { catalogoCompleto } from "../assets/catalogue.js";

console.log(catalogoCompleto);
const cardContainer = document.getElementById("cardContainer");

console.log(cardContainer);

catalogoCompleto.forEach((item) => {
    const card = document.createElement("span");
    card.className = "card-item"
    card.innerText = JSON.stringify(item);
    console.log(card, item);
    cardContainer.appendChild(card);
})

// function bienvenida() {
//     const nombre = prompt("Bienvenido a la vinateria 'La Gran Bodega'. Por favor introduce tu nombre:");

//     if (!nombre) {
//         alert(`Ocurrio un error, por favor intente mas tarde`);
//     }

//     return nombre;
// }

// const nombre = bienvenida();