//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}
