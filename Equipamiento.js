class Equipo {
	constructor() {
		this.nivel = new Object();
		this.arma1 = new Object();
		this.arma2 = new Object();
		this.casco = new Object();
		this.pecho = new Object();
		this.brazo1 = new Object();
		this.brazo2 = new Object();
		this.piernas = new Object();
		this.habilidad = new Object();


		this.nivel = 1;
		this.arma1.nombre = "";
		this.arma1.ataque = 0;
		this.arma2.nombre = "";
		this.arma2.ataque = 0;
		this.casco.nombre = "";
		this.casco.defensa = 0;
		this.pecho.nombre = "";
		this.pecho.defensa = 0;
		this.brazo1.nombre = "";
		this.brazo1.defensa = 0;
		this.brazo2.nombre = "";
		this.brazo2.defensa = 0;
		this.piernas.nombre = "";
		this.piernas.defensa = 0;
		this.habilidad.nombre = "";
		this.habilidad.daño = 10;
		this.habilidad.escalado = 1;
		this.habilidad.tipo = "d";
	}
	añadirNivel(nivel) {
		this.nivel = nivel;
		document.getElementById('nivel').value = this.nivel;
	}
	añadirArmaPri(nombre, ataque) {
		this.arma1.nombre = nombre;
		this.arma1.ataque = ataque;
		document.getElementById('armaPri').value = this.arma1.nombre;
	}

	añadirArmaSec(nombre, ataque) {
		this.arma2.nombre = nombre;
		this.arma2.ataque = ataque;
		document.getElementById('armaSec').value = this.arma2.nombre;
	}

	añadirCasco(nombre, defensa) {
		this.casco.nombre = nombre;
		this.casco.defensa = defensa;
		document.getElementById('casco').value = this.casco.nombre;
	}

	añadirPecho(nombre, defensa) {
		this.pecho.nombre = nombre;
		this.pecho.defensa = defensa;
		document.getElementById('pecho').value = this.pecho.nombre;
	}

	añadirBrazoI(nombre, defensa) {
		this.brazo1.nombre = nombre;
		this.brazo1.defensa = defensa;
		document.getElementById('brazoI').value = this.brazo1.nombre;
	}

	añadirBrazoD(nombre, defensa) {
		this.brazo2.nombre = nombre;
		this.brazo2.defensa = defensa;
		document.getElementById('brazoD').value = this.brazo2.nombre;
	}

	añadirPierna(nombre, defensa) {
		this.piernas.nombre = nombre;
		this.piernas.defensa = defensa;
		document.getElementById('piernas').value = this.piernas.nombre;
	}

	añadirHabilidad(nombre, daño, escalado, tipo) {
		this.habilidad.nombre = nombre;
		this.habilidad.daño = daño;
		this.habilidad.escalado = escalado;
		this.habilidad.tipo = tipo;
		document.getElementById('habilidad').value = this.habilidad.nombre;
	}


	print() {
		document.getElementById('prueba').value = this.nivel + " ";
		document.getElementById('prueba').value += this.arma1.nombre + " ";
		document.getElementById('prueba').value += this.arma2.nombre + " ";
		document.getElementById('prueba').value += this.casco.nombre + " ";
		document.getElementById('prueba').value += this.pecho.nombre + " ";
		document.getElementById('prueba').value += this.brazo1.nombre + " ";
		document.getElementById('prueba').value += this.brazo2.nombre + " ";
		document.getElementById('prueba').value += this.piernas.nombre;
	}

	calculoAtaqueFinal() {
		this.ataque = 0;
		if (this.habilidad.tipo == "d")
			this.ataque = this.nivel * (this.habilidad.daño + (this.casco.defensa + this.pecho.defensa + this.brazo1.defensa + this.brazo2.defensa + this.piernas.defensa) * this.habilidad.escalado);
		else
			this.ataque = this.nivel * (this.habilidad.daño + (this.arma1.ataque + this.arma2.ataque) * this.habilidad.escalado);
		document.getElementById('ataqueFinal').value = this.ataque;
	}

}
var e = new Equipo();

class LeerXML {
	constructor() {

	}

	setArchivo(files) {
		var archivo = files[0];
		this.leer(archivo);
	}

	leer(archivo) {
		var tipoTexto = /text.*/;
		var parser, xmlDoc;
		var lector = new FileReader();
		lector.onload = function (evento) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(lector.result, "text/xml");

			e.añadirNivel(xmlDoc.getElementsByTagName("nivel")[0].childNodes[0].nodeValue);
			e.añadirArmaPri(xmlDoc.getElementsByTagName("primaria")[0].attributes[0].value, xmlDoc.getElementsByTagName("primaria")[0].attributes[3].value)
			e.añadirArmaSec(xmlDoc.getElementsByTagName("secundaria")[0].attributes[0].value, xmlDoc.getElementsByTagName("secundaria")[0].attributes[3].value)
			e.añadirCasco(xmlDoc.getElementsByTagName("casco")[0].attributes[0].value, xmlDoc.getElementsByTagName("casco")[0].attributes[1].value)
			e.añadirPecho(xmlDoc.getElementsByTagName("pecho")[0].attributes[0].value, xmlDoc.getElementsByTagName("pecho")[0].attributes[1].value)
			e.añadirBrazoD(xmlDoc.getElementsByTagName("brazoDer")[0].attributes[0].value, xmlDoc.getElementsByTagName("brazoDer")[0].attributes[1].value)
			e.añadirBrazoI(xmlDoc.getElementsByTagName("brazoIz")[0].attributes[0].value, xmlDoc.getElementsByTagName("brazoIz")[0].attributes[1].value)
			e.añadirPierna(xmlDoc.getElementsByTagName("piernas")[0].attributes[0].value, xmlDoc.getElementsByTagName("piernas")[0].attributes[1].value)
		}
		lector.readAsText(archivo);
	}
}
var lee = new LeerXML();


"use strict";
class Meteo {
	constructor(codigo) {
		this.url = "http://dataservice.accuweather.com/currentconditions/v1/"+codigo+"?apikey=8MnHDCuk8H1jfSa9jpGTXK92rOEfIG41";
		
	}
	cargarTodosLosDatos() {
		
		this.verJSON(this.url)
		
		$("button").attr("disabled", "disabled");
	}


	cargarDatos(url) {
		$.ajax({
			dataType: "json",
			url: url,
			method: 'GET',
			success: function (datos) {
				console.log(datos[0].WeatherText);
				$("h3").html(datos[0].WeatherText);
			},
			error: function () {
				$("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
				$("h4").remove();
				$("pre").remove();
				$("p").remove();
			}
		});
	}

	crearElemento(tipoElemento, texto, insertarAntesDe) {
		var elemento = document.createElement(tipoElemento);
		elemento.innerHTML = texto;
		$(insertarAntesDe).before(elemento);
	}
	verJSON(url, i) {
		this.crearElemento("h2", "Datos meteorologicos obtenidos de <a href='http://openweathermap.org'>OpenWeatherMap</a>", "footer");
		this.crearElemento("h4", "Datos", "footer");
		this.crearElemento("p", "", "footer");
		this.cargarDatos(url, i);

	}
}


"use strict";
class Geolocalización {
	constructor() {
		navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
		this.codigo='';
	}
	getPosicion(posicion) {
		this.longitud = posicion.coords.longitude;
		this.latitud = posicion.coords.latitude;
		this.url="http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=8MnHDCuk8H1jfSa9jpGTXK92rOEfIG41&q="+this.latitud+"%2C%20"+this.longitud;
	}
	getLongitud() {
		return this.longitud;
	}
	getLatitud() {
		return this.latitud;
	}
	verTodo(dondeVerlo) {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function (datos) {
				this.codigo=datos.Key;
				console.log(this.codigo);
				var meteo = new Meteo(this.codigo);
				meteo.cargarTodosLosDatos();
			},
			error: function () {
				$("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://dataservice.accuweather.com'>Accuweather</a>");
				$("h4").remove();
				$("pre").remove();
				$("p").remove();
			}
		});

		
		/*datos += '<p>Longitud: ' + this.longitud + ' grados</p>';
		datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
		datos += '<p>Precisión de la latitud y longitud: ' + this.precision + ' metros</p>';
		datos += '<p>Altitud: ' + this.altitude + ' metros</p>';
		datos += '<p>Precisión de la altitud: ' + this.precisionAltitud + ' metros</p>';
		datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
		datos += '<p>Velocidad: ' + this.velocidad + ' metros/segundo</p>';
		ubicacion.innerHTML = datos;*/
	}
}
var miPosicion = new Geolocalización();
