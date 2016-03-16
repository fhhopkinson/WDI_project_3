$( document ).ready(function() {
    console.log( "users List JS file loaded" );

  function getuserList(){
    ajaxRequest('GET', "http://localhost:3000/api/users", null, function(users){
    console.log(users);
    return userList = users
    });
  }

getuserList();

});