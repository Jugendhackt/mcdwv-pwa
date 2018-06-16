console.log("Loading webtest...");
const webtestResult = webtest();

if(!webtestResult) {
  console.error("Webtest failed! Response: " + webtestResult);
} else console.log("Webtest success!");

function updateLocation(e, map) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("Standort auf " + Math.round(radius*10)/10 + "m genau").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function initMap() {
  var data = getPointData(1)
  if(data == false) {
    alert("Data could not load!");
  }
  var mymap = L.map('mapid').setView([data.lat, data.lng], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);
  
  function onLocationError(e) {
    alert(e.message);
  }

  mymap.on('locationfound', (e) => {updateLocation(e, mymap);});
  mymap.on('locationerror', onLocationError);

  mymap.locate({setView: true, maxZoom: 16});

  setMarkersFromLocations(mymap);
}
