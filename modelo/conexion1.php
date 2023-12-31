<?php
// Obtener datos de la API con un parámetro de tiempo para evitar la caché
$conec = file_get_contents('http://etechgroup-001-site2.dtempurl.com/estacionhm/listardatoshm?v=' . time());
$array = json_decode($conec, true);

// Verificar si se obtuvieron datos correctamente
if ($array !== null) {
    $es = $array["EstacionHM"];
    $au = $array["AutoValoresHM"];

    // Convertir $es y $au a formato JSON para pasarlo a JavaScript
    $es_json = json_encode($es);
    $au_json = json_encode($au);

    echo "<script>";
    echo "var estacion = " . $es_json . ";";
    echo "var autovalores = " . $au_json . ";";
    echo "</script>";
    
} else {
    echo "No se pudieron obtener datos.";
}
?>

