var jwt = require('jsonwebtoken');
var config = require('../config/config');

// route file for handle google auth login and register
module.exports = function(app, passport){

    // route for calling google for authenticating the user
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // TODO handle failure redirection correctly. Instead of redirecting to /login (which doesn't exist) pass a message to the client
    // google will reply by calling the /auth/google/callback with the authenticated user
    app.get('/auth/google/callback', passport.authenticate('google',
        {failureRedirect: '/login'}),
        // user is successfully authenticated
        function(req, res){
            // make a jwt token with the user and send it as cookie to the client
            var token = jwt.sign(req.user, config.secretKey);
            console.log("user:"+ req.user);
            res.cookie("token", token);
            //console.log("cookie" +  res.cookie);

            // server will redirect to the home page of client which on detecting the jwt token redirects to the dashboard
            res.redirect('/');
    });
};
