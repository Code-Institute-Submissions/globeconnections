function initPlacesSearch(){
    var input = document.getElementById('travelling_from');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function myDateTimePicker() {
  document.getElementById('demo').datetimepicker({
inline:true,
  });
};