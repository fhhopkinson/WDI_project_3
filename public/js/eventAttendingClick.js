$( document ).ready(function() {
    console.log( "eventAttendingClick file loaded" );

  $( ".eventAttendingYes" ).click(function() {
   attendingAjaxRoute(this.id); // i.e. projectId + currentuserid
  });

  attendingAjaxRoute = function(projectId){
    console.log("ajaxin")
    $.ajax({
      method: "PUT",
      url: "/api/attending/" + projectId + "/" + getUser()._id
    }).done(function(data) {
         console.log( data );
         alert( "Cool your attendance was registered." );
    });
  }


  //   console.log(loggedInUserId);
  //   $.get( "/api/attending/56e98a848e1f571d22ea5501/" + loggedInUserId + "", function( data ) {
  //     console.log( data );
  //     alert( "Cool your attendance was registered." );
  //   });
  // }

});
