$(init);

function init(){
  //post information subitted by form
  $('form').on('submit', submitForm);
  checkLoginState();
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
  var data    = $(this).serialize();
  console.log(data);

  //method = request method ie. GET, PUT, PATCH etc.
  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
}

function checkLoginState(){
  // check for a token
  // if there is one, call loggedInState
  // otherwise, call loggedOutState
var token = getToken();
  
  if (token) { 
    loggedInState();
    console.log("logged-in")
  } else {
    loggedOutState();
  }
}

function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token) && loggedInState();
  // hideErrors();
  console.log("authenticationSuccessful");
  // displayUsers();

}

function loggedInState(){
  // hide the login / register forms and links
  // show the users section and link
  // display the users
  $(".logged-out", "#login", "#register").hide();
  $(".user-link", "#users").show();
  // displayUsers();
 // $('section').hide(); 
 // $('#users').show();
 // $('.logged-out').hide();
 // $('.logged-in').show();
 // getUsers();
 // showpage();

}


function setToken(token) {
  // set the token into localStorage
  // pass in the token itself and then it will be stored as a token
  return localStorage.setItem('token', token);
}

function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');
}



function showPage() {
  // hide all sections
  // hide errors
  // show the relevant section
  $('section').hide();
  var sectionId = '#' + $(this).text().toLowerCase()
  $(sectionId).removeClass('hidden')

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
  $('section').hide();
  $('.logged-out').show();
  $('.logged-in').hide();
}

function removeToken() {
  // remove the token from localStorage
  return localStorage.clear();
}

function showRegister() {
  $('section').hide();
  $('#register').show();
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