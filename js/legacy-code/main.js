import { catalogoCompleto } from "../assets/catalogue.js";

function bienvenida() {
    const nombre = prompt("Bienvenido a la vinateria 'La Gran Bodega'. Por favor introduce tu nombre:");

    if (!nombre) {
        alert(`Ocurrio un error, por favor intente mas tarde`);
    }

    return nombre;
}

function preguntarEdad(nombre) {
    if (!nombre) {
        alert(`Ocurrio un error, por favor intente mas tarde`);
    }

    const edad = prompt("Por favor introduce tu edad:");

    if (edad < 18) {
        alert(`Lo sentimos, la venta de bebidas alcoholicas esta prohibida para los menores de edad.`);
    } else {
        alert(`Bienvenido, Sr(a) ${nombre}`);
    }

    return edad;
}

function conversionDolarPesoArg(precio) {
    const dolarPeso = 1041.55;

    const conversion = precio * dolarPeso;

    return `$${conversion.toFixed(2)}`;
}

const seleccionCatalogo = (nombre) => {
    const seleccion = prompt("Por favor escriba el catalogo que desea consultar (Whisky, Tequila, Vodka):");

    if (!["tequila", "vodka", "whisky"].includes(seleccion.toLowerCase())) {
        alert(`Lo sentimos, su busqueda no coincide con ninguna de nuestras existencias`);
        return;
    }

    const temp1 = catalogoCompleto.filter(obj => obj.categoria.toLowerCase() === seleccion.toLowerCase());

    let temp2 = [];

    for (let obj of temp1) {
        temp2.push({
            nombre: `${obj.categoria} ${obj.nombre} ${obj.cantidad}`,
            precio: conversionDolarPesoArg(obj.precioUsd),
        });
    }

    confirm(`Listo, Sr(a) ${nombre}! Puede consultar nuestro catalogo en la consola ordenado de mayor a menor precio.`);

    console.log(temp2.sort((a, b) => a.precio - b.precio));
}

const nombre = bienvenida();

const edad = preguntarEdad(nombre);

if (edad >= 18) {
    setTimeout(() => {seleccionCatalogo(nombre)}, 300);
}