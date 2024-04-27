const readlineSync = require('readline-sync');

// Clase base
class Viaje {
    constructor(origen, destino, costoBase) {
        this.origen = origen;
        this.destino = destino;
        this.costoBase = costoBase;
    }
}

// Subclase Vuelo que hereda de Viaje
class Vuelo extends Viaje {
    constructor(origen, destino, costoBase, edad) {
        super(origen, destino, costoBase);
        this.edad = edad;
        this.impuestos = 0; // Inicializar impuestos en 0
        this.impuestoMascotas = 0;
        this.descuentoPromocion = 0;
    }

    esInfante() {
        return this.edad <= 12;
    }

    calcularImpuestos(porcentajeImpuesto) {
        this.impuestos = this.costoBase * (porcentajeImpuesto / 100);
    }

    calcularImpMascota(porcentajeImpuesto) {
        this.impuestoMascotas = this.costoBase * (porcentajeImpuesto / 100);
    }

    calcularDescuento() {
        this.descuentoPromocion = this.costoBase * 0.1;
        this.costoBase -= this.descuentoPromocion;
    }
}

// Lista para almacenar los vuelos vendidos
const vueloVendido = [];

// Función para registrar un nuevo vuelo vendido
function registrarVenta(Origen, Destino, CostoBoleto, promocion, impuestoDestino, tieneMascotas, edadPasajero) {
    const viaje = new Vuelo(Origen, Destino, CostoBoleto, edadPasajero);
    if (promocion === "si") {
        viaje.calcularDescuento();
    }
    viaje.calcularImpuestos(impuestoDestino);
    if (tieneMascotas === "si") {
        viaje.calcularImpMascota(impuestoDestino);
    }
    vueloVendido.push(viaje);
}

// Función para mostrar los impuestos por destino de los vuelos vendidos
function impuestoDestinoViaje() {
    for (let i = 0; i < vueloVendido.length; i++) {
        console.log(`Destino: ${vueloVendido[i].destino}`);
        console.log(`Impuesto: ${vueloVendido[i].impuestos}`);
    }
}

// Función para obtener el número total de vuelos vendidos
function totalVendidos() {
    return vueloVendido.length;
}

// Función para determinar el destino preferido
function destinoPreferido() {
    const destinos = {};
    let maxVuelos = 0;
    let preferidos = [];

    for (let i = 0; i < vueloVendido.length; i++) {
        const vuelo = vueloVendido[i];
        const destino = vuelo.destino;
        destinos[destino] = (destinos[destino] || 0) + 1;

        if (destinos[destino] > maxVuelos) {
            maxVuelos = destinos[destino];
            preferidos = [destino];
        } else if (destinos[destino] === maxVuelos) {
            preferidos.push(destino);
        }
    }

    if (preferidos.length === 1) {
        return preferidos[0];
    } else {
        return "No hay un destino preferido";
    }
}

// Función para calcular el recaudo por mascotas
function recaudoMascotas() {
    let recaudoMascotas = 0;
    for (let i = 0; i < vueloVendido.length; i++) {
        recaudoMascotas += vueloVendido[i].impuestoMascotas;
    }
    return recaudoMascotas;
}

// Función para contar el número de infantes que han viajado
function infantesVuelo() {
    let totalInfantes = 0;
    for (let i = 0; i < vueloVendido.length; i++) {
        if (vueloVendido[i].esInfante()) {
            totalInfantes++;
        }
    }
    return totalInfantes;
}

// Función para calcular el total recaudado por la venta de tiquetes
function totalRecaudado() {
    let total = 0;
    for (let i = 0; i < vueloVendido.length; i++) {
        const vuelo = vueloVendido[i];
        total += vuelo.costoBase + vuelo.impuestos;
    }
    return total;
}

// Función para calcular el valor promedio de los tiquetes vendidos
function calcularValorPromedioTicket() {
    const totalRecaudadoVal = totalRecaudado();
    const totalVendidosVal = totalVendidos();
    return totalRecaudadoVal / totalVendidosVal;
}

// Función para calcular el costo total de los dulces brindados a los infantes
function costoDulcesInfantes() {
    const costoUnitarioDulce = 0.50; // Costo unitario de cada dulce
    const totalInfantes = infantesVuelo(); // Obtener el total de infantes
    const totalDulces = totalInfantes * 5; // Calcular el total de dulces
    const costoTotalDulces = totalDulces * costoUnitarioDulce; // Calcular el costo total de los dulces
    return costoTotalDulces; // Devolver el costo total de los dulces brindados a los infantes
}

// Obtener la cantidad de viajes a registrar
const numViajes = parseInt(readlineSync.question("¿Cuántos viajes desea registrar? "));
// Registrar cada viaje
for (let i = 0; i < numViajes; i++) {
    const edadPasajero = parseInt(readlineSync.question("Digite la edad del pasajero: "));
    const tieneMascotas = readlineSync.question("Lleva mascotas en el viaje? (SI/NO): ").toLowerCase();
    const Destino = readlineSync.question("Digite el destino del viaje: ");
    const impuestoDestino = parseInt(readlineSync.question("Digite el porcentaje del impuesto al destino (valor de 0 a 100): "));
    const Origen = readlineSync.question("Digite el origen del viaje: ");
    const CostoBoleto = parseFloat(readlineSync.question("Digite el costo base: "));
    const promocion = readlineSync.question("El vuelo tiene promoción? (SI/NO): ").toLowerCase();

    registrarVenta(Origen, Destino, CostoBoleto, promocion, impuestoDestino, tieneMascotas, edadPasajero);
}

console.log(vueloVendido);
impuestoDestinoViaje();
const totalv = totalVendidos();
console.log("El número de vuelos vendidos es: ", totalv);
console.log("Destino preferido:", destinoPreferido());
console.log("Recaudo por mascotas:", recaudoMascotas());
console.log("Infantes que han viajado:", infantesVuelo());
console.log("Costo total de los dulces brindados a los infantes:", costoDulcesInfantes());
console.log("Valor total recaudado por venta de tiquetes:", totalRecaudado());
console.log("Valor promedio por ticket:", calcularValorPromedioTicket());
