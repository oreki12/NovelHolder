const Novels = require('../models/novels');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const novel = await Novels.findById(req.params.id);
    console.log(novel);
    console.log('=======');
    const review = new Review(req.body.review);
    console.log(review);
    review.author = req.user._id;
    novel.reviews.push(review);
    await review.save();
    await novel.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/novels/${novel._id}`);
}

module.exports.updateReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Novels.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndRemove(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/novels/${id}`);
}