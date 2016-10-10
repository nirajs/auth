var User = require('../models/user');

/**
 * method for finding user by email
 */
var findByEmail = function (email, next) {
    User.findOne({email: email}, function (err, user) {
        if (err)
            { return next(err); }
        return next(null, user);
    });
};

/**
 * method for finding user by user_id
 * @param id : user_id in database
 * @param next
 */
var findByID = function(id, next) {
    User.findOne({_id: id}, function(err, user) {
        if(err)
            return next(err);
        return next(null, user);
    });
};

/**
 * method for finding user by facebook id
 */
var findByFacebookID = function (id, next) {
    User.findOne({'facebook.id': id}, function (err, user) {
        if (err)
            return next(err);
        return next(null, user);
    });
};

/**
 * method for finding user by google id
 * @param id
 * @param next
 */
var findByGoogleID = function (id, next) {
    User.findOne({'google.id': id}, function (err, user) {
        if (err)
            return next(err);
        return next(null, user);
    });
};

/**
 * create user with email and password
 * @param email
 * @param password
 * @param next
 */
var create = function (email, password, next) {
    findByEmail(email, function (err, user) {
        if (err)
            return next(err);

        if (user) {
            return next(new Error('An account with that email is already exists.'));
        }

        user = new User({email: email, password: User.generateHash(password)});
        user.save();
        return next(null, user);
    });
};

/**
 * method for creating a user through Facebook button
 * @param id : facebook profile id
 * @param token : token provided by the facebook
 * @param first_name : given name
 * @param middle_name : middle name
 * @param last_name : family name
 * @param email : first email from the array of emails provided by the facebook
 * @param next
 */
var createByFacebook = function (id, token, first_name, middle_name, last_name, email, next) {
    // we do not need to run findByFacebookID method here as it is already checked in above function
    // and no user is find. But we need to check if user had previously register with email or through
    // google. In that case we do not need to create a new entry, we just have to update the user


    // we fist have to check if a user with given email exists in db or not
    findByEmail(email, function (err, user) {
        if (err)
            return next(err);
        if (!user) {
            // no user is found, so simply create a new user with all the details
            user = new User({
                'facebook.id': id,
                'facebook.token': token,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                email: email
            });
        }

        // user is found, so we have to update the facebook id and token in the record
        user.facebook.id = id;
        user.facebook.token = token;

        // TODO check and update if other fields also needs to be updated

        // finally save the user and return the user object
        user.save();
        return next(null, user);
    });
};

/**
 * method for creating the user with google credentials
 * @param id
 * @param token
 * @param first_name
 * @param middle_name
 * @param last_name
 * @param email
 * @param next
 * @returns Error or user object
 */
var createByGoogle = function (id, token, first_name, middle_name, last_name, email, next) {
    // we do not need to run findByGoogleID method here as it is already checked in above function
    // and no user is find. But we need to check if user had previously register with email or through
    // facebook. In that case we do not need to create a new entry, we just have to update the user

    // we first have to check if a user with given email exists in db or not
    findByEmail(email, function (err, user) {
        if (err)
            return next(err);
        if (!user) {
            // no user is found, so simply create a new user with all the details
            user = new User({
                'google.id': id,
                'google.token': token,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                email: email
            });
        }

        // user is found, so we have to update the google id and token in the record
        user.google.id = id;
        user.google.token = token;

        // TODO check and update if other fields also needs to be updated

        // finally save the user and return the user object
        user.save();
        return next(null, user);
    });
};

/**
 * Method for saving details of user.
 * @param user object
 * @param next
 */
var saveUser = function (user, next) {
    // save the details of the user whose email is same as the email of the supplier user object
    //findByEmail(user.email, function(err, user) {
    //    if(err)
    //        return next(err);
    //    if(!user)
    //        return next(new Error('No user with the specified email exists'));
    //    else {
    //
    //    }
    //});
    User.update({email: user.email}, {first_name: user.first_name}, {upsert: true}, function(err){
        return next(err);
    })
};

module.exports = {
    findByEmail: findByEmail,
    findByID: findByID,
    findByFacebookID: findByFacebookID,
    findByGoogleID: findByGoogleID,
    create: create,
    createByFacebook: createByFacebook,
    createByGoogle: createByGoogle,
    saveUser: saveUser
};
