$(function(){
console.log( "Apis & Google Stuff loaded" );


 var smallGmap;
 var geocoder;

 timeConverter = function(UNIX_timestamp){
   var a = new Date(UNIX_timestamp * 1000);
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var year = a.getFullYear();
   var month = months[a.getMonth()];
   var date = a.getDate();
   var hour = a.getHours();
   var min = a.getMinutes();
   var sec = a.getSeconds();
   var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
   return time;
 }

initSmallMap = function(lat,lng) {
  console.log(lat + ":" + lng);
var map = document.getElementById("mapSmallProjectShow")
googleMap =  new google.maps.Map(map, {
  zoom: 16,
  disableDefaultUI: true,
  center: {lat: parseFloat(lat),  lng: parseFloat(lng)}
  });
}

userProfileMap = function(lat,lng) {
  console.log("arrived in userProfileMap");
var map = document.getElementById("userShowMap")
googleMap =  new google.maps.Map(map, {
  zoom: 14,
  disableDefaultUI: true,
  center: {lat: parseFloat(lat),  lng: parseFloat(lng)}
  });
 populateMap(userProfileMap);
}

whereDoILivePostcodeToLATLNG = function(postcode){
   var latlng = new google.maps.LatLng(51.525507,-0.0587999);
   placesService = new google.maps.places.PlacesService(map);
   placesService.nearbySearch({ keyword: postcode, location: latlng, radius: 15000 }, function(results, status) {
     console.log(results);
     whereLives = results[0];
     console.log(whereLives);
     var iliveLAT = whereLives.geometry.location.lat()
     var iliveLNG = whereLives.geometry.location.lng()
     userProfileMap(iliveLAT, iliveLNG);
   });
}



 initMap = function() {
  var map = document.getElementById("map")
  googleMap =  new google.maps.Map(map, {
    zoom: 10,
    disableDefaultUI: true,
    center: {lat: 51.5165009,  lng: -0.1178475},
    styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#fbf9e5"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#568259"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fc9f77"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#568259"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#b55858"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#77b1bb"},{"visibility":"on"},{"weight":"0.01"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#0AC19B"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffe745"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#c9d8d9"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2A4B97"}]}]
  });
}

 populateMap = function(whichmap){ // tell populatemap whichmap
   ajaxRequest('GET', "http://localhost:3000/api/projects/", null, function(data){
     console.log(data);
     projects = data.projects;
     projects.forEach(function(project, idx){
     marker = new google.maps.Marker({
       position: {lat: parseFloat(project.lat),  lng: parseFloat(project.lng)},
       map: whichmap,//googleMap,
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
         content:"<div class='pure-u-1-3 projectItemBox' style='background-image: url(" + project.image + ");' id='" + project._id + "' ><h3>"+ project.title + "</h3></div>"
       });
       marker.addListener('click', function(){
         infoWindow.open(googleMap);
         googleMap.panTo(marker.position);
         googleMap.setZoom(12);

       });
       google.maps.event.addDomListener(infoWindow, 'domready', function() {
           $('.projectItemBox').click(function() {
               projectShow(this.id);
           });
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
