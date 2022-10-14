var path
var hurr_paths = []
var myMap
var hurricanes
var overlayMaps
var layerControl
var baseMaps
var leaflet_id
var cat1 = '#fee5d9';
var cat2 = '#fcae91';
var cat3 = '#fb6a4a';
var cat4 = '#de2d26';
var cat5 = '#a50f15';

// d3.json(hurr_url).then(function(data) {
//     path = data;
//     console.log(data);
//     // createMap(data)
// });

function create_path (coords) {
    line = coords;
    options = {
        color: "black"
    }
    return L.polyline(line, options);
};

function color_path (coords, hexcol) {
    line = coords;
    options = {
        color: hexcol
    }
    return L.polyline(line, options);
};

function getCatColor (wind_speed_knots) {
    if (wind_speed_knots >= 157) {
        return "#FF6060";
    }
    else if (wind_speed_knots >= 113) {
        return "#FE8F31";
    }
    else if (wind_speed_knots >= 96) {
        return "#FFC146";
    } else if (wind_speed_knots >= 83) {
        return "#FFE775";
    } else if (wind_speed_knots >= 64) {
        return "#FFFACB";
    } else {
        return "#00FAF4";
    }
};

function createMap(hurricane, category) {

    layerControl.removeLayer(hurricanes);
    myMap.removeLayer(hurricanes);
   
    hurr_paths = [];
    let col;
    if (category == 1){
        col = cat1;
    }
    else if (category == 2){
        col = cat2;
    }
    else if (category == 3){
        col = cat3;
    }
    else if (category == 4){
        col = cat4;
    }
    else if (category == 5){
        col = cat5;
    }

    coordinates = path[hurricane].coords;
    hurr_paths.push(color_path(coordinates, col));


    hurricanes = L.layerGroup(hurr_paths);

    layerControl.addOverlay(hurricanes, hurricane);


};

function createInitMap() {

    coordinates = path['Janet 1955'].coords;
    // console.log(coordinates);
    hurr_paths.push(create_path(coordinates));


    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var baseMaps = {
        "Street Map": street,
    };

    hurricanes = L.layerGroup(hurr_paths);

    overlayMaps = {
        "Janet 1955": hurricanes
    };

    // create map with layers "on" when first loaded
    myMap = L.map("map", {
        editable: true,
        center: [
        28, -60
        ],
        zoom: 2.5,
        layers: [street, hurricanes]
    });

    layerControl = L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // myMap.eachLayer(function (layer) {
    //     console.log(layer)
    // });

    // leaflet_id = 
    // console.log(hurricanes._leaflet_id)
    
};