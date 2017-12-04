var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')
var path = require('path')


/* GET /postblog */
router.get('/', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    // DATA BASE QUERY
    Post.find({ })
    // .select('postPicture')
    .exec(function(err, posts) {
      if (err) return next(err);
      res.json(posts);
    });

  }

});




module.exports = router;
