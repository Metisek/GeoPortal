var luftdafen = 'http://api.luftdaten.info/static/v1/data.json';
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", luftdafen, false ); // false for synchronous request
xmlHttp.send(null);

let czujniki = xmlHttp.responseText;

var mymap = L.map('mapid').setView([49.780145, 22.786583], 13);
