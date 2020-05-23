'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

class Login {

    // GET

    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    //post

    async post(req, res, next) {
        try {

            const email = req.body.email;
            const password = req.body.password;

            //Search BDD
            const users = await Users.findOne({ email: email });


            //Coincidence

            if (!users || !await bcrypt.compare(password, users.password)) {
                res.locals.email = email;
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;

            }

            req.session.User = {
                _id: users._id

            };

            // users correct
            res.redirect('/web');

            //email
            await users.sendEmail(process.env.ADMIN_EMAIL, 'Login sospechoso', `
        Has ingresado a tu cuenta.
      `);



        } catch (err) {
            next(err);
        }

    }

    //post api/loginJWT

    async postJWT(req, res, next) {
        try {

            const email = req.body.email;
            const password = req.body.password;

            //Search BDD
            const users = await Users.findOne({ email: email });


            //Coincidence

            if (!users || !await bcrypt.compare(password, users.password)) {
                const error = new Error('Invalid credentials');
                error.status = 401;
                next(error);
                return;

            }

            //JWT
            const token = jwt.sign({ _id: users._id }, process.env.JWT_SECRET, {
                expiresIn: '2d'
            })


            //Response
            res.json({ token: token });

        } catch (err) {
            next(err);
        }

    }

    // Logout
    logout(req, res, next) {
        req.session.regenerate(err => {
            if (err) {
                next(err);
                return;
            }
            res.redirect('/');
        })
    }
}

module.exports = new Login();