const router = require("express").Router();
const passport = require("passport");

//Local authentication route
router.post("/login/local", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.status(401).send({ message: "Username or Password is incorrect." });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successful Login");
      });
    }
  })(req, res, next);
});

//Google authentication route
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/redirect",
  passport.authenticate("google", {
    failureRedirect:
      "https://mern-task-manager-nikitabatlis1.herokuapp.com/login",
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(
      `https://mern-task-manager-nikitabatlis1.herokuapp.com/dashboard`
    );
  }
);

//Facebook authentication route
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/login/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect:
      "https://mern-task-manager-nikitabatlis1.herokuapp.com/login",
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(
      `https://mern-task-manager-nikitabatlis1.herokuapp.com/dashboard`
    );
  }
);

module.exports = router;
