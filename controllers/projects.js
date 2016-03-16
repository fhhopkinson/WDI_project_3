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

function projectsUpdate(req, res) {

  if(req.file) {
    req.body.image = s3Config.endpoint + s3Config.bucket + '/' + req.file.key;
  }

  Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(user);
  });
}



module.exports = {
  index: projectIndex,
  show: projectsShow,
  create: projectCreate,
  update: projectsUpdate
};
