let express = require('express');
let app = express();
app.get('/', function(req, res) {
    res.send(__dirname + '/views/index.html');
})



































 module.exports = app;