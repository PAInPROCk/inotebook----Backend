const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');

router.post('/', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
], async (req, res) => {  
  const errors = validationResult(req);
  
  // Fix variable name from 'error' to 'errors'
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });  // Fix 'set.status' to 'res.status'
  }

  try {
    console.log(req.body);
    const user = new User(req.body);  
    await user.save();                
    res.status(201).send(user);       
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
