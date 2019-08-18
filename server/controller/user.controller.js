

const { parse } = require('querystring');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
require('./../models/users.js');
require('../models/thesis.js');
const User = mongoose.model('User');
const Thesis = mongoose.model('Thesis');
const nodemailer = require("nodemailer");

module.exports.register = (req, res, next) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {

            req.body = result;
            console.log(req.body);

            var user = new User();
            user.name = req.body.name;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.password = req.body.password;
            user.userStatus = req.body.userStatus;
            user.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate email address found']);
                    else
                        return next(err);
                }
            });
        });
    }
}

module.exports.authenticate = (req, res, next) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            req.body = result;
            const user = req.body;
            if (!user.email) {
                return res.status(422).json({
                    errors: {
                        email: 'is required',
                    },
                });
            }
            if (!user.password) {
                return res.status(422).json({
                    errors: {
                        password: 'is required',
                    },
                });
            }
            // call for passport authentication
            passport.authenticate('local', (err, user, info) => {
                if (err) return res.status(400).json(err);
                // registered user
                else if (user)
                    return res.status(200).json({
                        "token": user.generateJwt(),
                        "userType": user.userStatus,
                        "id": user.id,
                        "name": user.name + ' ' + user.lastname
                    });
                // unknown user or wrong password 
                else return res.status(404).json(info);
            })(req, res);
        });
    }
}

module.exports.userProfile = (req, res, next) => { }

function collectRequestData(request, callback) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        callback(JSON.parse(body));
    });
}

// set thesis 
module.exports.setThesis = (req, res, next) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            req.body = result;
            var thesis = new Thesis();
            thesis.title = req.body.title;
            thesis.description = req.body.description;
            thesis.professor_id = req.body.professor_id;
            thesis.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['could not']);
                    else
                        return next(err);
                }
            });
        }, err => {
            console.log(err);
        });
    }
}

module.exports.getThesis = (req, res, next) => {
    var id = +req.query.id;
    Thesis.find({ professor_id: id }, (err, docs)=> {
        if (!err)
            res.status(200).json({ thesis: docs });
        else
            res.status(500).json({ error: err });
    });
}



module.exports.upload = (req, res, next) => {
    var cvref = req.query.cvref;
    var emailAddress = req.query.email;
    let transporter = nodemailer.createTransport({
        service:'gmail',
         auth: {
           user: '	thesisportalude@gmail.com', // generated ethereal user
           pass: 'Nishath786$' // generated ethereal password
         }
       });
     let message ={ 
         from:'	thesisportalude@gmail.com',
         to:emailAddress,
         subject:'Regarding Student CV',
         text:cvref
     }
       
     transporter.sendMail(message,function(err){
        if(err){
            console.log('failed to sen email');
            console.log(err);
            return;
        }
        console.log('Email Sent');
       });
     
}
