var mongoose    = require('mongoose');

var userSchema = mongoose.Schema({
   name: String,
   email: String,
   postcode: Date,
   avatar: String,
   projects: [{ type: mongoose.Schema.ObjectId, ref: 'Projects' }],
   passwordHash: String
});
