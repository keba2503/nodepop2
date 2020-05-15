'use strict'

const bcrypt = require('bcrypt')

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

            if (!users ||!await bcrypt.compare(password, users.password)) {
                res.locals.email = email;
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;

            }

            req.session.User = {
              _id:  users._id

            };

            // users correct
            res.redirect('/private');

            //email
            await users.sendEmail(process.env.ADMIN_EMAIL, 'Login sospechoso', `
        Has ingresado a tu cuenta.
      `);



        } catch (err) {
            next(err);
        }

    }


    // Logout
    logout(req, res, next){
        req.session.regenerate(err => {
            if(err) {
                next(err);
                return;
            }
            res.redirect('/');
        })
    }
}

module.exports = new Login();