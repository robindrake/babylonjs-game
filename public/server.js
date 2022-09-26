var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT;
app.use(express.static("public"));
app.get('/', function (_req, _res) {
    _res.sendFile(path.join("".concat(__dirname, "/index.html")));
});
app.listen(port, function () {
    console.log("Server started on ".concat(port));
});
