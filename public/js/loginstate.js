$( document ).ready(function() {
    console.log( "loginstate file loaded" );



    function init(){
      //post information subitted by form
      $('.registerLogin').on('submit', submitForm);
      $('#submit').on('submit', newForm);
      $('#comment').on('submit', addComment);
      $('.logout').on('click', logout);
      $('.pure-menu-item a').on('click', showPage);
      $('section').attr("hidden", true);
      changeColor();
      checkLoginState();
      $('#home').on("click", function() {
        console.log("hello");
        $('section').attr("hidden", true);
        $('#front').removeAttr("hidden");
        generateMap();
      });

    }

init();
});





function submitForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault();

  var form    = this;

  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  //serialize data not JSON name=Acacia&email=acacia@gmail.com
  var data    = $(this).serialize();


  //method = request method ie. GET, PUT, PATCH etc.
  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
}

function addComment() {
  event.preventDefault();
  var form    = this;
  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  var data    = $(this).serialize();
  ajaxRequest(method, url, data, function() {
    form.reset();
  })
}


function newForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault();

  var form    = this;
  console.log(form);

  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  var data    = new FormData(this);

  //method = request method ie. GET, PUT, PATCH etc.
  form.reset();
  ajaxRequestWithImage(method, url, data);
}

function checkLoginState(data){
  // check for a token
  // if there is one, call loggedInState
  // otherwise, call loggedOutState
  var token = getToken();

  if (token) {
    loggedInState();
    console.log("logged-in")
  } else {
    loggedOutState();
    console.log("logged-out")
  }
}

function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token) && loggedInState();
  // hideErrors();
  showUser(data);
  checkLoginState(data);
  showUserPage();
  console.log("authenticationSuccessful");

  // displayUsers();

}

function loggedInState(){
  // hide the login / register forms and links
  // show hubs, logout, and users links
  $('.logged-in').removeAttr("hidden");
  $('.logged-out').attr("hidden", true);

}

function changeColor(){
  $('.pure-menu-link a').css('background-color','#307F54');
}



function setToken(token) {
  // set the token into localStorage
  // pass in the token itself and then it will be stored as a token
  console.log(token);
  return localStorage.setItem('token', token);
}

function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');
  getUser();
}

function getUser(){
  // get the user data from the API and call displayUsers
  event.preventDefault();
  loggedInState();
  return ajaxRequest('GET', 'http://localhost:3000/api/users', null, function(data) {
      showUser(data);
  });
}



function showPage() {
  // hide all sections
  // hide errors
  // show the relevant section
  $('section').attr("hidden", true);
  var sectionIdLog = $(this).text().toLowerCase()
  var sectionId = $(this).attr('id')
  var sectionIdLog = $.trim(sectionIdLog)


  if (sectionId == "logout") {
    logout();
  }else if (sectionId == "user") {
    showUserPage();
  }else if (sectionId == "hubs") {
    viewListProjects()
  }else {
    $('#' + sectionIdLog).removeAttr('hidden')
  }


  // $('.logged-in').show();
  // $('#users').show();
  // hideErrors();

}

function showUserPage() {
  event.preventDefault();
  console.log("showUser");
  ajaxRequest2('GET', "http://localhost:3000/api/users/" + loggedInUserId, null, function(user){
    $('section').attr("hidden", true);
    $("#userShow").removeAttr('hidden');
    console.log(user);
    $('#profileHeader').empty().html(user.name)
    $('#profilePic').empty().append('<img src="' + user.avatar + '">')
    user.projects.forEach(function(project) {
      $('#userProjects').empty().append("<div class='pure-u-1-5 userProjectTiles' id='" + project._id + "' ><p>"+ project.title + "</p><img class='projectImages' src='" + project.image + "'/><p> Attendees: " + project.attendees.length + "</p></div>");
    });
  })
}

function ajaxRequest2(method, url, data, callback) {
  // create a re-useable ajaxRequest function
  return $.ajax({
    method: method,
    url: url,
    data: data
  })
  .done(callback)
  .fail(function(err){
    console.error(err)
  })
}


function logout(){
  // remove the token
  // call loggedOutState
  removeToken();
  loggedOutState();
}

function loggedOutState(){
  // show the login / register links, and the login form
  // hide the users section and links
  $('.logged-out').removeAttr("hidden");
  $('.logged-in').attr("hidden", true);
  $('#front').removeAttr("hidden");
  console.log("loggedOutState")
}

function removeToken() {
  // remove the token from localStorage
  return localStorage.clear();
}

function showRegister() {
  $('section').attr("hidden", true);
  $('#register').removeAttr("hidden");
}

function showUser(data){
  // take the user data and show the current user as <a> in the <li>, eg:
  // <li class="pure-menu-link">Current User</li>
  console.log("got here")
  if(data)  {
    $('#user').empty().append("<li>" + "<a id='" + data.user._id +"'>" + "<i class='fa fa-user'>" + "</i>" + " " + data.user.name.toUpperCase() + "</a>" + "</li>");
    loggedInUser = data.user;
    loggedInUserId = data.user._id;
  };
}

function getUser() {
  var token = getToken();
  if (token)  var payload = token.split(".")[1];
  console.log(token);
  var user = window.atob(payload)
  console.log(user);
  return user;
}

function ajaxRequest(method, url, data, callback) {
  // create a re-useable ajaxRequest function
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: function(jqXHR, settings) {
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  })
  .done(callback)
  .fail(function(err){
    console.error(err)
  })
}

function ajaxRequestWithImage(method, url, data, callback) {
  // create a re-useable ajaxRequest function
  return $.ajax({
    method: method,
    url: url,
    data: data,
    contentType: false,
    processData: false,
    beforeSend: function(jqXHR, settings) {
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  })
  .done(callback)
  .fail(function(err){
    console.error(err)
  })
}
