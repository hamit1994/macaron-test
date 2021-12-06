// funtion to delimit the map with colors 
function delimiter(){
    // color zone 
    function getColor(d) {
        return d == 15 ? '#800026' :
            d == 14 ? '#BD0026' :
            d == 13 ? '#E31A1C' :
            d == 12 ? '#FC4E2A' :
            d == 11 ? '#FD8D3C' :
            d == 10 ? '#FEB24C' :
            d == 9  ? '#FED976' :
            d == 8  ? '#00A86B' :
            d == 7  ? '#586786' :
            d == 6  ? '#1000FF' :
            d == 5  ? '#F1F8FF' :
            d == 4  ? '#666D88' :
                        '#FFEDA0';
    }

    //style color zone
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.c_ar),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    L.geoJson(arrondissements, {style: style}).addTo(map);
}

//initilise map
var map = L.map('map').setView([48.8588897, 2.320041], 12);

//Add base layer from GPS cordinates
var CartoDB_PositronOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 50
}).addTo(map);

//Add maker
var marker = L.marker([48.8588897, 2.320041]).addTo(map);

//Add a Popup 
marker.bindPopup('<h4> <b>Paris</b> </h4>');

// Call the function 
delimiter()

// Get Ardt 
var arrondissements_lyr = L.geoJSON(arrondissements, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng).bindPopup(adresse_lieu);
    }}).addTo(map);

// Get location
var lieux_lyr = L.geoJSON(lieux, {
    pointToLayer: function (feature, latlng) {
        //console.log(ardt_lieu);
        return L.marker(latlng);
}}).addTo(map);


//filter 
document.getElementById('Ardt-select').addEventListener('change', function() {
    
    //console.log('You selected: ', parseInt(this.value));
    var ardt = parseInt(this.value);

    if(ardt != 0){

        // initialise
        var arrondissement = {
        "type": "FeatureCollection",
        "features": []
        }
    
        // load data 
        arrondissements.features.filter(function(d) { 
            if( d.properties.c_ar == ardt ){
                arrondissement.features.push(d);
            }
        });
    
        // initialise
        var lieu = {
            "type": "FeatureCollection",
            "features": []
        }
    
        // load data
        lieux.features.filter(function(data) { 
            var elist = data.properties.ardt_lieu;
    
            if(elist !== undefined){
                var ardt_lieu = parseInt(elist.slice(elist.length - 2));
            }
            
            if( ardt_lieu == ardt  ){
                lieu.features.push(data);
            }
            //console.log(ardt_lieu);
            //console.log(parseInt(elist.substr(elist.length - 2)));
        });

        map.eachLayer((layer) => {
            layer.remove();
        });

        // Call function to delimit map colors
        delimiter();
        
        // Get locations makers Ardts
        var lieux_lyr = L.geoJSON(lieu, {
            pointToLayer: function (feature, latlng) {
                //console.log(ardt_lieu);
                return L.marker(latlng);
        }}).addTo(map);
        
      
    }else{
        // Get locations makers Ardts 
        var lieux_lyr = L.geoJSON(lieux, {
            pointToLayer: function (feature, latlng) {
                //console.log(ardt_lieu);
                return L.marker(latlng);
        }}).addTo(map);
    }

});
