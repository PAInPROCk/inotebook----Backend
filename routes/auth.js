const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken') ;
const JWT_SECRET = 'prathamesh'

router.post('/createuser', [
  body('name', 'Enter a Valid Name').isLength({ min: 3 }),
  body('email', 'Enter a Valid Email').isEmail(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], async (req, res) => {  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt)

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(user);
    res.json({authToken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Already Exists");
  }
});

module.exports = router;
