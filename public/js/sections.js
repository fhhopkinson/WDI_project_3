
$( document ).ready(function() {
    console.log( "Sections file loaded" );

$(".hubslist").on('click', '.projectItemBox', function(){
  projectShow(this.id);
});
$("#mapViewIdx").on('click', function(){
  $('.listView').attr("hidden", true);
  $(".mapView").removeAttr('hidden');
});
$("#listViewIdx").on('click', function(){
 $('.mapView').attr("hidden", true);
 $(".listView").removeAttr('hidden');
});

 projectIndex = function(){
    $(".hubslist").empty();
    $('.listView').attr("hidden", true);
    initMap(); // create map
    populateMap() // marker map
    getProjects();
  }
   


function getProjects(){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects", null, function(data){
   $.each(data.projects, function( index, project ) {
      $(".hubslist").append("<div class='pure-u-1-3 projectItemBox' style='background-image: url(" + project.image + ");' id='" + project._id + "' ><h3>"+ project.title + "</h3></div>");
     });
  });
}

function projectShow(project){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects/" + project, null, function(data){
    //////////////////////////////////
    $('section').attr("hidden", true);
    $("#projectShow").removeAttr('hidden');
      var project = data.project
        $("#showImage").html("<img src='" + project.gallery[0] + "'</img>");
        $("#showTitle").text(project.title);
        $("#showDesc").text(project.desc);
      //////////////////////////////
      $("#avatarBox").html("<img src='" + data.user.avatar + "' /><h4>" + data.user.name + "</h4>");
    var i = 0;
    var attendees = data.project.attendees;
    while (i < attendees.length){
       $("#attendeesList").append("<li class='avatar'>" + "<img src='" + attendees[i].avatar +  "'/>" + attendees[i].name + "</li>");
       i++
      }
     initSmallMap(project.lat,project.lng); 
  });
}



}); // end of js