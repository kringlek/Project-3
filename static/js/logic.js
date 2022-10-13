var path
var hurr_paths = []
var myMap
var hurricanes
var overlayMaps
var layerControl
var baseMaps

// d3.json(hurr_url).then(function(data) {
//     path = data;
//     console.log(data);
//     // createMap(data)
// });

// function createMap(hurricanes) {
function createMap(hurricane) {

    function create_path (coords) {
        line = coords;
        options = {
            color: "black"
        }
        return L.polyline(line, options);
    };

    // hurr_names = Object.keys(hurricanes);
    // // console.log("working");
    // for (var i = 0; i < hurr_names.length; i++) {
    //     coordinates = hurricanes[hurr_names[i]].coords;
    //     hurr_paths.push(create_path(coordinates));
    // };

    hurr_paths = [];

    coordinates = path[hurricane].coords;
    hurr_paths.push(create_path(coordinates));

    // layerControl.removeLayer(hurricanes);
    // myMap.removeLayer("Hurricanes");


    // var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // });

    // var baseMaps = {
    //     "Street Map": street,
    // };
    // layerControl.removeLayer(overlayMaps);

    hurricanes = L.layerGroup(hurr_paths);

    layerControl.addOverlay(hurricanes, "Hurricanes");

    // overlayMaps = {
    //     Hurricanes: hurricanes
    // };

    // L.control.layers(baseMaps, overlayMaps, {
    //     collapsed: false
    // }).addTo(myMap);

    // myMap.addLayer(overlayMaps);

    // create map with layers "on" when first loaded
    // var myMap = L.map("map", {
    //     center: [
    //     28, -60
    //     ],
    //     zoom: 2.5,
    //     layers: [street, hurricanes]
    // });

    // L.control.layers(baseMaps, overlayMaps, {
    //     collapsed: false
    // }).addTo(myMap);
};

function createInitMap() {
    function create_path (coords) {
        line = coords;
        options = {
            color: "black"
        }
        return L.polyline(line, options);
    };

    coordinates = path['Janet 1955'].coords;
    console.log(coordinates);
    hurr_paths.push(create_path(coordinates));


    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var baseMaps = {
        "Street Map": street,
    };

    var hurricanes = L.layerGroup(hurr_paths);

    var overlayMaps = {
        Hurricanes: hurricanes
    };

    // create map with layers "on" when first loaded
    var myMap = L.map("map", {
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
}