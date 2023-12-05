document.addEventListener('DOMContentLoaded', function () {
    // Crea el mapa y configura las capas aquí
    let mapa = L.map('map').setView([-3.722, -73.092], 7);

    // Agrega capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Remueve los controles de zoom predeterminados de Leaflet
    mapa.zoomControl.remove();

    // Agrega tus propios controles de zoom a la izquierda
    L.control.zoom({
        position: 'bottomright' // Esto coloca los iconos de zoom en la esquina superior izquierda
    }).addTo(mapa);

    // Oculta el menú al cargar la página
    const menu = document.querySelector('#menu');
    menu.classList.remove('active');

    // Inicializa la variable para rastrear el estado del menú
    let menuAbierto = false;

    // Manejo del menú desplegable
    const iconoMenu = document.querySelector('#icono-menu');
    iconoMenu.addEventListener('click', (e) => {
        // Alternamos estilos para el menú y el body
        menu.classList.toggle('active');
        document.body.classList.toggle('opacity');

        // Cambiamos el atributo src para el fondo del icono del menú
        if (menuAbierto) {
            iconoMenu.children[0].src = 'menu.png'; // Menú cerrado, cambia la imagen a "menu.png"
        } else {
            iconoMenu.children[0].src = 'menu2.png'; // Menú abierto, cambia la imagen a "menu2.png"
        }
        // Actualizamos el estado del menú
        menuAbierto = !menuAbierto;
    });

    // Ocultar la ventana emergente al cargar la página
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none'; // Oculta la ventana emergente inicialmente

    // Mostrar la ventana emergente al hacer clic en el botón "Intranet"
    const intranetButton = document.getElementById('intranetButton');

    intranetButton.addEventListener('click', () => {
        overlay.style.display = 'block'; // Muestra la ventana emergente al hacer clic
    });

    // Cerrar la ventana emergente al hacer clic en el icono de cierre
    const closePopup = document.getElementById('closePopup');
    closePopup.addEventListener('click', () => {
        overlay.style.display = 'none'; // Oculta la ventana emergente al hacer clic
    });

    // Obtén una referencia a los elementos del menú y del contenedor de menú
    const climaButton = document.getElementById('climaButton');
    const hidrologicoButton = document.getElementById('hidrologicoButton');

    // Agrega eventos de clic a los botones para ocultar el menú
    climaButton.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    hidrologicoButton.addEventListener('click', () => {
        menu.classList.remove('active');
    });



    //tabla

    const datosEstacion = {
        EstId: 2,
        EstNombre: "CONTAMANA",
        EstLatitud: -7.35,
        EstLongitud: -75.01,
        EstRio: "UCAYALI",
        EstInstitucion: "SENAMHI",
        EstColor: "VERDE",
        PeriodoId: 6,
        Periodo: "VACIANTE",
        // ... otros datos
    };
    
    const datosNivel = {	
        NivelId: niveles.NivelId,
        EstId:	niveles.EstId,
        NivelFecha:	niveles.NivelFecha,
        NivelFechaPasado:	niveles.NivelFechaPasado,
        NivelFechaActual:	niveles.NivelFechaActual,
        NivelNormal:	niveles.NivelNormal,
        NivelAHPasado:	niveles.NivelAHPasado,
        NivelAHActual:	niveles.NivelAHActual,
    };
    const datosUmbral = {
        UmbId: umbrales.UmbId,
        EstId:	umbrales.EstId,
        UmbValor:	umbrales.UmbValor,
        UmbColor:	umbrales.UmbColor,
    };


    // Recorre las estaciones y crea marcadores 
    const marcadoresOriginales = [];
    estaciones.forEach(function (estacion) {
        // Define el ícono basado en el color
        let iconoUrl;
        if (estacion.EstColor === 'VERDE') {
            iconoUrl = 'img/Marker/verde.png';
        } else if (estacion.EstColor === 'AMARILLO') {
            iconoUrl = 'img/Marker/amarillo.png';
        } else if (estacion.EstColor === 'NARANJA') {
            iconoUrl = 'img/Marker/naranja.png';
        } else if (estacion.EstColor === 'ROJO') {
            iconoUrl = 'img/Marker/rojo.png';
        }

        // Crea un marcador y añádelo al mapa
        const marker = L.marker([estacion.EstLatitud, estacion.EstLongitud], {
            icon: L.icon({
                iconUrl: iconoUrl,
                iconSize: [40, 40],
                iconAnchor: [20, 40], // Punto de anclaje del icono en el marcador
            }),
        }).addTo(mapa);

        // Agrega un tooltip al marcador para mostrar el nombre de la estación al pasar el mouse 
        marker.bindTooltip(estacion.EstNombre, {
            permanent: false, // El tooltip no es permanente
            direction: 'top', // Mostrar el tooltip arriba del marcador
            opacity: 0.7, // Opacidad del tooltip   
        });

        // Agrega un evento de clic al botón "Ver gráfico" en la ventana emergente
        const popupContent = `
            <div class="custom-popup">
                <h2>${estacion.EstNombre}</h2>
                <p>Latitud: ${estacion.EstLatitud}</p>
                <p>Longitud: ${estacion.EstLongitud}</p>
                <a href="#" class="show-graph-button" data-estacion-id="${estacion.EstId}">Ver gráfico</a>
                <a href="#" class="show-table-button" data-estacion-id="${estacion.EstId}">Ver Tabla</a>
            </div>
        `;

        // Agrega la ventana emergente personalizada al marcador
        marker.bindPopup(popupContent);
        let estacionId = null; 

        // Agrega un evento de apertura de ventana modal para acceder al contenido
        marker.on('popupopen', function () {

            const showGraphButtons = document.querySelectorAll('.show-graph-button');

            showGraphButtons.forEach(function (button) {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    estacionId = parseInt(button.getAttribute('data-estacion-id'));

                    // Aquí es donde verificas si estacionId coincide con alguna estación en estaciones
                    // y luego realizas la lógica para mostrar el nombre de la estación en el gráfico
                    estaciones.forEach(function (estacion) {
                        if (estacionId === estacion.EstId) {
                            // Tu lógica para mostrar el nombre de la estación en el gráfico
                            console.log(estacion.EstNombre);

                        }
                    });

                    const modalContainer = document.getElementById('modal-container');

                    // Llamas a la función que crea el gráfico Highcharts y lo muestra en la ventana modal
                    crearGraficoHighcharts(estacionId);
                    // Muestra la ventana modal
                    $('#graph-modal').modal('show');
                });
            });

             // Agregamos también el evento de clic para los botones 'Ver Tabla'
            const showTableButtons = document.querySelectorAll('.show-table-button');
            showTableButtons.forEach(function (button) {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    estacionId = parseInt(button.getAttribute('data-estacion-id'));

                    estaciones.forEach(function (estacion) {
                        if (estacionId === estacion.EstId) {
                          
                            mostrarDatosEnTabla({
                                Estacion: estacion,
                                Nivel: datosNivel,  // Asegúrate de tener datosNivel definido en tu código
                                Umbral: datosUmbral  // Asegúrate de tener datosUmbral definido en tu código
                            });

                            // Muestra la ventana modal
                            $('#tabla-modal').modal('show');
                        }
                    });
                });
            });


        });

        // Almacena los marcadores originales en el array después de haberlos creado
        marcadoresOriginales.push(marker);
    });

    // Escucha el evento de apertura de la ventana modal
    $('#graph-modal').on('show.bs.modal', function () {
        // Obtén el tamaño del contenedor del gráfico
        var chartContainer = document.getElementById('container');
        var width = chartContainer.offsetWidth;
        var height = chartContainer.offsetHeight;

        // Establece el ancho y alto de la ventana modal según el tamaño del gráfico
        $('#graph-modal .modal-dialog').css('max-width', width + '80%');
        $('#graph-modal .modal-dialog').css('max-height', height + '24%');
    });


    

    // Llamada a la función para mostrar la tabla de datos cuando se hace clic en un marcador
    function mostrarDatosEnTabla(datos) {
        const tabla = document.createElement('table');
        tabla.classList.add('table');

        for (const categoria in datos) {
            if (datos.hasOwnProperty(categoria)) {
                const categoriaDatos = datos[categoria];

                // Añade un encabezado para la categoría
                const encabezadoFila = tabla.insertRow();
                const encabezadoCelda = encabezadoFila.insertCell();
                encabezadoCelda.colSpan = 2;
                encabezadoCelda.textContent = categoria;

                // Añade datos para la categoría
                for (const key in categoriaDatos) {
                    if (categoriaDatos.hasOwnProperty(key)) {
                        const fila = tabla.insertRow();
                        const celda1 = fila.insertCell(0);
                        const celda2 = fila.insertCell(1);

                        celda1.textContent = key;
                        celda2.textContent = categoriaDatos[key];
                    }
                }
            }
        }

        // Encuentra el contenedor de la tabla en tu HTML (ajusta el selector según tu estructura)
        const tablaContainer = document.getElementById('tabla-container');

        // Limpia cualquier contenido previo en el contenedor
        tablaContainer.innerHTML = '';

        // Agrega la tabla al contenedor
        tablaContainer.appendChild(tabla);
    }














<<<<<<< HEAD
=======



    let marcadorClima = null;
>>>>>>> dc253088f5cd71dd224f0b1009748059156eda34

    document.getElementById('climaButton').addEventListener('click', function () {
        // Limpiar marcadores existentes
        mapa.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                mapa.removeLayer(layer);
            }
        });
<<<<<<< HEAD
    
        let marcadorClima = null;
    
        // Función para mostrar la tabla
        function mostrarTabla(datosTabla) {
            // Actualizar datos de la tabla
            const ultimosDatos = datosTabla.slice(-7);
            mostrarTablaEnModal(ultimosDatos);
        }
    
        function mostrarTablaEnModal(datosTabla) {
            const datosOrdenados = datosTabla.sort((a, b) => new Date(b.AutoFechaHora) - new Date(a.AutoFechaHora));
            const ultimosDatos = datosOrdenados.slice(-7);
    
            document.getElementById('modalContent').innerHTML = `
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Fecha y Hora </th>
                                <th>Temperatura °C</th>
                                <th>Humedad Relativa</th>
                                <th>Radiación </th>
                                <th>Dirección del Viento grados</th>
                                <th>Velocidad del Viento m/S</th>
                                <th>Precipitación mm</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ultimosDatos.map(data => `
                                <tr>
                                    <td>${data.AutoFechaHora}</td>
                                    <td>${data.AutoTemp}</td>
                                    <td>${data.AutoHR}</td>
                                    <td>${data.AutoRadiacion}</td>
                                    <td>${data.AutoWindDir}</td>
                                    <td>${data.AutoWindVel}</td>
                                    <td>${data.AutoPP}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
    
            const modal = new bootstrap.Modal(document.getElementById('tablaModal'), {
                backdrop: 'static',
                keyboard: false
            });
    
            modal.show();
        }
    
        function mostrarGrafico() {
            // Agrega lógica para mostrar el gráfico
            // Puedes implementar esta función según tus necesidades
        }
    
=======

        // Crea un marcador para el clima y añádelo al mapa
>>>>>>> dc253088f5cd71dd224f0b1009748059156eda34
        marcadorClima = L.marker([-3.75, -73.25], {
            icon: L.icon({
                iconUrl: 'img/Marker/rojo.png',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            }),
        }).addTo(mapa);
<<<<<<< HEAD
    
        // Evento de clic en el marcador
        marcadorClima.on('click', function () {
            const popupContent = `
                <div>
                    <p>Haga clic en una opción:</p>
                    <button id="verTablaBtn">Ver Tabla</button>
                    <button onclick="mostrarGrafico()">Ver Gráfico</button>
                </div>
            `;
    
            marcadorClima.bindPopup(popupContent).openPopup();
    
            // Desvincula el evento de clic anterior si existe
            document.getElementById('verTablaBtn').removeEventListener('click', mostrarTablaClickHandler);
    
            // Asigna el nuevo controlador de eventos
            document.getElementById('verTablaBtn').addEventListener('click', mostrarTablaClickHandler);
        });
    
=======

        // Agrega un tooltip al marcador para mostrar el nombre al pasar el mouse 
>>>>>>> dc253088f5cd71dd224f0b1009748059156eda34
        marcadorClima.bindTooltip('QUISTOCOCHA', {
            permanent: false,
            direction: 'top',
            opacity: 0.7,
        });
<<<<<<< HEAD
    
        // Define la función para manejar el clic en el botón de la tabla
        function mostrarTablaClickHandler() {
            mostrarTabla(autovalores);
        }
    });
    
    

    

=======
        
        // Datos de ejemplo para la tabla (reemplázalos con tus datos reales)
        const datosTabla = autovalores;
        const datosOrdenados = datosTabla.sort((a, b) => new Date(b.AutoFechaHora) - new Date(a.AutoFechaHora));
        const ultimosDatos = datosOrdenados.slice(0, 7);
        // Agrega una ventana emergente personalizada al marcador
        const popupContent = `
        <div class="custom-popup style="max-width: 600px; padding: 20px;">
            <h2>ESTACION: QUISTOCOCHA</h2>
            <table>
                <thead>
                    <tr>
                        <th style="padding-right: 10px;">AutoId</th>
                        <th style="padding-right: 10px;">Fecha y Hora</th>
                        <th style="padding-right: 10px;">Temperatura</th>
                        <th style="padding-right: 10px;">Humedad Relativa</th>
                        <th style="padding-right: 10px;">Radiación</th>
                        <th style="padding-right: 10px;">Dirección del Viento</th>
                        <th style="padding-right: 10px;">Velocidad del Viento</th>
                        <th style="padding-right: 10px;">Precipitación</th>
                    </tr>
                </thead>
                <tbody>
                    ${ultimosDatos.map(data => `
                        <tr>
                            <td>${data.AutoId}</td>
                            <td>${data.AutoFechaHora}</td>
                            <td>${data.AutoTemp}</td>
                            <td>${data.AutoHR}</td>
                            <td>${data.AutoRadiacion}</td>
                            <td>${data.AutoWindDir}</td>
                            <td>${data.AutoWindVel}</td>
                            <td>${data.AutoPP}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        `;

        // Aplicar estilos CSS para personalizar el tamaño de la ventana emergente
        const popupStyles = `
        .leaflet-popup-content-wrapper {
            width: 400px !important; /* Ajusta el ancho máximo según tus necesidades */
            max-height: 600px !important; /* Ajusta la altura máxima según tus necesidades */
            overflow-y: auto; /* Agrega desplazamiento vertical si el contenido es demasiado largo */
        }

        .custom-popup {
            padding: 20px; /* Ajusta el espacio interno según tus necesidades */
            width: 100%; /* Ajusta el ancho del contenido al 100% del contenedor */
            height: 100%; /* Ajusta la altura del contenido al 100% del contenedor */
        }

        .custom-popup table {
            width: 100%; /* Ocupa el ancho completo del contenedor */
            margin-top: 10px; /* Ajusta el espacio superior según tus necesidades */
        }

        .custom-popup th,
        .custom-popup td {
            padding: 8px; /* Ajusta el espacio interno de las celdas según tus necesidades */
        }`;

        // Agregar estilos CSS dinámicamente al head del documento
        const styleElement = document.createElement('style');
        styleElement.innerHTML = popupStyles;
        document.head.appendChild(styleElement);

        marcadorClima.bindPopup(popupContent);
    });
        
>>>>>>> dc253088f5cd71dd224f0b1009748059156eda34
    
        // Agrega un evento de clic al botón "Hidrológico" para restaurar los marcadores originales
        document.getElementById('hidrologicoButton').addEventListener('click', function () {
            // Elimina todos los marcadores actuales en el mapa
            mapa.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    mapa.removeLayer(layer);
                }
            });
        
        // Restaura los marcadores originales
        marcadoresOriginales.forEach(function (marker) {
            marker.addTo(mapa);
        });
    });
});
