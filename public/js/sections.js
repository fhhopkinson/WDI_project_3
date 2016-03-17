$( document ).ready(function() {
    console.log( "Sections file loaded" );


$(".hubslist").on('click', '.projectItemBox', function(){
  projectShow(this.id);
});

$("#attendeesList").on('click', 'img', function(){
  otherUserShow(this.id);
});

$("#avatarBox").on('click', 'img', function(){
  otherUserShow(this.id);
});


/*
$("#mapViewIdx").on('click', function(){
  $('.listView').attr("hidden", true);
  $(".mapView").removeAttr('hidden');
  $('#front').removeAttr('hidden');
  generateMap();
});
$("#listViewIdx").on('click', function(){
 $('.mapView').attr("hidden", true);
 $(".listView").removeAttr('hidden');
});*/


otherUserShow = function(whoseId){
  ajaxRequest('GET', "http://localhost:3000/api/users/" + whoseId, null, function(data){
    console.log("this is a otherusersShow data return ajax");
    console.log(data);
    /////// Show section
    $('section').attr("hidden", true);
    $("#otherUserShow").removeAttr('hidden');
    //////// Put User Data on Page
    $("#otherUserName").html("<h1>" + data.name + "</h1>");
    $("#otherUserPic").html("<img src='" + data.avatar + "' width='200px' height='200px'/>");
    var i = 0;
    $("#otherUserProjects").empty();
    while (i < data.projects.length){
     $("#otherUserProjects").prepend("<p><ul>" + data.projects[i].title + "</br>" + data.projects[i].projectDate + "</ul></p>");
     i++
    }
  });
}


viewListProjects = function(){
  $('.mapView').attr("hidden", true);
  $(".listView").removeAttr('hidden');
}

generateMap = function(){
    $(".hubslist").empty();
    $('.listView').attr("hidden", true);
    $(".mapView").removeAttr('hidden');
    initMap(); // create map
    populateMap(googleMap) // marker map
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
      console.log("===============================");
      console.log(data.project.addresslineOne + data.project.addresslineTwo 
        + data.project.postcode);
      console.log("===============================");
        $("#showImage").html("<img src='" + project.image + "'</img>");
        $("#showTitle").text(project.title);
        $("#showDesc").text(project.desc);
      //////////////////////////////
      $("#avatarBox").html("<div class='insideAvBox'><img src='" + data.user.avatar + "' id='" + data.user._id + "' /></div><div class='insideAvBoxFurther'>" + data.user.name + "</div></div>");
      projectVenue = project.addresslineOne + " " + project.addresslineTwo + " " + project.postcode;
      console.log("Project will be held on: <b>" + project.projectDate + "</b>The project venue is " + projectVenue);
      $("#showAddress").html( "Project will be held on: <b>" + project.projectDate + "</b><br></br> At Venue: </br>"  + project.addresslineOne + "<br>" + project.addresslineTwo + "<br>" + project.postcode);
    var i = 0;
    var attendees = data.project.attendees;
    $("#attendeesList").empty();
    while (i < attendees.length){
       $("#attendeesList").append("<li class='avatar'>" + "<img src='" + attendees[i].avatar +  "' id='" + attendees[i]._id + "' />" + "<br>" +attendees[i].name + "</li>");
       i++
      }

     // get comments
     $.each(project.comments, function( index, comment ) {
       $(commentsList).append("<div class='pure-g'><div class='pure-u-4-24'><img src='" + comment.commenterAvatar + "' width='40px' height='40px' /></div>" + "<div class='pure-u-20-24 individualComment'>" + comment.commenter + "</br>" + comment.comment + "</div></div>")
     });
     console.log(projectVenue);
     initSmallMap(project.lat,project.lng);
     placesCardFetch(projectVenue,project.lat,project.lng);
     // build comments PUT form
     $("#comment").attr("action", "/projects/" + project._id);
     $("#commenterName").val(getUser().name);
     $("#avatarCommenter").attr("src", getUser().avatar);
     $("#commenterAvatar").val(getUser().avatar);
     //build attending button
     $(".eventAttendingYes").attr('id', project._id);
    });
}



}); // end of js
