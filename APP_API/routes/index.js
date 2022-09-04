var express = require("express");
var router = express.Router();

var ctrlMusic = require('../controllers/music');

router.get('/music', ctrlMusic.musicList);
router.post('/music', ctrlMusic.musicCreate);
router.get('/music/:musicid', ctrlMusic.musicReadOne);
router.put('/music/:musicid', ctrlMusic.musicUpdateOne);
router.delete('/music/:musicid', ctrlMusic.musicDeleteOne);

module.exports = router;