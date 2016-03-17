$(function(){
console.log( "Apis & Google Stuff loaded" );


 var smallGmap;
 var geocoder;

initSmallMap = function(lat,lng) {
  console.log(lat + ":" + lng);
var map = document.getElementById("mapSmallProjectShow")
googleMap =  new google.maps.Map(map, {
  zoom: 12,
  disableDefaultUI: true,
  center: {lat: parseFloat(lat),  lng: parseFloat(lng)}
  });
}

 initMap = function() {
  var map = document.getElementById("map")
  googleMap =  new google.maps.Map(map, {
    zoom: 10,
    disableDefaultUI: true,
    center: {lat: 51.5165009,  lng: -0.1178475},
    styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#fbf9e5"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#b5e280"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fc9f77"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#b5e280"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#b55858"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#77b1bb"},{"visibility":"on"},{"weight":"0.01"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe745"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffe745"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#c9d8d9"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#92e4f3"}]}]
  });
}

 populateMap = function(){
   ajaxRequest('GET', "http://localhost:3000/api/projects/", null, function(data){
     console.log(data);
     projects = data.projects;
     projects.forEach(function(project, idx){
     marker = new google.maps.Marker({
       position: {lat: parseFloat(project.lat),  lng: parseFloat(project.lng)},
       map: googleMap,
       draggable: false,
       icon: "/images/" + project.projectType + ".png"
      });
     setTimeout(function(){
       var marker = new google.maps.Marker({
         position: {lat: parseFloat(project.lat), lng: parseFloat(project.lng)},
         map: googleMap,
         icon: "/images/" + project.projectType + ".png"
       });
       var infoWindow = new google.maps.InfoWindow({
         position:{lat: parseFloat(project.lat), lng: parseFloat(project.lng)},
         maxWidth: 200,
         borderRadius: 10,
         arrowPosition: 50,
         content: '<h4>' + project.title + '</h4>' + project.projectDate + '<img src="' + project.gallery[0] + '" width="200px"/><p>' + project.desc +  '</p>'
       });
       marker.addListener('click', function(){
         infoWindow.open(googleMap);
         googleMap.panTo(marker.position);
         googleMap.setZoom(14);

        if(currentInfoWindow) currentInfoWindow.close();

        currentInfoWindow = infoWindow;

       });
     },idx*10);

     }); // end of the foreach (I think)
   });
 }
 placesCardFetch = function(address, lat, lng){
  console.log(address + lat + lng );
 var latlng = new google.maps.LatLng(lat,lng);
   // Search nearby places
 placesService = new google.maps.places.PlacesService(map);
 placesService.nearbySearch({ keyword: address, location: latlng, radius: 15000 }, function(results, status) {  //map.getCenter()
   console.log(results);
   imageFound = results[0].photos[0].getUrl({
    maxWidth: 400
         });
   $("#imageFound").html("<img src='" + imageFound + "' />");
 });
}

}); // end of js

