const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.post('/', async (req, res) => {  
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
