
$( document ).ready(function() {
    console.log( "Sections file loaded" );


$(".hubslist").on('click', 'img', function(){
  projectShow(this.id);
});

function projectIndex(){

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
  $("section").hide()
  $(".projectShow").show();
    $(data).each(function( index, project){
      $("#showImage").html("<img src='" + project.gallery[0] + "'</img>");
      $("#showTitle").text(project.title);
      $("#showDesc").text(project.desc);
    console.log(project);
  });
  var i = 0;
  while (i < data.attendees.length){
     $("#attendeesList").append("<li class='avatar'>" + "<img src='" + data.attendees[i].avatar +  "'/>" + data.attendees[i].name + "</li>");
     i++
  }
}


}); // end of js