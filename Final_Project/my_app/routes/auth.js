const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../controllers/User');
const GoogleStrategy = require('passport-google-oidc');

async function googleAuthUser(issuer, profile, done) {
    User.save(profile.displayName, profile.emails[0].value);
    return done(null, profile);
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile', 'email' ],
}, googleAuthUser));

/* GET google login. */
router.get('/login/federated/google', passport.authenticate('google'));

/* GET google redirect. */
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/students',
  failureRedirect: '/',
}));

module.exports = router;