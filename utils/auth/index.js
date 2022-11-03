const passport = require('passport');
const localStrategy = require('./strategies/local.stategy');
passport.use(localStrategy);
