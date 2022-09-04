var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    }
});

var musicSchema = new mongoose.Schema({
    songname: {
        type: String,
        required: true
    },
    songlength: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    genre: {
        type: String,
        required: true
    },
    artist: artistSchema
});

mongoose.model('Music', musicSchema);