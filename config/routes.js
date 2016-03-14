var express           = require("express");
var router            = express.Router();

var jwt               = require('jsonwebtoken');
var secret            = require('../config/tokens').secret;

var usersController          = require("../controllers/user");
var authenticationController = require("../controllers/authentications")


function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


router.route("/users")
  .get(usersController.index)
  .post(usersController.create);

router.route("/users/:id")
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;
