var path
var hurr_paths = []
var myMap
var hurricanes
var overlayMaps
var layerControl
var baseMaps
// var cat1 = '#fee5d9';
// var cat2 = '#fcae91';
// var cat3 = '#fb6a4a';
// var cat4 = '#de2d26';
// var cat5 = '#a50f15';
var wind_speed_knots
var colors


// if color 0 equals color 1, then add both to list and continue
// else add both to list and then create final path

function create_path (coords, colors, hurr_paths) {
    coordinates = [];
    for (let i = 0; i < colors.length; i++) {
        
        if (colors[i] == colors[i+1]) {
            coordinates.push(coords[i])
        } else {
            coordinates.push(coords[i]);
            coordinates.push(coords[i+1]);

            options = {
                color: colors[i]
            }
            hurr_paths.push(L.polyline(coordinates, options));
            coordinates = [];
        };
    }

    return hurr_paths;
};

function getCatColor (wind_speed_knots) {
    // category 5
    if (wind_speed_knots >= 157) {
        return "#FF6060";
    }
    // category 4
    else if (wind_speed_knots >= 113) {
        return "#FE8F31";
    }
    // category 3
    else if (wind_speed_knots >= 96) {
        return "#FFC146";
    }
    // category 2
    else if (wind_speed_knots >= 83) {
        return "#FFE775";
    } 
    // category 1
    else if (wind_speed_knots >= 64) {
        return "#FFFACB";
    } 
    // tropical storm or lower
    else {
        return "#00FAF4";
    }
};

function createMap(hurricane, category) {

    layerControl.removeLayer(hurricanes);
    myMap.removeLayer(hurricanes);
   
    hurr_paths = [];

    coordinates = path[hurricane].coords;

    wind_speed_knots = path['Janet 1955'].max_wind_knots;
    colors = [];
    for (let i = 0; i < wind_speed_knots.length; i++) {
        colors.push(getCatColor(wind_speed_knots[i]));
    };

    create_path(coordinates, colors, hurr_paths);

    hurricanes = L.layerGroup(hurr_paths);

    layerControl.addOverlay(hurricanes, hurricane);
};

function createInitMap() {

    coordinates = path['Janet 1955'].coords;
    wind_speed_knots = path['Janet 1955'].max_wind_knots;
    colors = [];

    for (let i = 0; i < wind_speed_knots.length; i++) {
        colors.push(getCatColor(wind_speed_knots[i]));
    };

    create_path(coordinates, colors, hurr_paths);


    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    baseMaps = {
        "Street Map": street,
    };

    hurricanes = L.layerGroup(hurr_paths);

    overlayMaps = {
        "Janet 1955": hurricanes
    };

    // create map with layers "on" when first loaded
    myMap = L.map('map', {
        editable: true,
        center: [
        28, -60
        ],
        zoom: 2.5,
        layers: [street]
        // layers: [street, hurricanes],
        // would love to make this ^ work
    });

    console.log(myMap);

    layerControl = L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({position: "bottomright"});
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += '<span>Category 5</span><i style="background: #FF6060"></i><br>';
        div.innerHTML += '<span>Category 4</span><i style="background: #FE8F31"></i><br>';
        div.innerHTML += '<span>Category 3</span><i style="background: #FFC146"></i><br>';
        div.innerHTML += '<span>Category 2</span><i style="background: #FFE775"></i><br>';
        div.innerHTML += '<span>Category 1</span><i style="background: #FFFACB"></i><br>';
        div.innerHTML += '<span>Tropical Storm or Less</span><i style="background: #00FAF4"></i><br>';
        return div;
    };

    legend.addTo(myMap);
    
};