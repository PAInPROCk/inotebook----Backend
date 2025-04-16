const express = require('express');
const app = express();
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');

connectToMongo();

app.use(express.json()); // for parsing JSON in request body

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('API is up and running 🚀');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});
