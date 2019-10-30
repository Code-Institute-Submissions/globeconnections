var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.508976, lng: -0.128266},
          zoom: 8
        });
      }

function activateTravellingFrom () {
    var input = document.getElementById('travelling_from');
    var autocomplete = new google.maps.Autocomplete(input);
}