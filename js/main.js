import { catalogoCompleto } from "../assets/catalogue.js";

function bienvenida() {
    const nombre = prompt("Bienvenido a la vinateria 'La Gran Bodega'. Por favor introduce tu nombre:");

    if (!nombre) {
        alert(`Ocurrio un error, por favor intente mas tarde`);
    }

    return nombre;
}

function conversionDolarPesoArg(precio) {
    const dolarPeso = 1041.55;

    const conversion = precio * dolarPeso;

    return `$${conversion.toFixed(2)}`;
}

const cardContainer = document.getElementById("cardContainer");

// catalogoCompleto.forEach((item) => {
//     const card = document.createElement("span");
//     card.className = "card-item"
//     card.innerHTML = `
//         <div>
//         <p>${item.nombre}</p>
//         <p>${item.categoria}</p>
//         <p>${conversionDolarPesoArg(item.precioUsd)}</p>
//         </div>
//     `;
//     console.log(card, item);
//     cardContainer.appendChild(card);
// })

// const nombre = bienvenida();

// const mainTitle = document.getElementById("mainTitle");

// mainTitle.innerText = `Bienvenido a la pagina de la vinateria "La Gran Bodega", Sr(a) ${nombre}.`;