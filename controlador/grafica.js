(function (H) {
    var merge = H.merge;
        H.wrap(H.Legend.prototype, 'getAllItems', function() {
            var allItems = [];
            var chart = this.chart;
            var options = this.options;
            var legendID = options.legendID;

            H.each(chart.series, function(series) {
                if (series) {
                    var seriesOptions = series.options;

                    // use points or series for the legend item depending on legendType
                    if (!isNaN(legendID) && (seriesOptions.legendID === legendID)) {
                        allItems = allItems.concat(
                            series.legendItems ||
                            (seriesOptions.legendType === 'point' ?
                            series.data :
                            series)
                        );
                    }
                }
            });
            return allItems;
        });

        H.wrap(H.Chart.prototype, 'render', function(p){var chart = this, chartOptions = chart.options;
        chart.firstLegend = new H.Legend(chart, merge(chartOptions.legend, chartOptions. firstLegend, {legendID: 0 }));
        chart.secondLegend = new H.Legend(chart, merge(chartOptions.legend, chartOptions.secondLegend, {legendID: 1}));
        p.call(this); });
        H.wrap(H.Chart.prototype, 'redraw', function(p, r, a) {var chart = this;
        p.call(chart, r, a);
        chart.firstLegend.render(); chart.secondLegend.render(); });
        H.wrap(H.Legend.prototype, 'positionItem', function(p, item) {p.call(this, item); }); })(Highcharts);

    Highcharts.setOptions({
        lang: {
            loading: 'Cargando...',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
            resetZoom: "Reiniciar Zoom",
            resetZoomTitle: "Reiniciar Zoom"
        }
    });
        function crearGraficoHighcharts(estacionId) {
            var estacion = null;
        
            // Busca la estación correspondiente en el array de estaciones
            for (var i = 0; i < estaciones.length; i++) {
                if (estaciones[i].EstId === estacionId) {
                    estacion = estaciones[i];
                    break;
                }
            }
        
            var titleText = 'HIDROGRAMA DE NIVELES DE AGUA DEL RÍO ' + estacion.EstRio;
            var subtitleText = 'ESTACION DE ' + estacion.EstNombre;
        
            var yellowFrom, yellowTo, orangeFrom, orangeTo, redFrom, redTo;
        
            // Recorre el array de umbrales para encontrar los valores de cada banda de trama
            umbrales.forEach((umbral) => {
                if (umbral.EstId === estacionId) {
                    if (umbral.UmbColor === "AMARILLO") {
                        yellowFrom = umbral.UmbValor;
                    } else if (umbral.UmbColor === "NARANJA") {
                        orangeFrom = umbral.UmbValor;
                    } else if (umbral.UmbColor === "ROJO") {
                        redFrom = umbral.UmbValor;
                    }
                }
            });
        
            yellowTo = orangeFrom; // El final del amarillo es el comienzo del naranja
            orangeTo = redFrom; // El final del naranja es el comienzo del rojo

            // Filtra los datos del nivel que corresponden a la estación con el 'estacionId' proporcionado.

            const datosNivel = niveles.filter((nivel) => nivel.EstId === estacionId);

            //Luego, crea las series de acuerdo a los datos filtrados:
            const normalData = datosNivel.map((nivel) => nivel.NivelNormal === "" ? null : nivel.NivelNormal);
            const pasadoData = datosNivel.map((nivel) => nivel.NivelAHPasado === "" ? null : nivel.NivelAHPasado);
            const actualData = datosNivel.map((nivel) => nivel.NivelAHActual === "" ? null : nivel.NivelAHActual);

            var chart = Highcharts.chart('container', {
                credits: false,
                chart: {
                    borderColor: 'rgba(25,25,25,.6',
                    borderWidth: 2,
                    marginBottom: 150,
                    zoomType: 'xy',
                    type: 'spline',
                    style: {
                        fontFamily: 'Sans-Serif'
                    }
                },
                title: {
                    text: titleText
                },
                subtitle: {
                    text: subtitleText
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        format: '{value:%e.%b}'
                    }
                },
                yAxis: {
                    gridLineColor: 'rgba(255,255,255,.1)',
                    plotBands: [{
                        color: 'rgba(254, 216, 11,.9)',
                        from: yellowFrom,
                        to: yellowTo,
                    }, {
                        color: 'rgba(254, 102, 2,.9)',
                        from: orangeFrom,
                        to: orangeTo,
                    }, {
                        color: 'rgba(211, 0, 0,.9)',
                        from: redFrom,
                        to: redTo,
                    }],
                    title: {
                        text: 'Nivel (m.s.n.m)'
                    },
                    tickInterval: 2,
                    labels: {
                        formatter: function () {
                            return this.value;
                        },
                    }
                },
                legend: {
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    shadow: true
                },
                tooltip: {
                    shared: true
                },
                firstLegend:{
                    symbolWidth:20,
                    y: -30,
                    x: 0,
                    align: 'center',
                    layout: 'horizontal'
                },
                secondLegend:{
                    symbolWidth:30,
                    y: -60,
                    x: 10,
                    align: 'center',
                    layout: 'horizontal'
                },
                plotOptions: {
                    series: {
                        pointStart: Date.UTC(2019, 8, 1),
                        pointInterval: 24 * 3600 * 1000 // cada día
                    }
                },
                series: [{
                    name: 'Normal',
                    color: 'rgb(47, 218, 53)',
                    lineWidth: 2,
                    dashStyle: 'dash',
                    data: normalData,
                    legendID: 0
                },
                {
                    name: 'Pasado',
                    color: 'rgb(1,154,221)',
                    lineWidth:2,
                    data: pasadoData,
                    legendID:0
                },
                {
                    name:'Actual',
                    color:'rgb(0, 0, 0)',
                    lineWidth:2,
                    data:actualData,
                    legendID:0
                },
                {
                    name:"Inminente Inundacion",
                    color:'rgb(211, 0, 0)',
                    lineWidth:10,
                    legendID: 1
                },
                {
                    name:"Probable Inundacion", 
                    color:'rgb(254, 102, 2)',
                    lineWidth:10,
                    legendID: 1
                },
                {
                    name:"Posible Inundacion",
                    color:'rgb(254, 216, 11)',
                    lineWidth:10,
                    legendID: 1
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 915
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            yAxis: {
                                labels: {
                                    align: 'left',
                                    x: 0,
                                    y: -5
                                }
                            },
                            credits: {
                                enabled: false
                            }
                        }
                    }]
                }
            });

        // Hacer el gráfico responsive
        window.addEventListener('resize', function () {
            chart.setSize(
                document.getElementById('container').offsetWidth, // Ancho
                500 // Altura o la altura deseada
            );
        });
        
    }
    // Asigna la función a una propiedad global
    window.crearGraficoHighcharts = crearGraficoHighcharts;

