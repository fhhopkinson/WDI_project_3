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
    initMap(); // create map
    populateMap() // marker map
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
   $(".hubslist").append("<li>"+ project.title + project.desc + project.projectDate + '<img src="' + project.gallery[0] + '" width="200px"/>' + project.projectDesc + project.projectDate + project.projectType + project.lat + project.lng + project.attendees + project.addresslineOne + project.addresslineTwo + '</li>');
  });
}


// function projectShow(project){
//   event.preventDefault();
//   ajaxRequest('GET', "http://localhost:3000/api/projects/" + project, null, function(data){
//     console.log(data);
//     displayEventpage(data);
//   });
// }
// function displayEventpage(data){
//   $(data).each(function( index, project){

//     $("#project-image").attr("src",project.projectImage);
//     $("#event-date").text(project.projectDate);
//     $("#event-desc").text(project.projectDesc);
//     $("#event-desc").append("<p>" + project.projectLat + "</p><p>"  + project.projectLng + "</p> ");
//     });
// }


}); // end of js