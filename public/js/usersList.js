$( document ).ready(function() {
    console.log( "users List JS file loaded" );

  function getuserList(){
    ajaxRequest('GET', "/api/users", null, function(users){
    console.log(users);
    return userList = users
    });
  }

getuserList();

});