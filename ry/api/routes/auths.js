const express = require("express");
const router = express.Router();
const User = require("../models/User.js");




router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = await new User({
      username,
      password
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: "Kullanıcı adını tekrar giriniz" });
      }

      const passw = await User.findOne({ password });
  
      if (!passw) {
        return res.status(401).json({ error: "Şifrenizi tekrar giriniz" });
      }
  
  

  
      res.status(200).json({
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

module.exports = router;