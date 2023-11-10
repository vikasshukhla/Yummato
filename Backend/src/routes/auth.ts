import express from "express";
import passport from "passport";
import { isUserAuthenticated } from "../middlewares/auth";

const router = express.Router();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in!");
  }
);

router.get("/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.send("Logged Out successfully");
});

module.exports = router;
