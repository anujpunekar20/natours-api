const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    // key: {
    //     type: Number,
    //     unique: true
    // },
    name: {
        type: String,
        required: [true, 'Tour must have a name'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    price: {
        type: Number,
        required: [true, 'Tour must have a price']
    },
    priceDiscount: {
        type: Number
    },
    summary: {
        type: String,
        trim: true // trim clears the blank spaces
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true 
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

// Tour.count({}, (err, count) => {
//     console.log(count);
// })

module.exports = Tour;