const mongoose = require('mongoose');


const scoreSchema = mongoose.Schema({
    name : String,
    first_round : Number,
    second_round : Number,
    third_round : Number
})

module.exports = mongoose.model('Scores', scoreSchema);