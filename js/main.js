import { catalogoCompleto } from "../assets/catalogue.js";

let carrito = [];

let carritoLlamado = false;

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

    return conversion.toFixed(2);
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

    return `${producto + descripcion[randomIndex]}`
}

function eliminarItem(id) {
    if (!id) {
        return;
    }

    carrito = carrito.filter(item => item.id !== id);

    const elementToRemove = document.getElementById(`${id}`);

    elementToRemove.parentNode.removeChild(elementToRemove);

    if (!carrito.length) {
        const toRemoveAllEle = document.getElementById("carritoContainerChild");
        console.log(toRemoveAllEle);
        toRemoveAllEle.parentNode.removeChild(toRemoveAllEle);
        carritoLlamado = false;
    }

}

function handleCarrito(item) {
    if (!carrito.length) {
        return;
    }

    const carritoContainer = document.getElementById("carritoContainer");

    if (carrito.length === 1 && !carritoLlamado) {
        carritoContainer.innerHTML = `
            <div id="carritoContainerChild">
                <h4>Tu carrito</h4>
                <div class="carrito-card-container" id="carritoCardContainer"></div>
            </div>
        `
        carritoLlamado = true;

        handleCarrito(item);
        
        return;
    }

    const carritoCardContainer = document.getElementById("carritoCardContainer");

    const carritoCard = document.createElement("div");

    carritoCard.id = item.id;

    carritoCard.className = "carrito-card";

    carritoCard.innerHTML = `
        <img src="${item.imagen}" />
        <div class="card-description">
            <h5>${item.categoria} ${item.nombre} ${item.cantidad}</h5>
            <span>$${convertirDolarPesoArg(item.precioUsd)}</span>
        </div>
    `

    carritoCardContainer.appendChild(carritoCard);

    const eliminarBtn = document.createElement("button");

    eliminarBtn.innerText = "Eliminar";

    eliminarBtn.addEventListener("click", () => eliminarItem(item.id))

    const cardDescription = carritoCard.querySelector(".card-description");

    cardDescription.appendChild(eliminarBtn);
}

function anadirAlCarrito(id) {
    const itemToAdd = catalogoCompleto.find(i => i.id === id);

    carrito.push(itemToAdd);

    handleCarrito(itemToAdd);
}

function inicializarCatalogo() {
    const cardContainer = document.getElementById("cardContainer");

    catalogoCompleto.forEach((item) => {
        const card = document.createElement("span");
        card.innerHTML = `
            <div class="card-item">
                <img src="${item.imagen}"/>
                <h4 class="text-align-center font-weight-600">${item.nombre + " " + item.cantidad}</h4>
                <span class="text-align-center font-weight-500 descripcion">${crearDescripciones(item.nombre)}</span>
                <span class="text-align-center font-weight-500">Categoria: ${item.categoria}</span>
                <span class="text-align-center font-weight-500">Precio: $${convertirDolarPesoArg(item.precioUsd)}</span>
                <div class="actions-section">
                </div>
            </div>
        `;

        const btn = document.createElement("button");

        btn.innerText = "Anadir al carrito";

        btn.addEventListener("click", () => anadirAlCarrito(item.id));

        card.querySelector(".actions-section").appendChild(btn);

        cardContainer.appendChild(card);
    })
}

const nombre = bienvenida();

const mainTitle = document.getElementById("mainTitle");

mainTitle.innerText = `Bienvenido a la pagina de la vinateria "La Gran Bodega", Sr(a) ${nombre}.`;

inicializarCatalogo();