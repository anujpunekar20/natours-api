const express = require('express');
const { route } = require('./tourRoutes');
const userController = require('./../controller/userController');
const router = express.Router();


router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)

router
    .route('/:id')
    .get(userController.getUserById)    
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;
