var mongoose      = require('mongoose');
var Comment       = require('./comment');

var projectSchema = mongoose.Schema({
   title: { type: String, required: true },
   projectType: { type: String, required: true },
   projectDate: Date,
   lat: String,
   lng: String,
   addresslineOne: String,
   addresslineTwo: String,
   postcode: String,
   desc: { type: String, required: true },
   image: String,
   gallery: [],
   attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
   comments: [Comment.schema]
});

module.exports = mongoose.model('Project', projectSchema);
