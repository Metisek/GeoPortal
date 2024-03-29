// Ta sekcja odczytuje dane JSON z luftdafen, a następnie przypisuje je do zmiennej "czujniki"

var luftdafen = 'https://data.sensor.community/airrohr/v1/filter/area=49.782262,22.772942,20';
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", luftdafen, false );
xmlHttp.send(null);
let czujniki = JSON.parse(xmlHttp.responseText);

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
        return {color: '#00000000',
        fillColor: '#ff66cc',
        fillOpacity: 0.1};
    }
}).addTo(mymap);

L.geoJSON(podkarpacie, {
    style: function(feature) {
        return {color: '#ff9955',
        fillColor: '#cc00cc',
        fillOpacity: 0.02};
    }
}).addTo(mymap);

//

// Sekcja Mateusza

//


function drawmarker(czuj, mapa){

    let temp = "";
    window.grupaX = L.layerGroup();
    let wyswietl = [];
    var longhis = '';
    var lathis = '';
    let dictDane = {'P1':'Smog PM10: ','P2':'Smog PM2.5: ','temperature':'Temperatura: ','humidity':'Wilogtość: ','pressure':'Ciśnienie: '};
    for (var i = 0; i < czuj.length; i++){
        var longitude = czuj[i]['location']['longitude'];
        var latitude =  czuj[i]['location']['latitude'];
        let dane = czuj[i]['sensordatavalues'];
        if (latitude == lathis && longitude == longhis){
            colorSet = '#00000000'
            for (var j = 0; j < dane.length; j++){
                if (dane[j]['value_type'] in dictDane){
                    var key = dane[j]['value_type'];
                    switch(key)
                    {
                        case 'P1':
                            temp = Math.round((dane[j]['value']/50)*100)
                            wyswietl.push("&#8759; "+ dictDane[key] + temp + '% normy');
                            if (mapa == "P1"){
                                if (temp < 50) {
                                    colorSet = '#00ff00'
                                }
                                else if(temp < 100){
                                    colorSet = '#99ff33'
                                }
                                else if(temp < 175){
                                    colorSet = '#ffff00'
                                }
                                else if(temp < 300){
                                    colorSet = '#ff6600'
                                }
                                else{
                                    colorSet = '#ff0000'
                                };
                            }
                            break;
                        case 'P2':
                            temp =  Math.round((dane[j]['value']/20)*100);
                            wyswietl.push("  &#8758; "+ dictDane[key] + temp + '% normy');
                            if (mapa == 'P2'){
                                if (temp < 50) {
                                    colorSet = '#00ff00'
                                }
                                else if(temp < 100){
                                    colorSet = '#99ff33'
                                }
                                else if(temp < 175){
                                    colorSet = '#ffff00'
                                }
                                else if(temp < 300){
                                    colorSet = '#ff6600'
                                }
                                else{
                                    colorSet = '#ff0000'
                                };
                            }
                            break;

                        case 'temperature':
                            temp =  Math.round(dane[j]['value']);
                            wyswietl.push('&#9728; '+dictDane[key]+ temp +"&#176;C");
                            if (mapa == 'temperature'){
                                if (temp < -20){
                                    colorSet = '#0000cc'
                                }
                                else if (temp < -10){
                                    colorSet = '#3366ff'
                                }
                                else if (temp < 0){
                                    colorSet = '#ccccff'
                                }
                                else if (temp < 10){
                                    colorSet = '#cfff77'
                                }
                                else if(temp < 20){
                                    colorSet = '#66ff33'
                                }
                                else if(temp < 30){
                                    colorSet = '#ccf022'
                                }
                                else if(temp < 40){
                                    colorSet = '#ffcc00'
                                }
                                else{
                                    colorSet = '#ff9900'
                                };
                            };
                            break;
                        case 'humidity':
                            temp =  Math.round(dane[j]['value']);
                            wyswietl.push('&#8779; '+dictDane[key] + temp + '%');
                            if (mapa == 'humidity'){
                                if (temp < 20){
                                    colorSet = '#ffffcc'
                                }
                                else if (temp < 35){
                                    colorSet = '#ccccff'
                                }
                                else if (temp < 50){
                                    colorSet = '#6699FF'
                                }
                                else if (temp < 70){
                                    colorSet = '#0066ff'
                                }
                                else if (temp < 85){
                                    colorSet = '#0033cc'
                                }
                                else{
                                    colorSet = '#000099'
                                };
                            }
                            break;
                        case 'pressure':
                            temp = Math.round(dane[j]['value']/10)/10;
                            wyswietl.push('&#9732; '+dictDane[key] + temp + 'hPa');
                            if (mapa == 'pressure'){
                                if(temp < 970){
                                    colorSet = '#0000ff'
                                }
                                else if(temp < 980){
                                    colorSet = '#0066ff'
                                }
                                else if(temp < 995){
                                    colorSet = '#66ccff'   
                                }
                                else if(temp < 1005){
                                    colorSet = '#ffffff'
                                }
                                else if(temp < 1015){
                                    colorSet = '#ff9999'
                                }
                                else if (temp < 1025){
                                    colorSet = '#ff5050'
                                }
                                else{
                                    colorSet = '#ff0000'
                                };
                            };
                        default:
                            break;
                    };
                };
            };
        }
        else{
            var longhis = czuj[i]['location']['longitude'];
            var lathis = czuj[i]['location']['latitude'];
            wyswietl = []
            colorSet = '#00000000'
            for (var j = 0; j < dane.length; j++){
                if (dane[j]['value_type'] in dictDane){
                    var key = dane[j]['value_type'];
                    switch(key)
                    {
                        case 'P1':
                            temp = Math.round((dane[j]['value']/50)*100)
                            wyswietl.push("&#8759; "+dictDane[key] + temp + '% normy');
                            if (mapa == "P1"){
                                if (temp < 50) {
                                    colorSet = '#00ff00'
                                }
                                else if(temp < 100){
                                    colorSet = '#99ff33'
                                }
                                else if(temp < 175){
                                    colorSet = '#ffff00'
                                }
                                else if(temp < 300){
                                    colorSet = '#ff6600'
                                }
                                else{
                                    colorSet = '#ff0000'
                                };
                            };
                            break;
                        case 'P2':
                            temp =  Math.round((dane[j]['value']/20)*100);
                            wyswietl.push("&#8758; "+ dictDane[key] + temp + '% normy');
                            if (mapa == "P2"){
                                if (temp < 50) {
                                    colorSet = '#00ff00'
                                }
                                else if(temp < 100){
                                    colorSet = '#99ff33'
                                }
                                else if(temp < 175){
                                    colorSet = '#ffff00'
                                }
                                else if(temp < 300){
                                    colorSet = '#ff6600'
                                }
                                else{
                                    colorSet = '#ff0000'
                                };
                            }
                            break;

                        case 'temperature':
                            temp =  Math.round(dane[j]['value']);
                            wyswietl.push('&#9728; '+dictDane[key]+ temp +"&#176;C");
                            if (mapa == "temperature"){
                                if (temp < -20){
                                    colorSet = '#0000cc'
                                }
                                else if (temp < -10){
                                    colorSet = '#3366ff'
                                }
                                else if (temp < 0){
                                    colorSet = '#ccccff'
                                }
                                else if (temp < 10){
                                    colorSet = '#cfff77'
                                }
                                else if(temp < 20){
                                    colorSet = '#66ff33'
                                }
                                else if(temp < 30){
                                    colorSet = '#ccf022'
                                }
                                else if(temp < 40){
                                    colorSet = '#ffcc00'
                                }
                                else{
                                    colorSet = '#ff9900'
                                };
                            }
                            break;
                        case 'humidity':
                            temp =  Math.round(dane[j]['value']);
                            wyswietl.push('&#8779; '+dictDane[key] + temp + '%');
                            if (mapa == "humidity"){
                                if (temp < 20){
                                    colorSet = '#ffffcc'
                                }
                                else if (temp < 35){
                                    colorSet = '#ccccff'
                                }
                                else if (temp < 50){
                                    colorSet = '#6699FF'
                                }
                                else if (temp < 70){
                                    colorSet = '#0066ff'
                                }
                                else if (temp < 85){
                                    colorSet = '#0033cc'
                                }
                                else{
                                    colorSet = '#000099'
                                };
                            };
                            break;
                        case 'pressure':
                            temp = Math.round(dane[j]['value']/10)/10;
                            wyswietl.push('&#9732; '+dictDane[key] + temp + 'hPa');
                            if (mapa == 'pressure'){
                                if(temp < 970){
                                    colorSet = '#0000ff'
                                }
                                else if(temp < 980){
                                    colorSet = '#0066ff'
                                }
                                else if(temp < 995){
                                    colorSet = '#66ccff'   
                                }
                                else if(temp < 1005){
                                    colorSet = '#ffffff'
                                }
                                else if(temp < 1015){
                                    colorSet = '#ff9999'
                                }
                                else if (temp < 1025){
                                    colorSet = '#ff5050'
                                }
                                else{
                                    colorSet = '#ff0000'
                                };
                            }
                        default:
                            break;
                    };
                };
            };
        };
        if (colorSet == '#00000000'){
            continue;
        } 
        var punkt = "<p class='marker'>"
        for (var k = 0; k < wyswietl.length; k++){
            punkt = punkt +" "+ wyswietl[k] + "<br>"
        }
        punkt = punkt + "</p>"
        
        circle = L.circle([latitude, longitude], 120,{
            color: colorSet,
            fillColor: colorSet,
            fillOpacity: 0.1,
        }).bindPopup(punkt)
        .on('mousemove', function(e){
            e.target.setRadius(1500*(2/mymap.getZoom()))
        })
        .on('mouseout', function(e){
            e.target.setRadius(120)
        });
        grupaX.addLayer(circle)
    }
    grupaX.addTo(mymap)
};

drawmarker(czujniki, "P1")

function mapChange(mapIde){
    window.grupaX.remove()
    drawmarker(czujniki, mapIde)
    legendChange(mapIde)
}

function legendShow() {
    var x = document.getElementById("myLinks");
    console.log(x.style.height)
    if (x.style.height == "") {
      x.style.height = "200px";
    } else {
      x.style.height = "";
    };
  };

function legendChange(mapa){
    switch(mapa){
        case "P1":

            document.getElementById('legendTable').innerHTML = '<tr><td id="legendColor1"></td><td>&#60;50%</td></tr>\
            <tr><td id="legendColor2"></td><td>&#60;100%</td></tr>\
            <tr><td id="legendColor3"></td><td>&#60;175%</td></tr>\
            <tr><td id="legendColor4"></td><td>&#60;300%</td></tr>\
            <tr><td id="legendColor5"></td><td>&#62;300%</td></tr>'

            document.getElementById("legendColor1").style.backgroundColor = '#00ff00';
            document.getElementById("legendColor2").style.backgroundColor = '#99ff33';
            document.getElementById("legendColor3").style.backgroundColor = '#ffff00';
            document.getElementById("legendColor4").style.backgroundColor = '#ff6600';
            document.getElementById("legendColor5").style.backgroundColor = '#ff0000';
            break;

        case "P2":

            document.getElementById('legendTable').innerHTML = '<tr><td id="legendColor1"></td><td>&#60;50%</td></tr>\
            <tr><td id="legendColor2"></td><td>&#60;100%</td></tr>\
            <tr><td id="legendColor3"></td><td>&#60;175%</td></tr>\
            <tr><td id="legendColor4"></td><td>&#60;300%</td></tr>\
            <tr><td id="legendColor5"></td><td>&#62;300%</td></tr>'

            document.getElementById("legendColor1").style.backgroundColor = '#00ff00';
            document.getElementById("legendColor2").style.backgroundColor = '#99ff33';
            document.getElementById("legendColor3").style.backgroundColor = '#ffff00';
            document.getElementById("legendColor4").style.backgroundColor = '#ff6600';
            document.getElementById("legendColor5").style.backgroundColor = '#ff0000';
            break;

        case "temperature":

            document.getElementById('legendTable').innerHTML = '<tr><td id="legendColor1"></td><td>&#60; -20&#176;C</td></tr>\
            <tr><td id="legendColor2"></td><td>&#60; -10&#176;C</td></tr>\
            <tr><td id="legendColor3"></td><td>&#60; 0&#176;C</td></tr>\
            <tr><td id="legendColor4"></td><td>&#60; 10&#176;C</td></tr>\
            <tr><td id="legendColor5"></td><td>&#60; 20&#176;C</td></tr>\
            <tr><td id="legendColor6"></td><td>&#60; 30&#176;C</td></tr>\
            <tr><td id="legendColor7"></td><td>&#60; 40&#176;C</td></tr>\
            <tr><td id="legendColor8"></td><td>&#62; 40&#176;C</td></tr>'

            document.getElementById("legendColor1").style.backgroundColor = '#00cccc';
            document.getElementById("legendColor2").style.backgroundColor = '#3366ff';
            document.getElementById("legendColor3").style.backgroundColor = '#ccccff';
            document.getElementById("legendColor4").style.backgroundColor = '#cfff77';
            document.getElementById("legendColor5").style.backgroundColor = '#66ff33';
            document.getElementById("legendColor6").style.backgroundColor = '#ccf022';
            document.getElementById("legendColor7").style.backgroundColor = '#ffcc00';
            document.getElementById("legendColor8").style.backgroundColor = '#ff9900';
            break;

        case "humidity":

            document.getElementById('legendTable').innerHTML = '<tr><td id="legendColor1"></td><td>&#60;20%</td></tr>\
            <tr><td id="legendColor2"></td><td>&#60;35%</td></tr>\
            <tr><td id="legendColor3"></td><td>&#60;50%</td></tr>\
            <tr><td id="legendColor4"></td><td>&#60;70%</td></tr>\
            <tr><td id="legendColor5"></td><td>&#60;85%</td></tr>\
            <tr><td id="legendColor6"></td><td>&#62;85%</td></tr>'

            document.getElementById("legendColor1").style.backgroundColor = '#ffffcc';
            document.getElementById("legendColor2").style.backgroundColor = '#ccccff';
            document.getElementById("legendColor3").style.backgroundColor = '#6699ff';
            document.getElementById("legendColor4").style.backgroundColor = '#0066ff';
            document.getElementById("legendColor5").style.backgroundColor = '#0033cc';
            document.getElementById("legendColor6").style.backgroundColor = '#000099';
            break;

        case "pressure":

            document.getElementById('legendTable').innerHTML = '<tr><td id="legendColor1"></td><td>&#60;970hPa</td></tr>\
            <tr><td id="legendColor2"></td><td>&#60;980hPa</td></tr>\
            <tr><td id="legendColor3"></td><td>&#60;995hPa</td></tr>\
            <tr><td id="legendColor4"></td><td>&#60;1005hPa</td></tr>\
            <tr><td id="legendColor5"></td><td>&#60;1015hPa</td></tr>\
            <tr><td id="legendColor6"></td><td>&#60;1025hPa</td></tr>\
            <tr><td id="legendColor7"></td><td>&#62;1025hPa</td></tr>'

            document.getElementById("legendColor1").style.backgroundColor = '#0000ff';
            document.getElementById("legendColor2").style.backgroundColor = '#0066ff';
            document.getElementById("legendColor3").style.backgroundColor = '#66ccff';
            document.getElementById("legendColor4").style.backgroundColor = '#ffffff';
            document.getElementById("legendColor5").style.backgroundColor = '#ff9999';
            document.getElementById("legendColor6").style.backgroundColor = '#ff5050';
            document.getElementById("legendColor7").style.backgroundColor = '#ff0000';
            break;
    };
};

legendChange('P1')

// myRequest.onload = function(){
//     let earthquakes = JSON.parse(myRequest.responseText);
//     window.earthquakes = L.geoJSON(earthquakes, {
//         onEachFeature: function(feature, layer){
//             layer.bindPopup('<p><b>Earthquake location: </b>'+ feature.properties.place +
//             '</p><p><b> Magnitude: </b>' + feature.properties.mag+'</p>')
//         }
//     }).addTo(mymap) 
// }
// myRequest.send()

// Część nieistotna, jest to skopiowany kod z innych zajęć, można usunąć/zmienić



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
myRequest.send();