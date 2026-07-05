//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    let componenteIngresos = document.getElementById("txtIngresos");
    let componenteEgresos = document.getElementById("txtEgresos");

    let ingresos = parseFloat(componenteIngresos.value);
    let egresos = parseFloat(componenteEgresos.value);

    let disponible = calcularDisponible(ingresos, egresos);

    document.getElementById("spnDisponible").innerText = "USD " + disponible.toFixed(2);
}