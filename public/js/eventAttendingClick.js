$( document ).ready(function() {
    console.log( "eventAttendingClick file loaded" );

  $( "#eventAttendingYes" ).click(function() {
   attendingAjaxRoute(); // i.e. projectId + currentuserid
  });

  attendingAjaxRoute = function(){
    console.log("ajaxin")
    $.ajax({
      method: "PUT",
      url: "/api/attending/" + "56ea8bc22c47b00a406cb18d" + "/" + loggedInUserId
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
