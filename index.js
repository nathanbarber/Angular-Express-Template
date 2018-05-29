const express = require("express"),
    bodyparser = require("body-parser"),
    mysql = require("mysql");
var app = express();
app.use(express.static(`${__dirname}/prod`));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.listen(8080);