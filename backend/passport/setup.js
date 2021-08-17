const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    console.log("CALLING SERIALIZE??!?!")
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('getting called/??!?!?', id)
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
                    // const newUser = new User({ email, password });
                    // Hash password before saving in database
                    // bcrypt.genSalt(10, (err, salt) => {
                    //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                    //         if (err) throw err;
                    //         newUser.password = hash;
                    //         newUser
                    //             .save()
                    //             .then(user => {
                    //                 return done(null, user);
                    //             })
                    //             .catch(err => {
                    //                 return done(null, false, { message: err });
                    //             });
                    //     });
                    // });
                    // Return other user
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