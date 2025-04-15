const express = require('express');
const app = express();
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');

connectToMongo();

app.use(express.json()); // for parsing JSON in request body

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// add this
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});
