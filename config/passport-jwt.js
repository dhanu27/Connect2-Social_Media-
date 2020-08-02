const passport = require("passport");
const { Strategy } = require("passport");
const passportJWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/usersDB");
const env = require("./enviornment");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_key,
};

passport.use(
  new passportJWTstrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload._id, function (err, user) {
      if (err) {
        console.log("Error in finding user JWT", err);
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

module.exports = passport;
