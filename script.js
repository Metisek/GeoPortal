// Ta sekcja odczytuje dane JSON z luftdafen, a następnie przypisuje je do zmiennej "czujniki"

var luftdafen = 'https://api.luftdaten.info/static/v1/data.json';
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", luftdafen, false );
xmlHttp.send(null);
let czujniki = JSON.parse(xmlHttp.responseText);
console.log(czujniki)

// Sekcja określa granice mapy
let sw = L.latLng(49.69600468606782, 22.40746406532194);
let ne = L.latLng(49.85719699165818, 23.00415811475734);
let bounds = L.latLngBounds(sw, ne);

// Sekcja tworzy 
var mymap = L.map('mapid',{
    maxBounds: bounds,
    minZoom: 11,
    maxZoom: 18
}).setView([49.780145, 22.786583], 13);

// Podkład topograficzny, pozostałość skopiowanej funkcji z moich notatek, może się przydać do trybu jasnego

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(mymap);

// Ciemny podkład topograficzny

// Tutaj funkcja się kończy, pozostałe dane to dane śmieciowe, przykłady z notatek z zajęć. Zostawiam bo może się przydać
// Najważniejsze będzie odpowiednie odczytanie JSON'ów oraz przypisanie ich do mapy

var myIcon = L.icon({
    iconUrl: 'tower.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function usunPowiadomienie(){
    document.getElementById('oknoInformacyjne').innerHTML="";
    document.getElementById("oknoInformacyjne").classList.remove('powiadomienie');
};

function openNav() {
    document.getElementById("panelBoczny").style.width = "280px";
    document.getElementById("main").style.marginLeft = "280px";
    document.getElementById("panelBoczny").style.border = "4px solid white";
};
  
function closeNav() {
    document.getElementById("panelBoczny").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    setTimeout(closeNavCont, 250)
};

function closeNavCont(){
    document.getElementById("panelBoczny").style.border = "0px";
}

function checkChild(identity){
    if (document.getElementById(identity).style.height == ""){
        document.getElementById(identity).style.height = "auto";
    }
    else{
        document.getElementById(identity).style.height = ""; 
    };
};

// Zmiana układu topograficznego (tryb ciemny)

function darkMode(value){
    if(value == 0){
        var stylTopograficzny = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
        }).addTo(mymap);
        document.getElementById("menuHam").style.color = '';
    }
    else{
        var stylTopograficzny = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
        }).addTo(mymap);
        document.getElementById("menuHam").style.color = '#000000'
    };
};

darkMode(0)

L.geoJSON(przemysl, {
    style: function(feature) {
        return {color: '#99ff99',
        fillColor: '#ffffcc',
        fillOpacity: 0.1};
    }
}).addTo(mymap);

L.geoJSON(podkarpacie, {
    style: function(feature) {
        return {color: '#ff9955',
        fillColor: '#ff00cc',
        fillOpacity: 0.01};
    }
}).addTo(mymap);

//

// Sekcja Mateusza

//

function drawmarker(czuj){
    for (var i = 0; i < 5; i++){
        console.log(czujniki[i])
        // var longitude = czuj[i]['location']['longitude'];
        // var latitude =  czuj[i]['location']['latitude'];
        // L.marker([latitude, longitude])
        // .bindPopup('hello')
        // .addTo(map);  
    }   
  
};

drawmarker(czujniki)

myRequest.onload = function(){
    let earthquakes = JSON.parse(myRequest.responseText);
    window.earthquakes = L.geoJSON(earthquakes, {
        onEachFeature: function(feature, layer){
            layer.bindPopup('<p><b>Earthquake location: </b>'+ feature.properties.place +
            '</p><p><b> Magnitude: </b>' + feature.properties.mag+'</p>')
        }
    }).addTo(mymap) 
}
myRequest.send()


// Część nieistotna, jest to skopiowany kod z innych zajęć, można usunąć/zmienić

L.marker([49.780145, 22.786583]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

L.marker([49.781264, 22.835083], {icon: myIcon}).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
L.circle([49.770622, 22.752686], 30, {
    color: '#cc00cc',
    fillColor: "#FF00FF",
    fillOpacity: 0.5,
}).addTo(mymap)

    L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle.");

L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap).bindPopup("I am a polygon.");



var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

let myRequest = new XMLHttpRequest();
myRequest.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')

myRequest.onload = function(){
    let earthquakes = JSON.parse(myRequest.responseText);
    window.earthquakes = L.geoJSON(earthquakes, {
        onEachFeature: function(feature, layer){
            layer.bindPopup('<p><b>Earthquake location: </b>'+ feature.properties.place +
            '</p><p><b> Magnitude: </b>' + feature.properties.mag+'</p>')
        }
    }).addTo(mymap) 
}
myRequest.send()