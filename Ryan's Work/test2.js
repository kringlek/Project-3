function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
};
function demoInfo(data2, key) {
    var keys = Object.keys(data2);
    var values = Object.values(data2);
    var ol = document.getElementById('metalist');
    var listy = document.getElementById('metalist');
    listy.innerHTML = '';
    for (let i = 0; i < keys.length -1; i++) {
        let li = document.createElement('li');
        li.innerText=`${keys[i]}: ${values[i][key]}`;
        // console.log(values[i][0]);
        ol.appendChild(li);
    }};

function startInfo(data3) {
    // console.log(data3);
    var keys = Object.keys(data3);
    var values = Object.values(data3);
    var ol = document.getElementById('metalist');
    var listy = document.getElementById('metalist');
    listy.innerHTML = '';
    for (let i = 0; i < keys.length -1; i++) {
        let li = document.createElement('li');
        li.innerText=`${keys[i]}: ${values[i][0]}`;
        // console.log(values[i][0]);
        ol.appendChild(li);
    }};

function plotter(data) {
    var wind = Object.values(data['Wind Speed (mph)']);
    var damages = Object.values(data['Damages ($)']);
    var pressure = Object.values(data['Pressure (hPa)']);
    var deaths = Object.values(data['Deaths']);
    var labels = Object.values(data['Name_year']);
    var months = Object.values(data['Month']);
    var counts = [];
    counts.push(getOccurrence(months, 'June'));
    counts.push(getOccurrence(months, 'July'));
    counts.push(getOccurrence(months, 'August'));
    counts.push(getOccurrence(months, 'September'));
    counts.push(getOccurrence(months, 'October'));
    console.log(counts);
    let trace1 = {
        x: wind,
        y: damages,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout1 = {
        title: 'Wind Speed (mph) vs. Damages($)'
    }
    let traceData1 = [trace1];
    Plotly.newPlot('scatter1', traceData1, layout1);
    let trace2 = {
        x: wind,
        y: deaths,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout2 = {
        title: 'Wind Speed (mph) vs. Deaths'
    }
    let traceData2 = [trace2];
    Plotly.newPlot('scatter2', traceData2, layout2);
    let trace3 = {
        x: pressure,
        y: damages,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout3 = {
        title: 'Pressure (hPa) vs. Damages($)'
    }
    let traceData3 = [trace3];
    Plotly.newPlot('scatter3', traceData3, layout3);
    let trace4 = {
        x: pressure,
        y: deaths,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout4 = {
        title: 'Pressure (hPa) vs. Deaths'
    }
    let traceData4 = [trace4];
    Plotly.newPlot('scatter4', traceData4, layout4);
    let trace5 = {
        x: ['June', 'July', 'August', 'September', 'October'],
        y: counts,
        type: 'bar'
    };
    let layout5 = {
        title: 'Most Common Months for Hurricanes'
    }
    let traceData5 = [trace5];
    Plotly.newPlot('scatter5', traceData5, layout5);
};

function categories(categorydata) {
    var category = Object.values(categorydata.Category);
    var year = Object.values(categorydata.Year);
    
    let trace6 = {
        
    }
}