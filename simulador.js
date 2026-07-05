//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    // 1. Obtener componentes de los inputs
    let componenteIngresos = document.getElementById("txtIngresos");
    let componenteEgresos = document.getElementById("txtEgresos");
    let componenteMonto = document.getElementById("txtMonto");
    let componentePlazo = document.getElementById("txtPlazo");
    let componenteTasa = document.getElementById("txtTasaInteres");

    // 2. Obtener componentes de error
    let errIngresos = document.getElementById("errIngresos");
    let errEgresos = document.getElementById("errEgresos");
    let errMonto = document.getElementById("errMonto");
    let errPlazo = document.getElementById("errPlazo");
    let errTasa = document.getElementById("errTasa");

    // Limpiar errores previos en cada cálculo
    errIngresos.innerText = "";
    errEgresos.innerText = "";
    errMonto.innerText = "";
    errPlazo.innerText = "";
    errTasa.innerText = "";

    // Variable bandera para rastrear si el formulario es válido
    let esValido = true;

    // --- VALIDACIONES ---

    // Validar Ingresos
    let ingresos = parseFloat(componenteIngresos.value);
    if (componenteIngresos.value.trim() === "") {
        errIngresos.innerText = "No puede estar vacío";
        esValido = false;
    } else if (isNaN(ingresos) || ingresos <= 0) {
        errIngresos.innerText = "Debe ser un número mayor a 0";
        esValido = false;
    }

    // Validar Egresos
    let egresos = parseFloat(componenteEgresos.value);
    if (componenteEgresos.value.trim() === "") {
        errEgresos.innerText = "No puede estar vacío";
        esValido = false;
    } else if (isNaN(egresos) || egresos < 0) {
        errEgresos.innerText = "Debe ser un número positivo";
        esValido = false;
    }

    // Validar Monto (Entre 500 y 50000)
    let monto = parseInt(componenteMonto.value);
    if (componenteMonto.value.trim() === "") {
        errMonto.innerText = "No puede estar vacío";
        esValido = false;
    } else if (isNaN(monto) || monto < 500 || monto > 50000) {
        errMonto.innerText = "El monto debe estar entre USD 500 y USD 50,000";
        esValido = false;
    }

    // Validar Plazo (Entre 1 y 30 años)
    let plazo = parseInt(componentePlazo.value);
    if (componentePlazo.value.trim() === "") {
        errPlazo.innerText = "No puede estar vacío";
        esValido = false;
    } else if (isNaN(plazo) || plazo < 1 || plazo > 30) {
        errPlazo.innerText = "El plazo debe ser entre 1 y 30 años";
        esValido = false;
    }

    // Validar Tasa de Interés (Entre 1% y 35%)
    let tasa = parseInt(componenteTasa.value);
    if (componenteTasa.value.trim() === "") {
        errTasa.innerText = "No puede estar vacío";
        esValido = false;
    } else if (isNaN(tasa) || tasa < 1 || tasa > 35) {
        errTasa.innerText = "La tasa debe estar entre 1% y 35%";
        esValido = false;
    }

    // Si alguna validación falló, detenemos la ejecución y no calculamos nada
    if (!esValido) {
        return;
    }

    // --- CÁLCULOS LÓGICOS (Si todo está bien) ---
    let disponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interesGenerado = calcularInteresSimple(monto, tasa, plazo);
    let totalPagar = calcularTotalPagar(monto, interesGenerado);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);

    // Pintar resultados en pantalla
    document.getElementById("spnDisponible").innerText = "USD " + disponible.toFixed(2);
    document.getElementById("spnCapacidadPago").innerText = "USD " + capacidadPago.toFixed(2);
    document.getElementById("spnInteresPagar").innerText = "USD " + interesGenerado.toFixed(2);
    document.getElementById("spnTotalPrestamo").innerText = "USD " + totalPagar.toFixed(2);
    document.getElementById("spnCuotaMensual").innerText = "USD " + cuotaMensual.toFixed(2);

    // Análisis de estado del crédito
    let esAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let componenteEstado = document.getElementById("spnEstadoCredito");

    if (esAprobado) {
        componenteEstado.innerText = "CREDITO APROBADO";
        componenteEstado.style.color = "#10b981"; // Verde Darmon
    } else {
        componenteEstado.innerText = "CREDITO RECHAZADO";
        componenteEstado.style.color = "#ef4444"; // Rojo Alerta
    }
}

// Configuración del botón Reiniciar para limpiar también las alertas de error
document.getElementById("btnReiniciar").addEventListener("click", function() {
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";
    
    // Limpiar mensajes de error
    document.getElementById("errIngresos").innerText = "";
    document.getElementById("errEgresos").innerText = "";
    document.getElementById("errMonto").innerText = "";
    document.getElementById("errPlazo").innerText = "";
    document.getElementById("errTasa").innerText = "";

    let componenteEstado = document.getElementById("spnEstadoCredito");
    componenteEstado.innerText = "ANALIZANDO...";
    componenteEstado.style.color = "#94a3b8";
});