const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
  body('name', 'Enter a Valid Name').isLength({ min: 3 }),
  body('email', 'Enter a Valid Email').isEmail(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], async (req, res) => {  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Already Exists");
  }
});

module.exports = router;
