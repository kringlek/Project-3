const hurr_url = '/static/js/hurricane_path.json'

var path
d3.json(hurr_url).then(function(data) {
    path = data;
    console.log(data)
});