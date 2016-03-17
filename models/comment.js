var mongoose    = require('mongoose');

var commentSchema = mongoose.Schema({
   commenter: String,
   commenterAvatar: String,
   comment: String,
});

module.exports = mongoose.model('Comment', commentSchema);
