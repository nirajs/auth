var User = require('../../models/user');

// various strategies used for passport
var local = require('./local');
//var facebook = require('./facebook');
var google = require('./google');

module.exports = function(passport){
    // serialize and deserialize user for maintaining persistent login sessions
    passport.serializeUser(function(user, done){
        console.log('serializing user');
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        console.log('deserializing user');
        User.findOne({_id:id}, function(err, user){
            done(err, user);
        });
    });

    passport.use('local-signup', local.signup);
    passport.use('local-signin', local.signin);
    //passport.use('facebook', facebook);
    passport.use('google', google);
};
//
