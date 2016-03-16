
$(function(){

 helloWorld = "Ok World, whats the beef?";

    console.log( "Apis & Google Stuff loaded" );

 var googleMap;
 initMap = function() {
  var map = document.getElementById("map")
  googleMap =  new google.maps.Map(map, {
    zoom: 10,
    disableDefaultUI: true,
    center: {lat: 51.5117,  lng:-0.1275},
    styles: [{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]
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
       draggable: false
      });
     setTimeout(function(){
       var marker = new google.maps.Marker({
         position: {lat: parseFloat(project.lat), lng: parseFloat(project.lng)},
         map: googleMap
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


}); // end of js

