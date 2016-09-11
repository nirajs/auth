var LocalStrategy = require('passport-local').Strategy;
var user = require('../../controllers/user.controller.js');

var signup = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
        process.nextTick(function(){
            user.create(email, password, function(err, user){
                if(err)
                    return done(err);
                return done(null , user);
            });
        });
    }
);

var signin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, next){
        process.nextTick(function(){
            user.findByEmail(email, function(err, user){
                if(err)
                    return next(err);
                if(!user || !user.validPassword(password))
                {
                    return next(new Error('Wrong email or password'));
                }

                // user is found and its password is correct
                return next(null, user);
            });
        });
    }
);

module.exports = {
    signup : signup,
    signin : signin
};
