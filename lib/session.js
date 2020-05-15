'use strict'

module.exports = function (rol) {
    return function (req, res, next) {
        //verific
        if (!req.session.User) {
            res.redirect('/login');
            return;
        }
        next();
    }
}
