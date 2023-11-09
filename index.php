<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senamhi</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <!-- Agrega estos enlaces en la sección head de tu HTML -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>


    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
</head>
<body>
    <?php
    $conec = file_get_contents('http://etechgroup-001-site2.dtempurl.com/estacion/listardatos');
    $array = json_decode($conec, true);

    // Verificar si se obtuvieron datos correctamente
    if ($array !== null) {
        $est = $array["Estacion"];
        $niv = $array["Nivel"];
        $umb = $array["Umbral"];


        // Convertir $est a formato JSON para pasarlo a JavaScript
        $est_json = json_encode($est);
        $niv_json = json_encode($niv);
        $umb_json = json_encode($umb);

        echo "<script>";
        echo "var estaciones = " . $est_json . ";";
        echo "var niveles = " . $niv_json . ";";
        echo "var umbrales = " . $umb_json . ";";
        echo "</script>";
    } else {
        echo "No se pudieron obtener datos.";
    }
    ?>



    <button id="intranetButton">Intranet</button>
    <div class="icono-menu">
        <img src="img/menu.png" alt="" id="icono-menu">
    </div>
    <div class="cont-menu active" id="menu">
        <ul>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
        </ul>
    </div>

    <div id="map-container">
        <div id="map"></div>
    </div>

    <!-- Contenedor para el gráfico -->
    <!-- Estructura de la ventana modal -->
    <div class="modal fade" id="graph-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content custom-modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body">
                    <!-- Contenido del gráfico -->
                    <div id="container" style="width: 100%; height: 400px;"></div>
                </div>
            </div>
        </div>
    </div>

    
    <div id="overlay" class="hidden">
        <div id="loginPopup" class="popup">
            <span id="closePopup" class="close-button">&times;</span>
            <h2>Iniciar sesión</h2>
            <form>
                <div class="form-group">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" required>
                </div>
                <a href="#" id="forgotPassword">¿Olvidaste tu contraseña?</a>
                <button id="loginButton">Iniciar sesión</button>
            </form>
        </div>
    </div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script type="module" src="controlador/main.js"></script>
    <script type="module" src="controlador/grafica.js"></script>
</body>
</html>
