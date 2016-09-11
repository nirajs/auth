var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var cuser = require('../../server/controllers/user.controller');

// this is used for register and login both
module.exports = new FacebookStrategy({
        clientID: config.facebook.AppID,
        clientSecret: config.facebook.AppSecret,
        callbackURL: config.facebook.callbackUrl,
        profileFields: config.facebook.profileFields
    },
    function(accessToken, refreshToken, profile, next){
        process.nextTick(function(){
            cuser.findByFacebookID(profile.id, function(err, user){
                if(err)
                    return next(err);

                // else the user is found so log them in
                if(user)
                    return next(null, user);
                else {
                    // we do not find any user so perform the registration of user
                    cuser.createByFacebook(
                        profile.id,
                        accessToken,
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
                }
            });
        });
    }
);
