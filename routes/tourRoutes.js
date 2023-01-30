const express = require('express');
const tourController = require('./../controller/tourController');
const router = express.Router();

router.param('id', (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    next();
});

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.addNewTours)

router
    .route('/:id')
    .get(tourController.getToursById)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router;