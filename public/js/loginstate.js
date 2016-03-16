$(init);

function init(){
  //post information subitted by form
  $('form').on('submit', submitForm);
  $('.logout').on('click', logout);
  $('.pure-menu-item a').on('click', showPage);
  $('section').attr("hidden", true);
}




function submitForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault();

  var form    = this;
  console.log(form);

  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  //serialize data not JSON name=Acacia&email=acacia@gmail.com
  var data    = new FormData(this);


  //method = request method ie. GET, PUT, PATCH etc.
  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
}

function checkLoginState(data){
  // check for a token
  // if there is one, call loggedInState
  // otherwise, call loggedOutState
  showUser(data);
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
  console.log("authenticationSuccessful");
  // displayUsers();

}

function loggedInState(){
  // hide the login / register forms and links
  // show hubs, logout, and users links
  $('.logged-in').removeAttr("hidden");
  $('.logged-out').attr("hidden", true);
  setData();

}

function setData(token){
  setToken(token);
}

function RemoveData(){

}



function setToken(token) {
  // set the token into localStorage
  // pass in the token itself and then it will be stored as a token
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
  var sectionId = $(this).text().toLowerCase()
  var sectionId = $.trim(sectionId)
  if (sectionId == "logout") {
    logout()
  }
  if (sectionId == "hubs") {
    projectIndex();
  }
$('#' + sectionId).removeAttr('hidden');

  // $('.logged-in').show();
  // $('#users').show();
  // hideErrors();

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
    $('#user').empty().append("<li>" + "<a>" + "<i class='fa fa-user'>" + "</i>" + " " + data.user.name.toUpperCase() + "</a>" + "</li>");
  };
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
