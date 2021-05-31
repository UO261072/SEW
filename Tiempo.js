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
                this.crearElemento("h4",datos[0].WeatherText, "footer");
				
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
        $(".meteo").before(elemento);
		
	}
	verJSON(url, i) {
		//this.crearElemento("h4", "Datos", "footer");
		//this.crearElemento("p", "", "footer");
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