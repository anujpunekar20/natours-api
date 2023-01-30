

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'showing all users'
    })
}

exports.createNewUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'created new user'
    })
}

exports.getUserById = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'showing user by id'
    })
}

exports.updateUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'updated user'
    })
}

exports.deleteUser = (req, res) => {
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
