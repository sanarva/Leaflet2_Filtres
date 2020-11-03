var map = L.map("mapid").on("load", onMapLoad).setView([41.4, 2.206], 9);
//map.locate({setView: true, maxZoom: 17});

var tiles = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {}
).addTo(map);

//En el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];

//Declaro una variable donde tendré todas las categorías de los restaurantes
let categories = ["Todos"];

function onMapLoad() {
  console.log("Mapa cargado");

  //FASE 3.1

  //1) Relleno el data_markers con una petición a la api

  //Con este código estoy accediendo a la API para recoger en el campo "data" el array con los 10 objetos (restaurantes) que he creado
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost/mapa/api/apiRestaurants.php",
      type: "get",
      dataType: "json",
      //Si la llamada finaliza con éxito, en "data" obtendremos el array con todos los objetos (restaurantes) creados. A este "data" le podemos llamar como queramos
      success: function (data) {
        data_markers = data;
        console.log(data_markers);

        //2) Añado de forma dinámica en el select los posibles tipos de restaurantes
        let categoriesByRestaurant = [];
        let categoryRepeated = false;
        //Voy recorriendo cada uno de los restaurantes para guardar el tipo de cocina en el array que pintaremos en el selector
        data_markers.forEach(function (value) {
          categoriesByRestaurant = value.kind_food.split(",");

          for (category_restaurant of categoriesByRestaurant) {
            categoryRepeated = false;
            for (category_select of categories) {
              if (category_restaurant == category_select) {
                categoryRepeated = true;
              }
            }
            //Si alguna de las categorías de clase de cocina del restaurante X no está en el array del selector, la añadimos
            if (categoryRepeated == false) {
              categories.push(category_restaurant);
            }
          }
        });

        //Pintamos todas las categorías de clase de cocina en el selector
        for (category of categories) {
          $("#kind_food_selector").append("<option>" + category + "</option>");
        }

        console.log(categories);

        //3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
        //Llamaremos a la función render_to_map (que crearemos más abajo), para mostrar todos los restaurantes
        render_to_map(data_markers, "Todos");
      },

      //Si hay error, llamamos a la función de CALLBACK para que nos aporte información por consola
      error: function (xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      },
    });
  });
}

//Con esta función recupero la categoría (tipo de cocina) del selector para pasársela a la función render_to_map
$("#kind_food_selector").on("change", function () {
  //console.log(this.value);
  render_to_map(data_markers, this.value);
});

function render_to_map(data_markers, filter) {
  //FASE 3.2
  //1) Limpio todos los marcadores
  //Usamos esta función porque estamos trabando con un cluster. Si sólo trabajáramos con marcadores, podríamos poner map.removeLayer(markers)
  markers.clearLayers();

  //2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agrego al mapa
  //Hago un bucle de toda la información para montar el marker con los datos de lat y long [lat, long]
  data_markers.forEach(function (value) {
    if (filter == "Todos"){
      //Llamo a la función que creará el marcador, añadirá su etiqueta y añadirá el marcador al cluster
      createMarker(value);
    } else {
      //Con la función indexOf buscaré en el string de clases de comida, la palabra que nos llegue en el filtro y, 
      //si la encuentra (!=1), mostraremos el marcador en el mapa
      if (value.kind_food.indexOf(filter)!= -1) {
        //Llamo a la función que creará el marcador, añadirá su etiqueta y añadirá el marcador al cluster
        createMarker(value); 
      }    
    }
  });

  //Añado el cluster con los marcadores correspondientes al mapa
  map.addLayer(markers);
}


function createMarker(value) {
  //Creo el marcador
  let marker = L.marker([value.latitude, value.longitude]);
  //Añado la etiqueta al marcador
  let popup = L.popup(); //Declaro el popup
  popup.setContent(
    "<strong>" +
      value.name +
      "</strong> <br>" +
      value.address +
      "<br> Cocina: " +
      value.kind_food
  ); //Genero el contenido que tendrá la etiqueta
  marker.bindPopup(popup); //Le enchufo la etiqueta al marcador
  //Añado el marcador al cluster
  markers.addLayer(marker);
}
