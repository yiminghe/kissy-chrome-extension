var express = require('express');
var app = express();
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express['static'](__dirname, {
    hidden: true
}));
app.listen(5555);