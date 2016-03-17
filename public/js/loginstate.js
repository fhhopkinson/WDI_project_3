$( document ).ready(function() {
    console.log( "loginstate file loaded" );
    init();
});

function init(){
  $('.registerLogin').on('submit', submitForm);
  $('#submit').on('submit', newForm);
  $('#comment').on('submit', addComment);
  $('.logout').on('click', logout);
  $('.pure-menu-item a').on('click', showPage);
  $('section').attr("hidden", true);
  changeColor();
  checkLoginState();
  showUser();
  $('#home').on("click", function() {
    console.log("hello");
    $('section').attr("hidden", true);
    $('#front').removeAttr("hidden");
    generateMap();
  });
}

function submitForm(){
  event.preventDefault();
  var form    = this;
  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  var data    = $(this).serialize();
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
  event.preventDefault();
  var form    = this;
  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  var data    = new FormData(this);
  form.reset();
  ajaxRequestWithImage(method, url, data);
}

function checkLoginState(data){
  var token = getToken();
  if (token) {
    loggedInState();
  } else {
    loggedOutState();
  }
}

function authenticationSuccessful(data) {
  if(data.token) setToken(data.token) && loggedInState();
  showUser(data);
  checkLoginState(data);
  showUserPage();
}

function loggedInState(){
  $('.logged-in').removeAttr("hidden");
  $('.logged-out').attr("hidden", true);
}

function changeColor(){
  $('.pure-menu-link a').css('background-color','#307F54');
}

function setToken(token) {
  return localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

// function getUser(){
//   event.preventDefault();
//   var token = getToken();
//   if (token) {
//     return ajaxRequest('GET', 'http://localhost:3000/api/users', null, showUser);
//   }
// }

function showPage() {
  $('section').attr("hidden", true);
  var sectionIdLog = $.trim($(this).text().toLowerCase());
  var sectionId = $(this).attr('id')

  if (sectionId == "logout") {
    logout();
  }else if (sectionId == "user") {
    showUserPage();
  }else {
    $('#' + sectionIdLog).removeAttr('hidden');
    viewListProjects();
  }
}

function showUserPage() {
  event.preventDefault();
  ajaxRequest2('GET', "http://localhost:3000/api/users/56e9a7b4fb52512d6f623ed3", null, function(user){
    $('section').attr("hidden", true);
    $("#userShow").removeAttr('hidden');
    $('#profileHeader').empty().html(user.name)
    $('#profilePic').empty().append('<img src="' + user.avatar + '">')
    user.projects.forEach(function(project) {
      $('#userProjects').empty().append("<div class='pure-u-1-5 userProjectTiles' id='" + project._id + "' ><p>"+ project.title + "</p><img class='projectImages' src='" + project.image + "'/><p> Attendees: " + project.attendees.length + "</p></div>");
    });
  })
}

function ajaxRequest2(method, url, data, callback) {
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
  removeToken();
  loggedOutState();
}

function loggedOutState(){
  $('.logged-out').removeAttr("hidden");
  $('.logged-in').attr("hidden", true);
  $('#front').removeAttr("hidden");
}

function removeToken() {
  return localStorage.clear();
}

function showRegister() {
  $('section').attr("hidden", true);
  $('#register').removeAttr("hidden");
}

function showUser(){
  var user = getUser();
  console.log(user);
  if(user)  {
    $('#user').empty().append("<li>" + "<a>" + "<i class='fa fa-user'>" + "</i>" + " " + user.name.toUpperCase() + "</a>" + "</li>");
  };
}

function getUser() {
  var token = getToken();
  if (token)  {
    var payload = token.split(".")[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload)._doc;
    return payload;
  }
}

function ajaxRequest(method, url, data, callback) {
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




