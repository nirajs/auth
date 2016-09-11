var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Config = require('../config/config');

var authenticate=function ensureAuthenticated(req, res, next){
  var token = (req.body && req.body.access_token) || (req.query && req.query.oauth_token) || req.headers['x-access-token'];
  //console.log("token is " + token);

	if(token){
    var decoded = jwt.verify(token, Config.secretKey);
    req.email = decoded.email;
    console.log(decoded);
		console.log("your are authenticated");
    //res.send("your are authenticated");

		//console.log(res.locals.user);
		return next();
	} else {
		res.send({ result: "Failure", message: "Oath Required"});
    //res.send('/users/login');
    return  next();;
	}
}

var getUserFromToken=function(token){
  var decoded = jwt.verify(token, Config.secretKey);
  // name , email , category and id
  return decoded;
}


module.exports = {
    authenticate: authenticate,
    getUser: getUserFromToken
}
