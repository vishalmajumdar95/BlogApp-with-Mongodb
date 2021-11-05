var express = require('express');
var router = express.Router();
const controller = require('../controllers/user')
const { AuthenticateToken } = require('../auth/jwt')

// Signup User
router.post('/signup', controller.createUsers);
// Login User
router.post('/login', controller.loginUsers);
// Delete User
router.delete('/delete/:id', AuthenticateToken, controller.deleteUsers);
// Update User
router.put('/update/:id', AuthenticateToken, controller.updateUsers);
// Get All User
router.get('/getUserDatas', AuthenticateToken, controller.getUserDatas);
// Get By Id User
router.get('/getUserDataById/:id', AuthenticateToken, controller.getUserDataById);


module.exports = router;