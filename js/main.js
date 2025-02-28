import { catalogoCompleto } from "../assets/catalogue.js";

let carrito = [];

let nombre = "";

let carritoLlamado = false;

let carritoIdCounter = 0;

function cerrarSesion() {
    localStorage.removeItem("infoUsuario");
}

async function inicializarNombre() {
    const { value: nombre } = await Swal.fire({
        title: "Por favor escriba su nombre",
        input: "text",
        inputLabel: "Nombre",
        showCancelButton: false,
        confirmButtonColor: "#a60b00",
        inputValidator: (value) => {
            if (!value) {
                return "Necesita escribir su nombre";
            }
        }
    });
    if (nombre) {
        return nombre;
    }

    return "Anonimo";
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

function eliminarAllCarrito() {
    carrito.forEach(item => {
        eliminarItem(item)
    });
}

function eliminarItem(item) {
    const { carritoId } = item;
    if (!carritoId) {
        return;
    }
    
    const elementToRemove = document.getElementById(`${carritoId}`);
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }

    carrito = carrito.filter(item => item.carritoId !== carritoId);
    if (!carrito.length) {
        const toRemoveAllEle = document.getElementById("carritoContainerChild");
        if (toRemoveAllEle) {
            toRemoveAllEle.parentNode.removeChild(toRemoveAllEle);
        }

        carritoLlamado = false;
    }

    actualizarPrecioCarrito();
    actualizarLocalStorage();
}

function calcularPrecioCarrito() {
    const initialValue = 0;
    let sumaEnUSD = carrito.reduce((acc, curr) => acc + curr.precioUsd, initialValue);

    return `Total: $${convertirDolarPesoArg(sumaEnUSD)}`;
}

function actualizarPrecioCarrito() {
    if (!carrito.length) {
        return;
    }

    const precioTotal = document.getElementById("precioTotal");
    if (precioTotal) {
        precioTotal.innerText = calcularPrecioCarrito();
    }
}

function actualizarLocalStorage() {
    const infoUsuario = {
        nombre: nombre,
        carrito: carrito
    };

    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario));
}

function resolverCompra() {
    return new Promise((resolve, reject) => {
        try {
            Swal.fire({
                title: "Por favor, espere",
                html: `
                    <span class="loader"></span>
                `,
                showConfirmButton: false,
                showCancelButton: false,
            })
            setTimeout(() => {
                Swal.close();
                const success = Math.random() <= 0.95;
                console.log(success);
                if (success) {
                    resolve("Tu compra ha sido procesada con exito!");
                } else {
                    reject("Ocurrio un error al procesar su compra, por favor intente mas tarde");
                }
            }, 2000)
        } catch(e) {
            console.error(e);
        }
    })
}

function procederCompra() {
    const customHtml = document.createElement("div");
    customHtml.style.border = "1px dotted #282828";
    customHtml.style.borderRadius = "24px";
    carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "checkout-description";
        itemDiv.innerHTML = `
            <div class="checkout-description-content">
                <span class="caption">${item.categoria} ${item.nombre} ${item.cantidad}</span>
                <span class="precio">$${convertirDolarPesoArg(item.precioUsd)}</span>
            </div>
            <img src="${item.imagen}" />
        `
        customHtml.appendChild(itemDiv);
    })
    Swal.fire({
        title: "Confirme su compra",
        html: customHtml,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#a60b00",
        cancelButtonColor: "#353535",
    }).then((result) => {
        if (result.isConfirmed) {
            resolverCompra()
            .then((res) => {
                Swal.fire({
                    title: res,
                    icon: "success",
                    showConfirmButton: false,
                });
                setTimeout(() => {
                    eliminarAllCarrito();
                    cerrarSesion();
                    inizializarApp();
                }, 4000);
            }).catch((err) => {
                Swal.fire({
                    title: err,
                    icon: "error",
                    showConfirmButton: false,
                    confirmButtonColor: "#a60b00",
                });
            })
        } else if (result.isDenied) {
            Swal.fire({
                title: "Continue viendo nuestra tienda!",
                icon: "info",
                confirmButtonColor: "#a60b00",
            });
        }
    });
}

async function preguntarEdad() {
    const objetoFechaActual = new Date();
    const objetoFechaMinima = new Date (objetoFechaActual.setYear(objetoFechaActual.getFullYear() - 18));
    console.log(objetoFechaActual, objetoFechaMinima);
    const { value: date } = await Swal.fire({
            title: "Por favor indique su edad",
            input: "date",
            confirmButtonColor: "#a60b00",
            cancelButtonColor: "#353535",
            didOpen: () => {
            const today = (new Date()).toISOString();
                Swal.getInput().max = today.split("T")[0];
            }
    });
    const objetoFechaNacimiento = new Date(date);
    if (objetoFechaNacimiento.getTime() >= objetoFechaMinima.getTime()) {
        Swal.fire({
            title: "Lo sentimos, la venta de bebidas alcoholicas esta prohibida para los menores de edad",
            icon: "error",
            confirmButtonColor: "#a60b00",
        })
        .then((result) => {
            if (result.isConfirmed) {
                eliminarAllCarrito();
                cerrarSesion();
                inizializarApp();
            };
        });
    } else {
        setTimeout(() => {
            procederCompra();
        }, 500);
    }
}

function crearCarritoCard(item) {
    const carritoCard = document.createElement("div");
    carritoCard.id = item.carritoId;
    carritoCard.className = "carrito-card";
    carritoCard.innerHTML = `
        <img src="${item.imagen}" />
        <div class="card-description">
            <h5>${item.categoria} ${item.nombre} ${item.cantidad}</h5>
            <span>$${convertirDolarPesoArg(item.precioUsd)}</span>
        </div>
    `

    return carritoCard;
}

function inicializarCarritoContainer() {
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = `
            <div id="carritoContainerChild">
                <h4>Tu carrito &#8226; <strong id="precioTotal"></strong></h4>
                <div class="carrito-card-container" id="carritoCardContainer"></div>
            </div>
        `
    const comprarBtn = document.createElement("button");
    comprarBtn.id = "comprarBtn";
    comprarBtn.innerText = "Comprar";
    comprarBtn.addEventListener("click", () => preguntarEdad());
    carritoContainer.querySelector("#carritoContainerChild").appendChild(comprarBtn);

    carritoLlamado = true;
}

function handleAllCarrito() {
    if (!carrito.length) {
        return;
    }

    const carritoContainer = document.getElementById("carritoContainer");
    if (!carritoContainer.querySelector("#carritoCardContainer") && !carritoLlamado) {
        inicializarCarritoContainer();
    }

    carrito.forEach(item => {
        const carritoCard = crearCarritoCard(item);
        carritoContainer.querySelector("#carritoCardContainer").appendChild(carritoCard);

        const eliminarBtn = document.createElement("button");
        eliminarBtn.innerText = "Eliminar";
        eliminarBtn.addEventListener("click", () => eliminarItem(item))

        const cardDescription = carritoCard.querySelector(".card-description");
        cardDescription.appendChild(eliminarBtn);
    })

    actualizarPrecioCarrito();

}

function handleCarritoItem(item) {
    if (!carrito.length) {
        return;
    }

    const carritoContainer = document.getElementById("carritoContainer");
    if (!carritoContainer.querySelector("#carritoCardContainer") && !carritoLlamado) {
        inicializarCarritoContainer();
        handleCarritoItem(item);

        return;
    }

    const carritoCard = crearCarritoCard(item);
    carritoContainer.querySelector("#carritoCardContainer").appendChild(carritoCard);

    const eliminarBtn = document.createElement("button");
    eliminarBtn.innerText = "Eliminar";
    eliminarBtn.addEventListener("click", () => eliminarItem(item))

    const cardDescription = carritoCard.querySelector(".card-description");
    cardDescription.appendChild(eliminarBtn);

    actualizarPrecioCarrito();
    actualizarLocalStorage();
}

function anadirAlCarrito(id) {
    const itemToFind = catalogoCompleto.find(i => i.id === id);
    const itemToAdd = {...itemToFind, carritoId: `carrito-${carritoIdCounter}` }
    carritoIdCounter += 1;
    carrito.push(itemToAdd);

    handleCarritoItem(itemToAdd);
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
                <span class="text-align-center font-weight-600 categoria">Categoria: ${item.categoria}</span>
                <span class="text-align-center font-weight-600 precio">Precio: $${convertirDolarPesoArg(item.precioUsd)}</span>
                <div class="actions-section">
                </div>
            </div>
        `;

        const btn = document.createElement("button");
        btn.className = "anadir-carrito-btn"
        btn.innerText = "Anadir al carrito";
        btn.addEventListener("click", () => anadirAlCarrito(item.id));

        card.querySelector(".actions-section").appendChild(btn);
        cardContainer.appendChild(card);
    })

}

async function inizializarApp() {

    const catalogoCards = document.querySelectorAll(".card-item");
    
    if (!catalogoCards.length) {
        inicializarCatalogo();
    }
    
    
    const cerrarSesionLink = document.getElementById("cerrarSesionLink");
    cerrarSesionLink.addEventListener("click", () => {
        eliminarAllCarrito();
        cerrarSesion();
        inizializarApp();
    });
    
    const localInfoUsuario = localStorage.getItem("infoUsuario");
    
    if (localInfoUsuario) {
        const infoUsuarioJson = JSON.parse(localInfoUsuario);

        nombre = infoUsuarioJson.nombre;
        carrito = infoUsuarioJson.carrito;

        handleAllCarrito();

    } else {
        nombre = await inicializarNombre();
    }
    
    actualizarLocalStorage();

    const mainTitle = document.getElementById("mainTitle");
    mainTitle.innerText = `Bienvenido a la pagina de la vinateria "La Gran Bodega", Sr(a) ${nombre}.`;
}

inizializarApp();