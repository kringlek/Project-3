
var path
var hurr_paths = []

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

    coordinates = path[hurricane].coords;
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
        center: [
        28, -60
        ],
        zoom: 2.5,
        layers: [street, hurricanes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

