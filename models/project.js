var mongoose      = require('mongoose');

var projectSchema = mongoose.Schema({
   title: String,
   projectType: String,
   projectDate: Date,
   postcode: String,
   desc: String,
   image: String,
   gallery: [],
   attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
   comments: []
});

module.exports = mongoose.model('Project', projectSchema);