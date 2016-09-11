var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var cuser = require('../../controllers/user.controller.js');

module.exports = new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl
    },
    function(token, refreshToken, profile, next){
        process.nextTick(function(){
            cuser.findByGoogleID(profile.id, function(err, user){
                if(err)
                    return next(err);
                // user is found hence just login with the user
                if(user)
                    return next(null, user);

                // no user is found and now we need to register this user
                cuser.createByGoogle(
                    profile.id,
                    token,
                    profile.name.givenName,
                    profile.name.middleName,
                    profile.name.familyName,
                    profile.emails[0].value,
                    function(err, user){
                        if(err)
                            return next(err);
                        return next(null, user);
                    }
                );
            });
        });
    }
);
