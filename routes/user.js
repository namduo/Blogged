var express = require('express');
var router = express.Router();
var User = require('../models/UserSchema.js')
var requiresLogin = require('../functions/requiresLogin.js')

/* GET user page. */
router.get('/', requiresLogin, function(req, res, next) {

  var userName = req.session.userName;

  if (err) {
    var err = new Error('Loggin required');
    res.send(err);
    return err;
  } else {
    res.render('user', { title: 'User Page', 'username': userName });
  }
});



module.exports = router;
