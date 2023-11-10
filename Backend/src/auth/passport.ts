const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
import { User } from "../models/mongodb.model";

const GOOGLE_CALLBACK_URL = "http://localhost:8000/api/v1/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqTocallback: true,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      const newUser = {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      };

      console.log(profile);
      let user;
      try {
        user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error("Error Signing in", err);
        done(err, user);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  console.log("Serializing user:", user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log("Error deserializing", err);
      done(err, null);
    });
});
