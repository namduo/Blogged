var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	userId: {
		type: String
	},
	userName: {
		type: String
	},
	userEmail: {
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
	},
	published: {
		type: Date, default: Date.now
	}
});


var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
