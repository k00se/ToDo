var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var fs = require('fs');
var url = require('url');
var ROOT_DIR = "index/";

var port = process.env.port || 1337


http.createServer(function (req, res, next) {
    var urlObj = url.parse(req.url, true, false);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data)
    {

        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;

        }
        if (err) {
            res.writeHead(500);
            res.end('500 Server Error');
            return;
        }
        res.writeHead(200);
        res.end(data);
    });


}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');

module.exports = app;


console.log("Starting application") 


