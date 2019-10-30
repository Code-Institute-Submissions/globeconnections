function initPlacesSearch(){
    var input = document.getElementById('travelling_from');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

$('#calendaricon').click(function() {
    alert('Searching for '+$('#calendar').val());
});