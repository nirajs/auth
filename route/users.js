var express = require('express');
var router = express.Router();
var cuser = require('../controllers/user.server.controller');

/* GET users listing. */
module.exports = function (app) {
    app.use('/api', router);


    router.route('/user/:user_id')
        .get(function (req, res) {
            cuser.findByID(req.params.user_id, function (err, user) {
                if (err)
                    res.json({success: false, servererror: true, error: err});
                res.json({success: true, user: user});
            });
        })

        .put(function (req, res) {
            cuser.findByID(req.params.user_id, function (err, user) {
                if (err)
                    res.json({success: false, servererror: true, error: err});
                //console.log('user : ' + JSON.stringify(user));
                user.first_name = req.body.user.first_name;
                user.middle_name = req.body.user.middle_name;
                user.last_name = req.body.user.last_name;
                user.mobile = req.body.user.mobile;
                user.save(function(err){
                    if(err)
                        res.json({success: false, servererror: true, error: err});
                    res.json({success: true, user: user});
                });
            });
        })


};
