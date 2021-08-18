const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Match User
        User.findOne({ email: email })
            .then(user => {
                console.log('user', user)
                // Create new User
                if (!user) {
                    return done(null, null)
                } else {
                    // Match password
                    console.log('in else')
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            console.log("MATCH")
                            return done(null, user);
                        } else {
                            console.log('NOT MATCH')
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;