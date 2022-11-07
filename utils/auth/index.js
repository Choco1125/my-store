const passport = require('passport');
const localStrategy = require('./strategies/local.stategy');
const jwtStrategy = require('./strategies/jwt.strategy');

passport.use(localStrategy);
passport.use(jwtStrategy);
