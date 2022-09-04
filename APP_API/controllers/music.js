var mongoose = require('mongoose');
var Mus = mongoose.model('Music');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.musicList = function(req, res) {
    Mus.find().exec(function(err, musicdata) {
        if (err) {
            res.status(404).json(err);
            return;
        }
        res.status(200).json(musicdata);
    });
};

module.exports.musicCreate = function(req, res) {
    console.log(req.body);
    Mus.create({
        songname: req.body.songname,
        songlength: req.body.songlength,
        description: req.body.description,
        genre: req.body.genre,
        artist: {
            name: req.body.artist.name,
            birthdate: req.body.artist.birthdate
        }
    }, function(err, music) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(music);
            sendJSONresponse(res, 201, music);
        }
    });
};

module.exports.musicReadOne = function(req, res) {
    console.log('Finding music details', req.params);
    if (req.params && req.params.musicid) {
        Mus
            .findById(req.params.musicid)
            .exec(function(err, music) {
                if (!music) {
                    sendJSONresponse(res, 404, {
                        "message": "musicid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(music);
                sendJSONresponse(res, 200, music);
            });
    } else {
        console.log('No musicid specified');
        sendJSONresponse(res, 404, {
            "message": "No musicid in request"
        });
    }
};

module.exports.musicUpdateOne = function(req, res) {
    if (!req.params.musicid) {
        return res
            .status(404)
            .json({
                "message": "Not found, musicid is required"
            });
    }
    Mus
        .findById(req.params.musicid)
        .select('-reviews -rating')
        .exec((err, music) => {
            if (!music) {
                return res
                    .status(404)
                    .json({
                        "message": "musicid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            music.songname = req.body.songname,
                music.songlength = req.body.songlength,
                music.description = req.body.description,
                music.genre = req.body.genre,
                music.artist = {
                    name: req.body.artist.name,
                    birthdate: req.body.artist.birthdate
                }
            music.save((err, loc) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(loc);
                }
            });
        });
};

module.exports.musicDeleteOne = function(req, res) {
    const { musicid } = req.params;
    if (musicid) {
        Mus
            .findByIdAndRemove(musicid)
            .exec((err, music) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No music"
            });
    }
};