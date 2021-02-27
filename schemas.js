const Joi = require('joi');

module.exports.novelSchema = Joi.object({
    novels: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        author: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});



