
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
        if (typeof users[self.username] === 'undefined') {
            self.emit('error', 'User has not been found');
        } else {
            self.user = users[self.username];
            self.emit('found');
        }
    };

    var _password = function() {
        if (self.user.password === self.password) {
            self.emit('passwordValid');
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

    self.on('gotdata', _search);
    self.on('found', _password);
    self.on('passwordValid', _finalize);

}
util.inherits(Validate, events.EventEmitter);
module.exports = new Validate();
var v = Validate.prototype;

v.start = function(username, password) {
    var self = this;
    self.username = username;
    self.password = password;
    self.emit('gotdata');
};