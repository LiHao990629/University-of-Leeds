var map;
var tweetData;


function initialize() {
	//Create the map object and set the centre point and zoom level
	map = L.map('maptweet');
	map.setView([0, 0], 2);

	//Load tiles from open street map
	L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',
		maxZoom: 30
	}).addTo(map); //add the basetiles to the map object
}

function fetchData()	{
	
	//Define array to hold results returned from server
	tweetData = new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("fetchData.php", function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			tweetData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon
			}); 
		}
		
		plotTweets(); 
	});
	
}

//Plot the markers on the leaflet map
function plotTweets() {
	for (var i = 0; i< tweetData.length; i++)	{ 
		var markerLocation = new L.LatLng(tweetData[i].lat, tweetData[i].lon)
		var marker = new L.Marker(markerLocation).addTo(map).bindPopup(tweetData[i].body)
	}
}

//Remove all the marker from the leaflet map
function clearData() {
    map.eachLayer(function(layer) {
        if (layer.getLatLng) {
            map.removeLayer(layer); 
        }
    });
  }

