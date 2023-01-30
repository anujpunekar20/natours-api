const express = require('express');
const { route } = require('./tourRoutes');

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'showing all users'
    })
}

const createNewUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'created new user'
    })
}

const getUserById = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'showing user by id'
    })
}

const updateUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'updated user'
    })
}

const deleteUser = (req, res) => {
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }
    res.status(200).json({
        status: 'deleted',
        message: 'deleted user'
    })
}

const router = express.Router();


router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser)

router
    .route('/:id')
    .get(getUserById)    
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;
