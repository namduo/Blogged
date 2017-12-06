var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')

/* REMOVE */
router.delete('/:id', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;
  var userId = req.session.userID;
  var userEmail = req.session.userEmail

  Post.findOneAndRemove({
		_id: req.params.id
	}, function(err, post) {
		if(err) {
			res.send('error deleting')
		} else {
      res.send('Blog Deleted');
		}
	})

});



module.exports = router;
