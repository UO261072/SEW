<!DOCTYPE html>
<html lang="es">

<head>
    <title>Xenobalde Php</title>
    <meta charset="utf-8" />
    <meta name="author" content="Aique Montes Maestre" />
    <link rel="stylesheet" href="estilo.css"/>
	<link rel="stylesheet" href="posicionamiento.css"/>

</head>

<body>
    
    <section>
        <h1>Tabla de obtencion de objetos</h1>
        <p>Introduce el nombre del objeto que quieres buscar y pulsa enter</p>
        <form name="form" method="get">
            <input type="text" name="subject" id="subject" value="Sakuraba Longsword">
            <input type="submit" value="Buscar">
        </form>
        <?php
        
        //datos de la base de datos
        $servername = "localhost";
        $username = "DBUSER2020";
        $password = "DBPSWD2020";
        $database = "xenoblade";

        // Conexión al SGBD local. En XAMPP el usuario debe estar creado previamente 
        $db = new mysqli($servername, $username, $password, $database);

        // compruebo la conexion
        if ($db->connect_error) {
            exit("<p>ERROR de conexión:" . $db->connect_error . "</p>");
        }

        //consultar la tabla persona
        $resultado =  $db->query('SELECT o.nombre as nombreObjeto,o.probabilidad,o.parte,e.nombre as nombreEnemigo,e.hora,l.nombre as nombreLocalizacion,l.continente FROM objetos o INNER JOIN enemies e on o.enemigo_id=e.id INNER JOIN localizaciones l on localizacion_id = l.id where o.nombre="'.$_GET['subject'].'"');

        // compruebo los datos recibidos     
        if ($resultado->num_rows > 0) {
            // Mostrar los datos en un lista
            echo "<p>Estos son los datos de obtencion del objeto: </p>";
            echo "<table>";
            echo "<tr>" . '<th>Nombre Objeto</th>' .  '<th>Probabilidad</th>' . '<th>Parte</th>' . '<th>Nombre Enemigo</th>' . '<th>Hora</th>' . '<th>Nombre Localizacion</th>' . '<th>Continente</th>' . "</tr>";
            while ($row = $resultado->fetch_assoc()) {
                echo "<tr><td>" . $row['nombreObjeto'] . "</td><td>" . $row['probabilidad'] . " </td><td> " . $row['parte'] . "</td><td>" . $row['nombreEnemigo'] ."</td><td>". $row['hora'] ."</td><td>". $row['nombreLocalizacion'] ."</td><td>". $row['continente'] . "</td></tr>";
            }
            echo "</table>";
        } else {
            echo "<p>No se ha encontrado el objeto</p>";
        }
        //cerrar la conexión
        $db->close();
        ?>
    </section>
    <nav>
		<h2>Menu de navegacion</h2>
		<a href="index.html">Pagina Principal</a>
		<a href="historia.html">Historia</a>
		<a href="monolithSoft.html">Contexto</a>
        <a href="personajes.html">Personajes</a>
		<a href="calculadoraDeDano.html">Calculadora de Daño</a>
		<a href="tablaObjetos.php">Tabla de obtencion de objetos</a>
	</nav>
</body>

</html>