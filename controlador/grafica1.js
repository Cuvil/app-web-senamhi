
  // Define una función que crea el gráfico Highcharts
function crearGraficoHighcharts1() {
    const datos = {
        "AutoValoresHM": [
            { "AutoFechaHora": "05/11/2023 23:00", "AutoTemp": 20 },
            { "AutoFechaHora": "06/11/2023 00:00", "AutoTemp": 20.1 },
            { "AutoFechaHora": "06/11/2023 01:00", "AutoTemp": 20.3 },
            // Otros datos...
        ]
    };

    // Organiza los datos en arrays de fechas y temperaturas
    const fechas = datos.AutoValoresHM.map(item => item.AutoFechaHora);
    const temperaturas = datos.AutoValoresHM.map(item => item.AutoTemp);

    // Configura el gráfico Highcharts
    const chartOptions = {
        chart: {
            type: 'line',
            renderTo: 'contenedor-grafico',
        },
        title: {
            text: 'ESTACION QUISTOCOCHA'
        },
        xAxis: {
            categories: fechas
        },
        yAxis: {
            title: {
                text: 'Temperatura (°C)'
            }
        },
        series: [{
            name: 'Temperatura',
            data: temperaturas
        }]
    };

    // Crea el gráfico Highcharts
    const chart = Highcharts.chart(chartOptions);
}

// Exporta la función para que pueda ser utilizada en otros archivos
window.crearGraficoHighcharts1 = crearGraficoHighcharts1;
