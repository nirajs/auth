var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// defining the user schema
var UserSchema = new mongoose.Schema(
    {
			  email: String,
        password: String,
        first_name: String,
        middle_name: String,
        last_name: String,
        mobile: String,
        facebook: {
            id: String,
            token: String
        },
        google: {
            id: String,
            token: String
        }
    });

// methods for user

// method for generating hash of the password
UserSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// method for comparing the hash password with the actual password of the user
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// method for removing password and mongodb document version during returning the user object.
UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user.facebook;
    delete user.google;
    return user;
};

module.exports = mongoose.model('User', UserSchema);
