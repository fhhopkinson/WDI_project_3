$( document ).ready(function() {

    init();
});

function init(){
  $('.registerLogin').on('submit', submitForm);
  $('#submit').on('submit', newForm);
  $('#updateUserForm').on('submit', updateUserForm)
  $('#comment').on('submit', addComment);
  $('#submitNewHub').on('submit', submitNewHub);
  $('.logout').on('click', logout);
  $('.pure-menu-item a').on('click', showPage);
  $('#editProfile').on('click', function() {

  });
  $("#showFront").on('click', frontPage);

  $('section').attr("hidden", true);
  changeColor();
  checkLoginState();
  gallery();
  $('#home').on("click", function() {
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

function updateUserForm(){
  event.preventDefault();
  var form    = this;
  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api/users/" + getUser()._id;
  var data    = new FormData(this);
  form.reset();
  ajaxRequestWithImage(method, url, data, authenticationSuccessful);
}

function frontPage(){
  $('section').attr("hidden", true);
  checkLoginState();
  $('#front').removeAttr("hidden");
  generateMap();
}


function addComment() {
  event.preventDefault();
  var form    = this;
  var method  = $(this).attr('method');
  var url     = "http://localhost:3000/api" + $(this).attr('action');
  var data    = $(this).serialize();
  currentProjectId = $(this).attr('action').split("/")[2];
  ajaxRequest(method, url, data, function() {
  projectShow(currentProjectId);
  })
}

function submitNewHub(){
  event.preventDefault();
  var form    = this;
  var method  = $(this).attr('method');
  var urll     = "http://localhost:3000/api" + $(this).attr('action');
  var data    = new FormData(this);
  form.reset();

    return $.ajax({
      method: method,
      url: urll,
      data: data,
      contentType: false, // allow ajax to send file data
      processData: false, // allow ajax to send file data
      beforeSend: function(jqXHR) {
        var token = getToken();
        if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function(data){
    }).fail(function(data) {
      console.error(data.responseJSON);
    });

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
  ajaxRequest2('GET', "http://localhost:3000/api/users/" + getUser()._id, null, function(user){
    $('section').attr("hidden", true);
    $("#currentUserShow").removeAttr('hidden');
      // does profile avatar image exist?
    if (user.avatar == undefined){
      user.avatar = "/images/female-placeholder-profile-img.png"
      }

    $('#profilePic').empty().append('<img src="' + user.avatar + '">')
    $('#usersName').empty().append('<h1>' + user.name + '</h1>')

    console.log("USER PROJECTS PRE LOOP: ", user.projects);

    (user.projects).forEach(function(project) {
  
      $('#userProjectsX').append("<div class='pure-u-3-12 userProjectTiles' id='" + project._id + "'><p>"+ project.title + "</p><img class='projectImages' src='" + project.image + "'/><p> Attendees: " + project.attendees.length + "</p></div>");
    });
  })

  if (user.postcode == undefined){
    user.postcode = "mums house"
    }
  whereDoILivePostcodeToLATLNG(user.postcode); // find lat & lng of where postcode is
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

function getUser() {
  var token = getToken();
  if (token)  {
    var payload = token.split(".")[1];
    payload = window.atob(payload);
    var user = JSON.parse(payload)._doc;
    return user;
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
    console.error(err);
  });
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
  });
}



function gallery() {
  ajaxRequest2('GET', "http://localhost:3000/api/projects", null, function(data) {
    var projects = data.gallery
    var pictures = [];
    $(data.projects).each(function(index, project) {
      $(project.gallery).each(function(index, picture) {
        pictures.push(picture);
      });
    });
    $(pictures).each(function(index, pic) {
      $('.single-item').append('<div class="pictureSpin"style="background-image: url(' + pic +');"> </div>');
    });

    $('.single-item').slick({
      autoplay: true,
      arrows: false,
      autoplaySpeed: 2000
    });
  });
}
