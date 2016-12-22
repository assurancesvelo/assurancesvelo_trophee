// source/javascripts/all.js
//= require jquery
//= require bootstrap-sprockets
//= require_tree .


jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    // script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyBYoBt2ZxvwQev49mJkq7GbSBYXFsiocU4&sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
        styles: [{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}]

    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);


    var labels = '123456789';
    var labelIndex = 0;

    // Multiple Markers
    var markers = [
        ['La Jacques Gouin, Mennecy', 48.566669,2.43333],
        ['La Morvandelle, La Grande Verrière', 46.9673,4.14356],
        ['La Vélostar, Breuillet', 48.5667, 2.1667],
        ['La Cyclo des boucles de la Marne, Montmirail',48.866669,3.53333],
        ['La Claudio Chiappucci, Arnay le Duc', 47.1333,4.4833],
        ['Les Copains Cyfac Ambert', 45.55,3.75],
        ['La Pierre Channy, Langeac', 45.1,3.4833],
        ['La Jean François Bernard, Corbigny', 47.25,3.6667],
        ['Les Monts de l auxois, Semur en Auxois', 47.4833,4.3333],
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>La Jacques Gouin</h3>' + ' <p>Mennecy 91540</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>La Morvandelle</h3>' + ' <p>La Grande Verrière 71990</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>La Vélostar</h3>' + ' <p>Breuillet 91650</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>La Cyclo des boucles de la Marne</h3>' + ' <p>Vertus 51130</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>La Claudio Chiappucci</h3>' + ' <p>Arnay le Duc 21230</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Le Copains Cyfac</h3>' + ' <p>Ambert 63600</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>La Pierre Channy</h3>' + ' <p>Langeac 43300</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>La Jean François Bernard</h3>' + ' <p>Corbigny 58800</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Les Monts de l Auxois</h3>' + ' <p>Semur en Auxois 21140</p>' + '</div>'],
    ];


    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            label: labels[labelIndex++ % labels.length],
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(6);
        google.maps.event.removeListener(boundsListener);
    });

}
