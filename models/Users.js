'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailerTransport = require('../lib/nodemailer');

//schematic creation
//https://mongoosejs.com/docs/schematypes.html
const usersSchema = mongoose.Schema({
 email : {type: String, unique: true},
 password : {type: String},
});

usersSchema.statics.hashPassword = function(plainPasword) {
    return bcrypt.hash(plainPasword, 10);

}

usersSchema.methods.sendEmail = function(from, subject, body){
 

    return nodemailerTransport.sendMail({
        from: from,
        to: this.email,
        subject: subject,
        html: body
      });

}

//Models creation
const Users = mongoose.model('Users', usersSchema);


//Export
module.exports = Users;
