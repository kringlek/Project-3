const url = './../static/js/test.json'
const caturl = './../static/js/category.json'
const hurr_url = './../static/js/hurricane_path.json'

var catdata
var information
d3.json(caturl).then(function(data){
    catdata = data;
    console.log(data)
});

d3.json(hurr_url).then(function(data) {
    path = data;
    console.log(data);
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
d3.json(url).then(function(data){
    information = data;
    test = information.Name;
    test2 = Object.keys(test);
    console.log(information);
    names = information.Name_year;
    years = information.Year;
    // for (let i =0; i < test2.length; i++){
    //     console.log(test[i]);
    // }
    function init(){
        let inital = information;
        createInitMap();
        startInfo(inital);
        plotter(information);
    };
    // demoInfo(data);
    let nameArr = Object.values(names);
    let filterednames = [...new Set(nameArr)];
    // let yearArr = Object.values(years);
    var selctor = document.getElementById('selDataset');
    for (let i=0; i< filterednames.length; i++){
        let option = document.createElement('option');
        option.innerHTML=`<option value='${filterednames[i]}'>${filterednames[i]}</option>`
        selctor.appendChild(option);
    };
    d3.selectAll('#selDataset').on('change', allTogether)
    function allTogether(){
        let dropdownMenu = d3.select('#selDataset');
        let dataset = dropdownMenu.property('value');
        let id = getKeyByValue(information.Name_year, dataset);
        // console.log(id);
        // console.log(information.Name_year[id]);
        // plotter(numerical[0]);
        demoInfo(information, id);
        createMap(information.Name_year[id]);
    }
    init();
});