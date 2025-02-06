import { catalogoCompleto } from "../assets/catalogue.js";

function bienvenida() {
    const nombre = prompt("Bienvenido a la vinateria 'La Gran Bodega'. Por favor introduce tu nombre:");

    if (!nombre) {
        alert(`Ocurrio un error, por favor intente mas tarde`);
    }

    return nombre;
}

function convertirDolarPesoArg(precio) {
    const dolarPeso = 1041.55;

    const conversion = precio * dolarPeso;

    return `$${conversion.toFixed(2)}`;
}

function crearDescripciones(producto) {
    if (producto === "Johnny Walker Blue Label") {
        return `El mejor whisky del mundo. ${producto} es un elissir.`
    }

    const descripcion = [
        " es un deleite al paladar.", 
        " es una exaltacion los sentidos.",
        ", uno de nuestros mejores productos."
    ]

    const randomIndex = Math.floor(Math.random() * descripcion.length);

    console.log(randomIndex);

    return `${producto + descripcion[randomIndex]}`
}

const cardContainer = document.getElementById("cardContainer");

catalogoCompleto.forEach((item) => {
    const card = document.createElement("span");
    card.innerHTML = `
        <div class="card-item">
            <img src="${item.imagen}"/>
            <h4 class="text-align-center font-weight-600">${item.nombre + " " + item.cantidad}</h4>
            <span class="text-align-center font-weight-500 descripcion">${crearDescripciones(item.nombre)}</span>
            <span class="text-align-center font-weight-500">Categoria: ${item.categoria}</span>
            <span class="text-align-center font-weight-500">Precio: ${convertirDolarPesoArg(item.precioUsd)}</span>
        </div>
    `;
    cardContainer.appendChild(card);
})

const nombre = bienvenida();

const mainTitle = document.getElementById("mainTitle");

mainTitle.innerText = `Bienvenido a la pagina de la vinateria "La Gran Bodega", Sr(a) ${nombre}.`;