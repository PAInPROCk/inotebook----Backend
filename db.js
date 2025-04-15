const mongoose = require('mongoose');
require('dotenv').config();  // Ensure dotenv is loaded
const mongoURI = process.env.MONGO_URI;

async function connectToMongo() {
    if (!mongoURI) {
        console.log("Mongo URI is not defined!");
        return;
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
}

module.exports = connectToMongo;