var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')


/* GET /shareBlog */
router.get('/:id', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;
  var userEmail = req.session.userEmail;
  var userId = req.params.id;

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {

    res.render('shareBlog', {
      title: 'Shared Blog',
      userName: userName,
      userId: userId,
      userEmail: userEmail
    });
  }

});


module.exports = router;
