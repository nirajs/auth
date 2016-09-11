var user = require('../controllers/user.controller');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var lowerCase = require('lower-case')

module.exports = function(app){

    app.post('/login', function(req, res){
        var email = lowerCase(req.body.email);
        var password = req.body.password;

        if(!password)
        {
            return res.json({success: false, error: "passowrd cannot be blank "});
        }

        process.nextTick(function(){
            user.findByEmail(email, function(err, user){
                if(err)
                    return res.json({success: false, servererror: true, error: err});
                if(!user || !user.validPassword(password))
                {
                    return res.json({success: false, error: "Wrong email or password"});
                }

                // form jwt token
                var token = jwt.sign(user, config.secretKey);

                // user is found and its password is correct
                return res.json({success: true, token: token});
            });
        });

    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
