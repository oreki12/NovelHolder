const Novels = require('./models/novels');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError')
const {novelSchema, reviewSchema} = require('./schemas')


module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){ 
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in to create a campground!')
        return res.redirect('/login');
    }
    next()
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const novel = await Novels.findById(id);
    if(!novel.author.equals(req.user._id)){
        req.flash('error', 'you do not have permission to do that.')
        return res.redirect(`/novels/${id}`)
    }
    next()
}

// module.exports.isReviewAuthor = async(req, res, next) => {
//     const {reviewId} = req.params;
//     const review = await Review.findById(reviewId);
//     if(!review.author.equals(req.user._id)){
//         req.flash('error', 'you do not have permission to do that.')
//         return res.redirect(`/novels/${id}`)
//     }
//     next()
// }

// novels validation
module.exports.validateNovel = ( req, res, next) =>{
    const {error} = novelSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
    // console.log(result);
}

// reviews validation
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}