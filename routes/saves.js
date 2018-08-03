var express = require('express');
var router = express.Router();
const SaveController = require('../controllers/savings.controllers');
var jwt = require('jsonwebtoken');
var JWT_Verify = require('../middlewares/auth');

//users tokenwill be used for verification
router.use(JWT_Verify.verifyToken);
router.post('/', SaveController.Save);
router.post('/withdraw',SaveController.Withdraw);

// router.put('/:id', UserController.UpdateProfile);

module.exports = router;
 
 