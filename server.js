

var http = require('http');
var util = require('util');
var express = require('express');
var app = express();
app.use(express.bodyParser());

var validate = require('./lib/validate');

app.post('/auth', function auth(req, res) {
    
    res.writeHead(200, {
       'content-type': 'text/plain' 
    });
    
    validate.on('error', function(err) {
        res.end(err);
    });
    
    validate.on('success', function(user) {
        res.write(util.inspect(user, {depth: null}).toString());
        res.end();
    });
    
    validate.start(req.body.user, req.body.password);
});
http.createServer(app).listen(55555);



