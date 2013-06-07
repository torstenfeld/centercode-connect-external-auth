

var http = require('http');
var express = require('express');
var app = express();

app.post('/auth', function auth(req, res) {
    res.writeHead(200, {
       'content-type': 'text/plain' 
    });
    res.write('test/n');
    res.write(req.toString('utf8'));
    res.end();
});
http.createServer(app).listen(55555);