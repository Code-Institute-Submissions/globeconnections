// add map and infowindow information 
let map, places, infoWindow;
let hostnameRegexp = new RegExp('^https?://.+?/');

function initAutocomplete() {
 map = new google.maps.Map(document.getElementById('map'), {
  center: {
   lat: 39.952583,
   lng: -75.165222
  },
  zoom: 10,
  mapTypeId: 'roadmap'
 });

 infoWindow = new google.maps.InfoWindow({
  content: document.getElementById('info-content')
 });

 places = new google.maps.places.PlacesService(map);

 // Create the search box and link it to the UI element.
 let input = document.getElementById('pac-input');
 let searchBox = new google.maps.places.SearchBox(input);

 // Bias the SearchBox results towards current map's viewport.
 map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
 });

 let markers = [];
 // Listen for the event fired when the user selects a prediction and retrieve
 // more details for that place.
 searchBox.addListener('places_changed', function() {
  let places = searchBox.getPlaces();

  if (places.length == 0) {
   return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
   google.maps.event.clearListeners(marker, 'click');
   marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  let bounds = new google.maps.LatLngBounds();
  let count = 0;
  places.forEach(function(place) {
   if (!place.geometry) {
    console.log("Returned place contains no geometry");
    return;
   }
   let icon = {
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
   };

   // Create a marker for each place.
   markers.push(new google.maps.Marker({
    map: map,
    icon: icon,
    title: place.name,
    position: place.geometry.location
   }));

   markers[count].placeResult = place;

   google.maps.event.addListener(markers[count], 'click', showInfoWindow);

   if (place.geometry.viewport) {
    // Only geocodes have viewport.
    bounds.union(place.geometry.viewport);
   } else {
    bounds.extend(place.geometry.location);
   }

   count++;
  });
  map.fitBounds(bounds);
 });
}

function showInfoWindow() {
 let marker = this;
 places.getDetails({
   placeId: marker.placeResult.place_id
  },
  function(place, status) {
   if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
   }
   infoWindow.open(map, marker);
   buildIWContent(place);
  });
}

function buildIWContent(place) {
 document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
  'src="' + place.icon + '"/>';
 document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
  '">' + place.name + '</a></b>';
 document.getElementById('iw-address').textContent = place.vicinity;

 if (place.formatted_phone_number) {
  document.getElementById('iw-phone-row').style.display = '';
  document.getElementById('iw-phone').textContent =
   place.formatted_phone_number;
 } else {
  document.getElementById('iw-phone-row').style.display = 'none';
 }

 // jquery for a new window - written by Eventyret Mentor
 $(document).ready(function() {
  $("#iw-url").click(function(e) {
   e.preventDefault();
   let href = $(this)
    .find("a")
    .attr("href");
   window.open(href, "_blank", "noopener");
  });
 });

 // Assign a five-star rating to the hotel, using a black star ('✭')
 // to indicate the rating the hotel has earned, and a white star ('✩')
 // for the rating points not achieved.
 if (place.rating) {
  let ratingHtml = '';
  for (let i = 0; i < 5; i++) {
   if (place.rating < (i + 0.5)) {
    ratingHtml += '✩';
   } else {
    ratingHtml += '✭';
   }
   document.getElementById('iw-rating-row').style.display = '';
   document.getElementById('iw-rating').innerHTML = ratingHtml;
  }
 } else {
  document.getElementById('iw-rating-row').style.display = 'none';
 }

 // The regexp isolates the first part of the URL (domain plus subdomain)
 // to give a short URL for displaying in the info window.
 if (place.website) {
  let fullUrl = place.website;
  let website = hostnameRegexp.exec(place.website);
  if (website === null) {
   website = 'http://' + place.website + '/';
   fullUrl = website;
  }
  document.getElementById('iw-website-row').style.display = '';
  document.getElementById('iw-website').textContent = website;
 } else {
  document.getElementById('iw-website-row').style.display = 'none';
 }
}