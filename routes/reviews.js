const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Review = require('../models/review');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews')
const { reviewSchema } = require('../schemas.js')


const ExpressError = require('../utlis/ExpressError')
const catchAsync = require('../utlis/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));


router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));
module.exports = router;