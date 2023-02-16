// const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    try{
        if(req.query){
            const toursFiltered = await Tour.find(req.query);

            res.status(200).json({
                status: 'success',
                data: toursFiltered
            })
        }else{
            const tours = await Tour.find();

            res.status(200).json({
                status: 'success',
                data: {
                    tours
                }
            });
        }
    }
    catch(err){
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
};

exports.getToursById = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
                data: {
                    tour
                }
            });
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
        
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
            message: "Invalid data sent"
        });
    }
}

exports.updateTour = async (req,res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'update',
            data: {
                tour
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        }) 
    }
};

exports.deleteTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'deleted',
            message: null
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}
