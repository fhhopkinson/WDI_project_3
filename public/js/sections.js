$( document ).ready(function() {
    console.log( "Sections file loaded" );



$(".hubslist").on('click', '.projectItemBox', function(){
  projectShow(this.id);

});
$("#mapViewIdx").on('click', function(){
  $('.listView').attr("hidden", true);
  $(".mapView").removeAttr('hidden');
  $('#front').removeAttr('hidden');
  generateMap();
});
$("#listViewIdx").on('click', function(){
 $('.mapView').attr("hidden", true);
 $(".listView").removeAttr('hidden');
});


viewListProjects = function(){
  $('.mapView').attr("hidden", true);
  $(".listView").removeAttr('hidden');
}

generateMap = function(){
    $(".hubslist").empty();
    $('.listView').attr("hidden", true);
    $(".mapView").removeAttr('hidden');
    initMap(); // create map
    populateMap() // marker map
    getProjects();
  }


  /// show front - onLoad
  $("#front").removeAttr('hidden');
  generateMap();
  // && generate map

function getProjects(){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects", null, function(data){
   $.each(data.projects, function( index, project ) {
      $(".hubslist").append("<div class='pure-u-1-3 projectItemBox' style='background-image: url(" + project.image + ");' id='" + project._id + "' ><h3>"+ project.title + "</h3></div>");
     });
  });
}

projectShow = function(project){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects/" + project, null, function(data){
    //////////////////////////////////
    $('section').attr("hidden", true);
    $("#projectShow").removeAttr('hidden');
      var project = data.project
        $("#showImage").html("<img src='" + project.image + "'</img>");
        $("#showTitle").text(project.title);
        $("#showDesc").text(project.desc);
      //////////////////////////////
      $("#avatarBox").html("<img src='" + data.user.avatar + "' /><h4>" + data.user.name + "</h4>");
      projectVenue = project.addresslineOne + " " + project.addresslineTwo + " " + project.postcode;
      console.log("projectVenue is " + projectVenue);
      $("#showAddress").html(project.addresslineOne + "<br>" + project.addresslineTwo + "<br>" + project.postcode);
    var i = 0;
    var attendees = data.project.attendees;
    $("#attendeesList").empty();
    while (i < attendees.length){
       $("#attendeesList").append("<li class='avatar'>" + "<img src='" + attendees[i].avatar +  "'/>" + attendees[i].name + "</li>");
       i++
      }

     // get comments
     $.each(project.comments, function( index, comment ) {
       $(commentsList).append("<li>" + comment.commenter + "</br>" + comment.comment + "</li>")
     });

     initSmallMap(project.lat,project.lng);
     placesCardFetch(projectVenue,project.lat,project.lng);
     // build comments PUT form
     $("#comment").attr("action", "/projects/" + project._id);
     //build attending button
     $(".eventAttendingYes").attr('id', project._id);
    });
}



}); // end of js
