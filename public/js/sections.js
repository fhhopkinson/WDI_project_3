$( document ).ready(function() {
    console.log( "Sections file loaded" );

// clicks
$("#hubs").on('click',projectIndex)
// Hide all pages (<MAINS>)
$("main").hide()


function projectIndex(){
    $("#login").hide()
    $("#register").hide()
    $(".projectIndex").show()
    getProjects();
  }
   

function getProjects(){
  event.preventDefault();
  ajaxRequest('GET', "http://localhost:3000/api/projects", null, function(data){
    console.log(data);
    displayProjects(data);
  });
}

function displayProjects(data){
data = data.projects;

$.each(data, function( index, project ) {
   $(".hubslist").append("<li>"+ project.title + project.desc + project.projectDate + '<img src="' + project.gallery[0] + '" width="200px"/>' + project.projectDesc +  '</li>');
  })
}



}); // end of js