var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')
var path = require('path')
var multer = require('multer')


/* GET /updateBlog */
router.get('/:id', requiresLogin, function(req, res, next) {

  // var userName = req.session.userName;

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    // DATA BASE QUERY
    Post.find({ _id: req.params.id })
    .exec(function(err, posts) {
      if (err) return next(err);
      res.json(posts);
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


/* PUT /updateBlog */
router.put('/:id', requiresLogin, function(req, res, next) {
  console.log('1');

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
    Post.findOneAndUpdate({ _id: req.body.id }, postData)
    .exec(function(err, posts) {
      if (err) return next(err);
      res.redirect('/addBlog');
    });

    console.log('4');
  }

});




module.exports = router;
