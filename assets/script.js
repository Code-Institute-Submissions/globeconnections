var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }

function activateTravellingFrom () {
    var input = document.getElementById('travelling_from');
    var autocomplete = new.google.maps.Autocomplete(input);
}