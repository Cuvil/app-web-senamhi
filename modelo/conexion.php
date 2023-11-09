<?php 
    $conec = file_get_contents('http://etechgroup-001-site2.dtempurl.com/estacion/listardatos');
    $array = json_decode($conec, true);

    // Crear un nuevo arreglo con los datos que deseas convertir a JSON
    $data = array(
        "Estacion" => $array["Estacion"],
        "Nivel" => $array["Nivel"],
        "Umbral" => $array["Umbral"]
    );

    // Convertir el arreglo en JSON
    $json_data = json_encode($data);

    // Enviar el JSON como respuesta
    echo $json_data;
?>
