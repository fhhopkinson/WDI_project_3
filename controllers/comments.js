var Comment = require("../models/comment");

function commentIndex(req, res){
  Comment.find(function(err, comments){
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ comments: comments });
  });
}

function commentCreate(req, res){
  console.log(req.body);
   var comment = new Comment(req.body);
   comment.save(function(err, comment){
    if(err) return res.status(500).send(err);
    res.status(201).send(comment)
   })
}

function commentsShow(req, res){
  var id = req.params.id;
    Comment.findById({ _id: id }, function(err, comment){
      if (err) return res.status(500).send(err);
      if (!comment) return res.status(404).send(err);
      res.status(200).send(comment);
    })
}



module.exports = {
  index: commentIndex,
  show: commentsShow,
  create: commentCreate
};
