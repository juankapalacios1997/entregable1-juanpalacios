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

const whiskies = [
    {
        nombre: "Johnny Walker Black Label",
        categoria: "Whisky",
        cantidad: " 750 ml",
        precioUsd: 51.99
    },
    {
        nombre: "Buchanan's Deluxe 12 anos Blended Scotch",
        categoria: "Whisky",
        cantidad: " 750 ml",
        precioUsd: 21.99
    },
    {
        nombre: "Chivas Regal 12 anos",
        categoria: "Whisky",
        cantidad: "750 ml",
        precioUsd: 65.99
    },
    {
        nombre: "Ballantines",
        categoria: "Whisky",
        cantidad: "700 ml",
        precioUsd: 19.99
    }
]

const catalogoCompleto = [
    {
        nombre: "Johnny Walker Black Label",
        categoria: "Whisky",
        cantidad: " 750 ml",
        precioUsd: 51.99
    },
    {
        nombre: "Buchanan's Deluxe 12 anos Blended Scotch",
        categoria: "Whisky",
        cantidad: " 750 ml",
        precioUsd: 21.99
    },
    {
        nombre: "Chivas Regal 12 anos",
        categoria: "Whisky",
        cantidad: "750 ml",
        precioUsd: 65.99
    },
    {
        nombre: "Ballantines",
        categoria: "Whisky",
        cantidad: "700 ml",
        precioUsd: 19.99
    },
    {
        nombre: "Don Julio Reposado",
        categoria: "Tequila",
        cantidad: " 700 ml",
        precioUsd: 51.99
    },
    {
        nombre: "Gran Centenario",
        categoria: "Tequila",
        cantidad: " 950 ml",
        precioUsd: 15.99
    },
    {
        nombre: "Mestro Dobel Diamante",
        categoria: "Tequila",
        cantidad: " 700 ml",
        precioUsd: 71.99
    },
    {
        nombre: "Jose Cuervo Tradicional Reposado",
        categoria: "Tequila",
        cantidad: " 700 ml",
        precioUsd: 34.99
    },
    {
        nombre: "Smirnoff X1 Tamarindo",
        categoria: "Vodka",
        cantidad: "750ml",
        precioUsd: 9.99
    },
    {
        nombre: "Stolichnaya Spirit",
        categoria: "Vodka",
        cantidad: "750ml",
        precioUsd: 14.99
    },
    {
        nombre: "Absolut Azul 750ml",
        categoria: "Vodka",
        cantidad: "700ml",
        precioUsd: 19.99
    },
]

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