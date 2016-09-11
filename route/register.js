var jwt = require('jsonwebtoken');
var config = require('../config/config');
var cuser = require('../controllers/user.controller');
var lowerCase = require('lower-case')

module.exports = function(app) {

    app.post('/register', function (req, res) {
        var email = lowerCase(req.body.email);
        var password = req.body.password;

        process.nextTick(function(){
            // first check whether a user with this email exist or not
            cuser.findByEmail(email, function (err, user) {
                if (err)
                    return res.json({success: false, servererror: true, error: err});
                else if (user)
                    return res.json({success: false, error: "A user with this email already exist"});
                else {
                    cuser.create(email, password, function (err, user) {
                        if (err)
                            res.json({success: false, servererror: true, error: err});

                        // user is created so form jwt token
                        var token = jwt.sign(user, config.secretKey);

                        // return the token
                        return res.json({success: true, token: token});
                    });
                }
            })
        });


    });
};
