var auth = require("../config/auth")
module.exports = function (app, passport) {

    // passport-local for authenticating user through local db
    require('./register')(app);
    require('./login')(app);

    // TODO: facebook loggin
    // passport-facebook for authenticating user through facebook
    //require('./facebook')(app, passport);

    // passport-google for authenticating user through google
    require('./google')(app, passport);


    //
    require('./ground')(app);
    //require('./question')(app);
    //require('./quiz')(app);


    //app.use('/api');

    //require('./users')(app);

    // place this at the bottom always
    /////////////////////////////////
    //  home page
    /////////////////////////////////
    app.get('*', function (req, res) {
        //console.log("cookie" + req.cookie);
        res.send('Hey there </br>'  + "session info " + JSON.stringify(req.session) + "</br>" + "cookies " + JSON.stringify(req.cookies)
        +"<br> User Data" + JSON.stringify(auth.getUser(req.cookies.token)));

    });

};
