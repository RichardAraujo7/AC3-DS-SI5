let fromLocation = document.getElementById('from')
let toLocation = document.getElementById('to')

// SETA AUTOCOMPLETE DOS ENDEREÇOS QUE ESTÃO SENDO INSERIDOS

let autocomplete1 = new google.maps.places.Autocomplete(fromLocation)
let autocomplete2 = new google.maps.places.Autocomplete(toLocation)

// SETA LAT E LONG DEFAULT
var myLatLng = { lat: -23.578114, lng: -46.642724 };

// SETA OPÇÕES DO MAPA DEFAULT
var mapOptions = {
  center: myLatLng,
  zoom: 20,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

// CRIAR MAPA
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//////////////////////// DIRECTIONS API


// CRIA UM OBJETO DirectionsService PARA USAR O MÉTODO ROUTE E OBTER UM RESULTADO PARA NOSSA REQUEST
var directionsService = new google.maps.DirectionsService();

// CRIA UM OBJETO DirectionsRenderer QUE USAREMOS PARA EXIBIR A ROTA
var directionsDisplay = new google.maps.DirectionsRenderer();

// VINCULAR O DirectionsRenderer AO MAPA
directionsDisplay.setMap(map);

// FUNÇÃO CHAMADA AO CLICAR NO BTN
function calcRoute() {
  // CRIAÇÃO DE REQUEST
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.METRIC, // METRIC = KM, IMPERIAL = MILHAS
  };

  // PASSAR A REQUEST PARA O MÉTODO ROUTE
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // OBTER DISTÂNCIA E TEMPO
      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class='alert-info'>De: " +
        document.getElementById("from").value +
        ".<br />Para: " +
        document.getElementById("to").value +
        ".<br /> Distância em milhas <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duração da viagem: <i class='fas fa-hourglass-start'></i> : " +
        result.routes[0].legs[0].duration.text +
        ".</div>";
      // MOSTRAR ROTA
      directionsDisplay.setDirections(result);
    } else {
      // DELETAR ROTA DO MAPA
      directionsDisplay.setDirections({ routes: [] });
      // CENTRALIZAR MAPA NA LAT E LONG DEFAULT
      map.setCenter(myLatLng);

      // MENSAGEM DE ERRO
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não foi possível definir a distância.</div>";
    }
  });
}