'use strict'

const basicAuth = require('basic-auth');
const Users = require('../models/Users');
 async function post(req, res, next) {
    try {

        const email = req.body.email;
        const password = req.body.password;

        console.log(email);

        //Search BDD
        const usersbdd = await Users.findOne({ email: email });
        
    } catch (err) {
        next(err);
    }

}



module.exports = function () {
    return (req, res, next) => {
        const user = basicAuth(req);
        

        if (!user || user.name != 'admin' || user.pass !== '1234') {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        }
        next();
    };

}