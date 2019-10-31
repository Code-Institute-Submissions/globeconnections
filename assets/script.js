function initPlacesSearch(){
    var input = document.getElementById('travelling_from');
    var input2 = document.getElementById('travelling_to');
    var input3 = document.getElementById('restaurant_search');
    var input4 = document.getElementById('attraction_search');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var autocomplete2 = new google.maps.places.Autocomplete(input2);
    var autocomplete3 = new google.maps.places.Autocomplete(input3);
    var autocomplete4 = new google.maps.places.Autocomplete(input4);
}

jQuery(function($) {
        $("#datepicker").datetimepicker();
    });

jQuery(function($) {
        $("#datepicker2").datetimepicker();
    });

