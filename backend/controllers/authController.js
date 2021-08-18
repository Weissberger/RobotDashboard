const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");


exports.login = (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        console.log(user, 'user')
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err, 'this is the error');
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
}

exports.register = async(req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if(user) return res.status(401).send('User already exists')
    const {email, password} = req.body
    const newUser = new User({ email, password });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    console.log(newUser, 'getting this user')
                    return res.status(200).send("success");
                })
                .catch(err => {
                    return res.status(401).send('error');
                });
        });
    });
}


exports.logout = (req, res, next) => {
    req.logout()
    res.status(200).send('successfully logged out user')
}

