var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')
var path = require('path')


/* GET /postblog */
router.get('/', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;
  var localUserId = req.session.userID;

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    Post.find({ })
    .exec(function(err, posts) {
      if (err) return next(err);

      var otherPosts = [];

      posts.forEach(function(post) {
        
        // ONLY SEND POSTS THAT AREN'T === TO CURRENT USER SESSION
        if (post.userId != localUserId) {
          otherPosts.push(post);
        }
      });

      res.json(otherPosts);
    });

  }

});




module.exports = router;
