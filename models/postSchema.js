var mongoose = require('mongoose');
var moment = require('moment');

var defaultDate = Date.now();
var formatDate = moment(defaultDate).format("dddd, MMMM Do YYYY, h:mm:ss a");

var PostSchema = new mongoose.Schema({
	userId: {
		type: String
	},
	userName: {
		type: String
	},
	userEmail: {
		type: String,
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
		type: String, default: formatDate
	}
});


var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
