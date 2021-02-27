const mongoose = require('mongoose');
const Review = require('./review')
// lesson 405
const Schema = mongoose.Schema;
// Schema = mongoose.schema , so i donn't have to add mongoose bellow.
const NovelSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    // author:{
    //     type:String,
    //     required: true
    // },
    description:{
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

NovelSchema.post('findOneAndRemove', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

const novels = mongoose.model('novels', NovelSchema);

module.exports = novels