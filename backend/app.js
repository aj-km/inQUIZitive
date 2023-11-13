const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "637527376373-tb6a8toel5sv4egljc7rq4h8dcnm9vqv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/home",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database
        const existingUser = await User.findOne({ googleID: profile.id });

        if (existingUser) {
          // User already exists, return the user
          return done(null, existingUser);
        }

        // If the user doesn't exist, create a new user in your database
        const newUser = new User({
          googleID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          // Other user properties as needed
        });

        const savedUser = await newUser.save();
        done(null, savedUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user (similar to what we did before)

// Set up Google authentication routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to the home page or any other route
    res.redirect("/home");
  }
);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
//using middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//importing routes
const quizRoutes = require("./routes/quiz");
const user = require("./routes/user");
//using routes
app.use("/api/v1", user);
app.use("/api", quizRoutes);

module.exports = app;
