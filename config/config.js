// TODO change the reference of localhost to the real server address
// TODO remove this file from github
module.exports = {
    'dbconnect': 'mongodb://localhost/auth',
    'secretKey': 'whatever',
    'facebook': {
        'AppID': '1130177717107903',
        'AppSecret' : 'aed376951dd13c25688a2cc7af56329d',
        'callbackUrl': 'http://localhost:4000/auth/facebook/callback',
        'profileFields': ['id', 'emails', 'first_name', 'middle_name', 'last_name']
    },
    'google': {
        'clientID': '430964866951-a7sqdh8cmd8psd6upsoog1lk0jh08ke5.apps.googleusercontent.com',
        'clientSecret': 'A_7f2MiADRfrAfhTgHWoPJQK',
        'callbackUrl': 'http://localhost:4000/auth/google/callback'
    }
};
