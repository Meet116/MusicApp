const request = require('request')

const apiOptions = {
    server: 'http://localhost:3000'
}

const _renderListpage = function(req, res, responseBody) {
    console.log(responseBody);
    res.render('list-display', { songs: responseBody });
};

const _renderDetailPage = function(req, res, responseBody) {
    console.log(responseBody);
    res.render('details', {
        details: responseBody
    });
};

module.exports.musicList = function(req, res, next) {
    const path = '/api/music';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderListpage(req, res, body);
        }
    );
};

module.exports.musicInfo = function(req, res) {
    const path = `/api/music/${req.params.musicid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};

const _renderCreatePage = function(req, res) {
    res.render('create-new-music', {
        title: "Create New Music"
    });
};

module.exports.addNewMusic = function(req, res) {
    _renderCreatePage(req, res);
}

module.exports.doAddNewMusic = function(req, res) {
    const path = '/api/music';
    const postdata = {
        songname: req.body.songname,
        songlength: req.body.songlength,
        description: req.body.description,
        genre: req.body.genre,
        artist: {
            name: req.body.name,
            birthdate: req.body.birthdate
        }
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions, (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/');
            }
        }
    );
};