//initilise map
var map = L.map('map').setView([48.8588897, 2.320041], 10);

//Add base layer from GPS cordinates
var CartoDB_PositronOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

//Add maker
var marker = L.marker([48.8588897, 2.320041]).addTo(map);

//Add a Popup 
marker.bindPopup('<h4> <b>Paris</b> </h4>');