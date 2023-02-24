const { json } = require('body-parser');
const fs = require('fs');
const Tour = require('../models/tourModel');

// const jsonData = Object.keys(JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json')));
// function getNestedKeys(jsonData, arr) {
//     for (const key in jsonData) {
//       arr.push(key);
//       if (typeof jsonData[key] === 'object') {
//         getNestedKeys(jsonData[key], arr);
//       }
//     }
//     return arr;
//   }
  
//   // Call the function to get the keys of nested objects
//   const keysArray = getNestedKeys(jsonData, []);
  
//   // Write the array of keys to a new JSON file
//   fs.writeFileSync('keys.json', JSON.stringify(keysArray, null, 2));

exports.getAllTours = async (req, res) => {
    try{
        const queryObj = {...req.query};
        // const excludedFields = ['path','sort','limit'];
        // excludedFields.forEach(el => delete queryObj[el]);
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const parsedStr = JSON.parse(queryStr);
        console.log(parsedStr);
        
        let query = Tour.find(parsedStr);
        
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt'); 
        }

        // fields limit
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            // const fieldsRequired = fields.flatMap(num => num) 
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        }

        // pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // execute query
        const tours = await query;

        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: tours
        })
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
