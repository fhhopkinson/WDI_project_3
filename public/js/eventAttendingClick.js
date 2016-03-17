$( document ).ready(function() {
 

  $( ".eventAttendingYes" ).click(function() {
   attendingAjaxRoute(this.id); // i.e. projectId + currentuserid
  });

  attendingAjaxRoute = function(projectId){
    $.ajax({
      method: "PUT",
      url: "/api/attending/" + projectId + "/" + getUser()._id
    }).done(function(data) {
         
         alert( "Cool your attendance was registered." );
    });
    projectShow(projectId);
  }


});
