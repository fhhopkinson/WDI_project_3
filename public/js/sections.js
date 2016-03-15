
$( document ).ready(function() {
    console.log( "Sections file loaded" );

// clicks
$("#hubs").on('click',projectIndex)
// Hide all pages (<MAINS>)
$("main").hide()
$(".hubslist").on('click', 'img', function(){
  //showProject(this.id);
  projectShow(this.id);
});

function projectIndex(){
    $("#login").hide()
    $("#register").hide()
    $(".projectIndex").show()
    initMap(); // create map
    populateMap() // marker map
    getProjects();
  }
   


function getProjects(){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects", null, function(data){
    console.log(data);
    console.log("Do I exist?");
    displayProjects(data);
  });
}


function displayProjects(data){
console.log("arrived in displayProjects - ready to print to page");
$.each(data.projects, function( index, project ) {
   $(".hubslist").append("<li id='" + project._id + "' >"+ project.title + project.desc + project.projectDate + '<img src="' + project.gallery[0] + '" width="200px" id="' + project._id + '" />' + project.projectDesc + project.projectDate + project.projectType + project.lat + project.lng + project.attendees + project.addresslineOne + project.addresslineTwo + '</li>');
  });
}


function projectShow(project){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects/" + project, null, function(data){
    console.log(data);
    displayEventpage(data);
  });
}

function displayEventpage(data){
  $("main").hide()
    $(data).each(function( index, project){
    console.log(project);
  });
}


}); // end of js