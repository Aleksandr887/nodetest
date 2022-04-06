let express = require("express");
let path = require('path');
let app = express();

const PORT = process.env.PORT || 80

app.use(function(req, res, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
});

app.use(express.static(__dirname + "/static"));

app.listen(PORT, function() {
    console.log("Serving static on 81");
    console.log(__dirname + "/static");
});