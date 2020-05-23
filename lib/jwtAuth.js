'use strict'

//middleware de JWT

const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        //recoger token
        const token = req.get('Authorization') || req.query.token || req.body.token;
        

        //si no hay token 
        if (!token) {
            const error = new Error('no token provided');
            error.status = 401;
            next(error);
            return;
        }
        //verificar token

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                const error = new Error('invalid token');
                error.status = 401;
                next(error);
                return;
            }
            req.apiAuthUserId = payload._id;

            next();
        });
    };
}