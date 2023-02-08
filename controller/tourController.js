// const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {

    const tours = await Tour.find();

    res.status(200).json({
        status: 'success',
        timeRequested: req.requestTime,
        data: {
            tours
        }
});
}

exports.getToursById = (req, res) => {
    const id = req.params.id * 1;
    // const tour = tours.find(x => x.id === id);

        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         tour
        //     }
        // });
    };

exports.addNewTours = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
    
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
}

exports.updateTour = (req,res) => {
    res.status(201).json({
        status: 'update',
        message: 'file(s) updated'
    });
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'deleted',
        message: null
    });
}
