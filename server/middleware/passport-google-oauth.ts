import express from "express";
import MySQLStore from "express-mysql-session";
import session from "express-session";
import { PassportStatic, Profile } from "passport";
import GoogleStrategy, { VerifyCallback } from "passport-google-oauth20";
import { User } from "../../@types/User";
import options from "../config/db";

// creates connection also, and automatically creates a session table inside the database.
export const sqlStore = new (MySQLStore(session))(options);

export default function initPassportGoogleOAuth(app: express.Application, passport: PassportStatic) {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"]!,
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
        callbackURL: "http://localhost:3000/oauth2/redirect/google",
        scope: ["email", "profile"],
      },
      async (_, __, profile: GoogleStrategy.Profile, done: VerifyCallback) => {
        try {
          await sqlStore.query(
            "INSERT INTO users (id, firstName, lastName, email, photo) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = VALUES(id)",
            [
              profile.id,
              profile.name?.familyName,
              profile.name?.givenName,
              profile.emails?.at(0)?.value,
              profile.photos?.at(0)?.value,
            ]
          );

          done(null, profile);
        } catch (err) {
          console.error(err);
          done(err, undefined);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: Profile, done) =>
    done(null, {
      id: user.id,
      name: user.displayName,
      email: user.emails?.at(0)?.value,
      photo: user.photos?.at(0)?.value,
    } as User)
  );

  app.use(
    session({
      secret: process.env["COOKIE_SECRET"]!,
      resave: false,
      saveUninitialized: false,
      store: sqlStore,
      cookie: {
        sameSite: "lax",
      },
    })
  );

  app.use(passport.authenticate("session"));

  app.get("/login", passport.authenticate("google"));
  app.get("/oauth2/redirect/google", passport.authenticate("google", { failureRedirect: "/" }), (_, res) => {
    console.log("Redirect route.");
    res.redirect("http://localhost:5173/");
  });
}
