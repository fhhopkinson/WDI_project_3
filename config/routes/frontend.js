var router           = require('express').Router();
var staticController = require('../../controllers/static');

router.get('/', staticController.index)
router.get('/login', staticController.login)
router.get('/register', staticController.register);

module.exports = router;