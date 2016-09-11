var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function (app, passport) {

    // call to facebook for authenticating user
    // in response to this call, facebook will reply in /auth/facebook/callback with the user object
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    // TODO handle failure redirection correctly. Instead of redirecting to /login (which doesn't exist) pass a message to the client
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {failureRedirect: '/login'}), function (req, res) {

        // user successfully authenticated by facebook
        // make a jwt token with the user and send it as cookie to the client
        var token = jwt.sign(req.user, config.secretKey);
        res.cookie("token", token);

        // server will redirect to the home page of client which on detecting the jwt token redirects to the dashboard
        res.redirect('/');
    });
};
