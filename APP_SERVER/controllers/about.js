module.exports.about = function(req, res, next) {
    res.render('about', { tittle: "About my site" });
};