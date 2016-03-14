var mongoose    = require('mongoose');

var projectSchema = mongoose.Schema({
   title: String,
   projectType: String,
   projectDate: Date,
   lat: String,
   lng: String,
   desc: String,
   image: String,
   gallery: []
   attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
   comments: []
});
