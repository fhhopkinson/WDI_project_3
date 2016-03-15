$(init);

function init(){
  //post information subitted by form
  $('form').on('submit', submitForm);
}

function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token) && loggedInState();
  // hideErrors();
  console.log("authenticationSuccessful");
  // displayUsers();

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

function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');
}

function setToken(token) {
  // set the token into localStorage
  // pass in the token itself and then it will be stored as a token
  return localStorage.setItem('token', token);
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