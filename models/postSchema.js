var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	userId: {
		type: String
	},
	postPicture: {
		type: String
	},
	postTitle: {
		type: String,
		trim: true
	},
	postContent: {
		type: String,
		trim: true
	}
});


var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
