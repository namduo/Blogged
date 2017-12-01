var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')
var path = require('path')
var multer = require('multer')
var request = require('request')

/* GET /postblog */
router.get('/', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;
  var userId = req.session.userID;

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    // DATA BASE QUERY
    Post.find({ user_id: req.session.userId })
    .select('postPicture')
    .exec(function(err, posts) {
      if (err) return next(err);
      res.render('addBlog', {
        title: 'Add Blog',
        username: userName,
        userId: userId,
        posts: posts
      });
    });

  }


});


// MULTER
// STORAGE ENGINE
var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// MULTER UPLOAD
var upload = multer({
  storage: storage
}).single('postPicture');

// BLOG POST FORM
router.post('/', upload, function(req, res, next) {

  var userName = req.session.userName;
  var userId = req.session.userID;

  var postData = {
    userId: req.body.userId,
    postPicture: req.file.filename,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent
  }

  // Create Post
  Post.create(postData, function(err, content) {

    if (err) {
      return next(err)
    } else {
      console.log(postData);
      res.render('addBlog', {
        title: 'Add Blog',
        username: userName,
        userId: userId
      });
    }
  });

});



module.exports = router;
