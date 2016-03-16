
$( document ).ready(function() {
    console.log( "Sections file loaded" );

$(".hubslist").on('click', 'img', function(){
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
    $('.listView').attr("hidden", true);
    initMap(); // create map
    populateMap() // marker map
    getProjects();
  }
   


function getProjects(){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects", null, function(data){
   $.each(data.projects, function( index, project ) {
      $(".hubslist").append("<li id='" + project._id + "' >"+ project.title + project.desc + project.projectDate + '<img src="' + project.gallery[0] + '" width="200px" id="' + project._id + '" />' + project.projectDesc + project.projectDate + project.projectType + project.lat + project.lng + project.attendees + project.addresslineOne + project.addresslineTwo + '</li>');
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