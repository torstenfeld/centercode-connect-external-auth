
var util = require('util');
var events = require('events');
var async = require('async');
var users = require('../users');

function Validate() {

    events.EventEmitter.call(this);

    var self = this;
    this.test = 'test';

    //-----------------------------
    // private Methods
    //-----------------------------

    var _search = function() {
        async.detect(users, function(item, callback) {
            if (self.username === item.username) {
                callback(true);
            }
            callback(false);
        }, function(result) {
            if (typeof result === 'undefined') {
                self.emit('error', 'User has not been found');
            } else {
                self.user = result;
                self.emit('password');
            }
        });
    };

    var _password = function() {
        if (self.user.password === self.password) {
            self.emit('finalize');
        } else {
            self.emit('error', 'Password did not match');
        }
    };
    
    var _finalize = function() {
        self.user.valid = 'true';
        console.log(self.user);
        self.emit('success', self.user);
    };

    //-----------------------------
    // flow
    //-----------------------------
    
    self.on('search', _search);
    self.on('password', _password);
    self.on('finalize', _finalize);

}
util.inherits(Validate, events.EventEmitter);
module.exports = new Validate();
var v = Validate.prototype;

v.start = function(username, password) {
    var self = this;
    self.username = username;
    self.password = password;
    self.emit('search');
};