var express           = require("express");
var router            = express.Router();

var usersController = require("../controllers/user");


router.route("/users")
  .get(usersController.index)
  .post(usersController.create);

router.route("/users/:id")
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

module.exports = router;
