import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import * as localStrategy from 'passport-local';
import * as passportJwt from 'passport-jwt';
import User from '../models/usermodel';

const LocalStrategy = localStrategy.Strategy;
const jwtstrategy = passportJwt.Strategy;
const extractjwt = passportJwt.ExtractJwt;

passport.use(
  new jwtstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',

      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { username } = req.body;
        const user = await User.create({ username, email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);






