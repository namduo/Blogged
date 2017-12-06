var express = require('express');
var router = express.Router();
var User = require('../models/UserSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')

/* GET user page. */
router.get('/', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;
  var userId = req.session.userID;
  var userEmail = req.session.userEmail

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {
    res.render('userPage', {
      title: 'User Page',
      userName: userName,
      userId: userId,
      userEmail: userEmail
    });
  }
});



module.exports = router;
