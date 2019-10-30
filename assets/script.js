function initPlacesSearch(){
    var input = document.getElementById('travelling_from');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function datetimepicker(){
    var input = document.getElementById('demo').datetimepicker({
inline:true,
})
}
