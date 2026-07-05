//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    let componenteIngresos = document.getElementById("txtIngresos");
    let componenteEgresos = document.getElementById("txtEgresos");
    let componenteMonto = document.getElementById("txtMonto");
    let componentePlazo = document.getElementById("txtPlazo");
    let componenteTasa = document.getElementById("txtTasaInteres");

    let ingresos = parseFloat(componenteIngresos.value);
    let egresos = parseFloat(componenteEgresos.value);
    let monto = parseInt(componenteMonto.value);
    let plazo = parseInt(componentePlazo.value);
    let tasa = parseInt(componenteTasa.value);

    let disponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interesGenedado = calcularInteresSimple(monto, tasa, plazo);
    let totalPagar = calcularTotalPagar(monto, interesGenedado);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);

    document.getElementById("spnDisponible").innerText = "USD " + disponible.toFixed(2);
    document.getElementById("spnCapacidadPago").innerText = "USD " + capacidadPago.toFixed(2);
    document.getElementById("spnInteresPagar").innerText = "USD " + interesGenedado.toFixed(2);
    document.getElementById("spnTotalPrestamo").innerText = "USD " + totalPagar.toFixed(2);
    document.getElementById("spnCuotaMensual").innerText = "USD " + cuotaMensual.toFixed(2);

    // Análisis del crédito
    let esAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let componenteEstado = document.getElementById("spnEstadoCredito");

    if (esAprobado) {
        componenteEstado.innerText = "CREDITO APROBADO";
        componenteEstado.style.color = "green";
    } else {
        componenteEstado.innerText = "CREDITO RECHAZADO";
        componenteEstado.style.color = "red";
    }
}
 status 
document.getElementById("btnReiniciar").addEventListener("click", function() {
    // Limpiar cajas de texto
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Vaciar los textos de resultados
    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";
    
    // Resetear el estado
    let componenteEstado = document.getElementById("spnEstadoCredito");
    componenteEstado.innerText = "ANALIZANDO...";
    componenteEstado.style.color = "#94a3b8";
    componenteEstado.style.backgroundColor = "#0f172a";
});