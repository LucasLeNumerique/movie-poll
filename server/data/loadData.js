require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const connectDB = require('../config/db');
const Movie = require('../models/Movie'); 

// Function to load JSON data into MongoDB
const loadData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await connectDB(); // Use the existing connection logic

        console.log('Loading data from JSON file...');
        const data = JSON.parse(fs.readFileSync('data/movies.json', 'utf8')); // Read your JSON file

        for (const movie of data) {
            // Check if a movie with the same title already exists
            const exists = await Movie.findOne({ title: movie.title });
            if (exists) {
                console.log(`Movie "${movie.title}" already exists. Skipping insertion.`);
            } else {
                // Insert the new movie if it doesn't exist
                await Movie.create(movie);
                console.log(`Movie "${movie.title}" inserted successfully.`);
            }
        }

        console.log('Data processing completed.');
    } catch (error) {
        console.error('Error loading data:', error.message);
    } finally {
        mongoose.connection.close(); // Close connection
        console.log('Connection closed.');
    }
};

loadData();