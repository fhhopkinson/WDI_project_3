var mongoose    = require('mongoose');

var userSchema = mongoose.Schema({
   name: String,
   email: { type: String, unique: true, required: true },
   postcode: String,
   avatar: String,
   projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }],
});


module.exports = mongoose.model('User', userSchema);
