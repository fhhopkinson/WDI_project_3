var mongoose      = require('mongoose');
var Comment       = require('./comment');

var projectSchema = mongoose.Schema({
   title: String,
   projectType: String,
   projectDate: Date,
   lat: String,
   lng: String,
   addresslineOne: String,
   addresslineTwo: String,
   postcode: String,
   desc: String,
   image: String,
   gallery: [],
   attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
   comments: [Comment.schema]
});

module.exports = mongoose.model('Project', projectSchema);
