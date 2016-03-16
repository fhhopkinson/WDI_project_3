$( document ).ready(function() {
    console.log( "eventAttendingClick file loaded" );

  //$("#eventAttendingYes").on("click", attendingAjaxRoute)

  $( "#eventAttendingYes" ).click(function() {
   attendingAjaxRoute();
  });

  attendingAjaxRoute = function(){
    console.log(loggedInUserId);
    $.get( "/api/attending/56e98a848e1f571d22ea5501/" + loggedInUserId + "", function( data ) {
      console.log( data );
      alert( "Cool your attendance was registered." );
    });
  }

});
