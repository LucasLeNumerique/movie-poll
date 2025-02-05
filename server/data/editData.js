const mongoose = require('mongoose');
require('dotenv').config(); // Add this if it's missing
const connectDB = require('../config/db'); // Import your existing DB connection setup
const Movie = require('../models/Movie');  // Import the Movie model

async function updateMovie() {
  try {
    // Connect to the MongoDB server
    await connectDB();
    console.log("Connected to database");

    // Perform the update
    const result = await Movie.updateOne(
      { title: "La vie est un long fleuve tranquille" },
      {
        $set: { calendar_day: "2025-01-17" },
        $currentDate: { lastUpdated: true }
      }
    );

    console.log("Update result:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection
    mongoose.connection.close(); // Close connection
    console.log('Connection closed.');
  }
}

updateMovie();