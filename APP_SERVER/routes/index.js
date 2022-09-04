var express = require('express');
var router = express.Router();

const ctrlAbout = require('../controllers/about');

const ctrlMusic = require('../controllers/music');
/* GET home page. */
router.get('/about', ctrlAbout.about);
//router.get('/', ctrlMusic.home);
router.get('/', ctrlMusic.musicList);
router.get('/music/:musicid', ctrlMusic.musicInfo);

router.route('/new').get(ctrlMusic.addNewMusic).post(ctrlMusic.doAddNewMusic);


module.exports = router;