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

    // Recorre las estaciones y crea marcadores
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
        });
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
});
 