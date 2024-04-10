const mongoose = require('mongoose')
const {Schema} = mongoose

const UserHistorySchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    search_history: [{
        disease: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'disease'
        },
        img: {
            type: String
        },
        search_date: {
            type: Date,
            default: Date.now
        }
    }],

    date:{
        type: Date,
        default: Date.now 
    }
})

const UserHistory = mongoose.model('userhistory', UserHistorySchema)

module.exports = UserHistory;