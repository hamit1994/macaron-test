// Declare variables
var express = require('express');
var app = express();

app.use(express.static("."));

// '/' est la route racine
app.get('/', function (req, res) {
    res.sendFile('home.html', { root: '.' });
});

app.listen(4000, function () {
  console.log("Server started at http://localhost:4000");
});