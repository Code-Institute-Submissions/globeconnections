function initPlacesSearch(){
    var input = document.getElementById('travelling_from');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function addDateTimePicker() {
    $('#demo').datetimepicker({
inline:true,
});
}