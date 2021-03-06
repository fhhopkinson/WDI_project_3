var Project = require("../models/project");
var User = require('../models/user');
var s3Config = require('../config/s3');

function projectIndex(req, res){
  Project.find(function(err, projects){
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ projects:projects });
  });
}

function projectCreate(req, res){

  if(req.file) {
    req.body.image = s3Config.endpoint + s3Config.bucket + '/' + req.file.key;
  }

   var project = new Project(req.body);
   project.save(function(err, project){
    if(err) return res.status(500).send(err);

    res.status(201).send(project)
   })
}

function projectsShow(req, res){
  var id = req.params.id;
  User.findOne({ projects: id },function(err, user){
    Project.findById({ _id: id }).populate('attendees').exec(function(err, project){
      if (err) return res.status(500).send(err);
      if (!project) return res.status(404).send(err);
      res.status(200).send({user: user, project: project});
    })
  })
}


// function projectsUpdate(req, res) {

//   if(req.file) {
//     req.body.image = s3Config.endpoint + s3Config.bucket + '/' + req.file.key;
//   }

//   Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
//     if(err) return res.status(500).json({ message: err });
//     return res.status(200).json(user);
//   });
// }


function projectsUpdate(req, res) { 
  console.log("we just arrived in the projectsUpdate controller function");
  console.log(req.body.commenter);
  console.log(req.body.comment);
  //Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, project) {
    Project.findOneAndUpdate({_id:req.params.id}, {comments:req.body}, function (err, project) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(project);
  });
}

// this is for when you click attending when logged in
function projectsAttending(req, res) { 
  var projectId = req.params.projectid;
  var userId = req.params.userid;
  Project.findByIdAndUpdate(projectId, { $push: { attendees: userId } }, { new: true }, function (err, project) {
    if(err) return res.status(500).json({ message: err });
    console.log("ATTENDEE UPDATED?", project);
    return res.status(200).json(project);
  });
}


module.exports = {
  index: projectIndex,
  show: projectsShow,
  create: projectCreate,
  update: projectsUpdate,
  attending: projectsAttending
};
