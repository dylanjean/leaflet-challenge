// // Create a map object
// function createMap(geoData){
    
    
//     // Adding a tile layer (the background map image) to our map
//     // We use the addTo method to add objects to our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//     }).addTo(myMap);

//     var baseMaps = {
//         "Light Map": lightmap
//     }

//     var overlayMaps = {
//         "Earthquakes": earthquakes
//     }

//     var myMap = L.map("map", {
//         center: [45.52, -122.67],
//         zoom: 13,
//         layers: [lightmap, earthquakes]
//     });

//     L.control.layers(baseMaps, overlayMaps).addTo(myMap)
// };


// function createMarkers(response){
//     var quakes = response.features
//     var quakeMarkers = []
//     quakes.forEach(quake => {
//       var loc = L.marker([quake.geometry[0], quake.geometry[1]])
//       quakeMarkers.push(loc) 
//     })
//     quakeloc = L.layerGroup(quakeMarkers)
//       createMap(quakeloc)
//     console.log(quakeMarkers)
//   }
// =========================================================================================
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 6,
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    function createCircleMarker( feature, latlng ){
        // Change the values of these options to change the symbol's appearance
        var mag = feature.properties.mag
        var sig = feature.properties.sig
        var sColor = 'red'
        if (sig > 90){
            sColor = 'rgb(255, 0, 0)'
        }else if (sig <= 90 && sig  >= 70){
            sColor = 'rgb(255, 102, 0)'
        }else if (sig <= 69 && sig  >= 50){
            sColor = 'rgb(255, 153, 51)'
        }else if (sig <= 49 && sig  >= 30){
            sColor = 'rgb(255, 204, 0)'
        }else if (sig <= 29 && sig  >= 10){
            sColor = 'rgb(204, 255, 102)'
        }else {
            sColor = 'rgb(64, 255, 0)'
        }
        let options = {
          radius: (mag * 10),
          fillColor: sColor,
          color: "black",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }
        return L.circleMarker( latlng, options ).bindPopup(`<h1>${feature.properties.title}</h1><h2>Magnitude: ${mag}</h2>`);
      }

d3.json(url, function (data){
    L.geoJson(data,{
        pointToLayer: createCircleMarker // Call the function createCircleMarker to create the symbol for this layer
      }).addTo(myMap)
})