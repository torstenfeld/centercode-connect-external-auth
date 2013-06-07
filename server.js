

var http = require('http');
var util = require('util');
var express = require('express');
var async = require('async');
var app = express();
app.use(express.bodyParser());

//var inspect = util.inspect();

var users = [{
        "username": "test",
        "firstname": "Testfirst",
        "lastname": "Testlast",
        "email": "test@test.de",
        "password": "qwe123"
    }, {
        "username": "test2",
        "firstname": "Testfirst2",
        "lastname": "Testlas2t",
        "email": "test2@test.de",
        "password": "qwe1234"
    }];

app.post('/auth', function auth(req, res) {
    res.writeHead(200, {
       'content-type': 'application/json' 
//       'content-type': 'text/plain' 
    });
//    res.write(util.inspect(req.body, {depth: null}).toString());
//    console.log(req.body.user);
//    console.log(req.body.password);
    userValidate(req.body.user, req.body.password, function(result) {
        res.write(result);
//        res.write(util.inspect(result, {depth: null}).toString());
        res.end();
    });
    
});
http.createServer(app).listen(55555);

function userValidate(user, password, callback) {
    userSearch(user, function(result) {
//        console.log(util.inspect(result, {depth: null}).toString());
        userCheckPassword(result, password, function(isPasswordValid) {
            if (isPasswordValid) {
                callback(result);
            } else {
                callback('password false');
            }
        });
        
    });
}

function userSearch(user, callback) {
    async.detect(users, function(item, callback) {
        if (user === item.username) {
            callback(true);
        }
        callback(false);
    }, function(result) {
        callback(result);
    });
}

function userCheckPassword(userObj, password, callback) {
    if (userObj.password === password) {
        callback(true);
    }
    callback(false);
}

