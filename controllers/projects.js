var Project = require("../models/project");

function projectIndex(req, res){
  Project.find(function(err, projects){
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ projects:projects });
  });
}

function projectCreate(req, res){
   var project = new Project(req.body);
   project.save(function(err,project){
    if(err) return res.status(500).send(err);

    res.status(201).send(project)
   })
}

function projectsShow(req, res){
  var id = req.params.id;
  Project.findById({ _id: id }).populate('attendees').exec(function(err, project){
    if (err) return res.status(500).send(err);
    if (!project) return res.status(404).send(err);
    res.status(200).send(project);
  })
}

module.exports = {
  index: projectIndex,
  show: projectsShow,
  create: projectCreate
};