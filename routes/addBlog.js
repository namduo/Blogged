var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')
var path = require('path')
var multer = require('multer')

/* GET /postblog */
router.get('/', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;
  var userId = req.session.userID;
  var userEmail = req.session.userEmail

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    res.render('addBlog', {
      title: 'Add Blog',
      userName: userName,
      userId: userId,
      userEmail: userEmail
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

  console.log(req.body);

  // NO IMAGE
  if (!req.file) {
    req.file = {};
    req.file.filename = '';
  }

  var postData = {
    userId: req.body.userId,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
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
      res.redirect('/addBlog');
    }
  });

});

router.post('/:update', upload, function(req, res, err) {

  // NO IMAGE
  if (!req.file) {
    req.file = {};
    req.file.filename = '';
  }

  console.log('1');

  console.log(req.body);
  console.log(req.file);

  var postData = {
    userId: req.body.userId,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    postPicture: req.file.filename,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent
  }

  console.log('2 ' + postData);

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    console.log('3');

    // DATA BASE QUERY
    Post.findOneAndUpdate(postData, { _id: req.body.post_id } )
    .exec(function(err, posts) {
      if (err) return next(err);
      res.redirect('/addBlog');
    });

    console.log('4');
  }
});



module.exports = router;
