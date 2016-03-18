$( document ).ready(function() {


$(".hubslist").on('click', '.projectItemBox', function(){
  projectShow(this.id);
});

$("#attendeesList").on('click', 'img', function(){
  otherUserShow(this.id);
});

$("#avatarBox").on('click', 'img', function(){
  otherUserShow(this.id);
});




otherUserShow = function(whoseId){
  ajaxRequest('GET', "/api/users/" + whoseId, null, function(data){

    /////// Show section
    $('section').attr("hidden", true);
    $("#otherUserShow").removeAttr('hidden');
    //////// Put User Data on Page
    $("#otherUserName").html("<h1>" + data.name + "</h1>");
    $("#otherUserPic").html("<img src='" + data.avatar + "' width='200px' height='200px'/>");
    var i = 0;
    $("#otherUserProjects").empty();
    (data.projects).forEach(function(project) {
      $('#userProjectsX-otheruser').append("<div class='userProjectTiles' id='" + project._id + "'><p class='pTop'>"+ project.title + "</p><img class='projectImages' src='" + project.image + "'/><p class='pbottom'> Attendees: " + project.attendees.length + "</p></div>");
    });
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
  ajaxRequest('GET', "/api/projects", null, function(data){
   $.each(data.projects, function( index, project ) {
      $(".hubslist").append("<div class='pure-u-1-3 projectItemBox' style='background-image: url(" + project.image + ");' id='" + project._id + "' ><h3>"+ project.title + "</h3></div>");
     });
  });
}


projectShow = function(project){
  event.preventDefault();
  ajaxRequest('GET', "/api/projects/" + project, null, function(data){
    //////////////////////////////////
    $('section').attr("hidden", true);
    $("#projectShow").removeAttr('hidden');
      var project = data.project

        $("#showImage").html("<img src='" + project.image + "'</img>");
        $("#showTitle").text(project.title);
        $("#showDesc").text(project.desc);
      //////////////////////////////

      $("#avatarBox").html("<div class='insideAvBox'><img src='" + data.user.avatar + "' id='" + data.user._id + "' />" + "<br>" + data.user.name + "</div>");

      if (data.user.avatar == undefined){
        data.user.avatar = "/images/female-placeholder-profile-img.png"
        }
        if (data.user.name == undefined){
          data.user.name = "log in to comment"
        }
        if (data.user._id == undefined){
          data.user._id = "notloggedin"
        }

      projectVenue = project.addresslineOne + " " + project.addresslineTwo + " " + project.postcode;
  
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
