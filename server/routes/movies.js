const express = require('express');
const moment = require('moment-timezone'); // Import moment-timezone
const Movie = require('../models/Movie'); // Import the Movie model
const router = express.Router();

// Get All Movies for Calendar
router.get('/', async (req, res) => {
    try {
        // Fetch all movies with a calendar_day and sort by date
        const movies = await Movie.find({ calendar_day: { $ne: null } }).sort({ calendar_day: 1 });
        res.json(movies);
    } catch (error) {
        console.error('Error fetching all movies:', error.message);
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
});

// Get Movie of the Day
router.get('/movie-of-the-day', async (req, res) => {
    try {
        const today = moment().tz('Europe/Paris').format('YYYY-MM-DD');
        console.log(`Today's date: ${today}`);

        // Find today's movie
        let movie = await Movie.findOne({ calendar_day: today });
        console.log(`Movie found for today: ${movie ? movie.title : 'None'}`);

        if (!movie) {
            console.log('No movie of the day found. Rolling a new movie...');
            movie = await Movie.findOneAndUpdate(
                { is_watched: false, calendar_day: null },
                { $set: { calendar_day: today } },
                { new: true }
            );
            console.log(`Rolled new movie: ${movie ? movie.title : 'None'}`);

            if (!movie) {
                return res.status(404).json({ message: 'No unwatched movies available.' });
            }
        }

        res.json(movie);
    } catch (error) {
        console.error('Error in /movie-of-the-day:', error.message);
        res.status(500).json({ message: 'Error fetching movie of the day', error: error.message });
    }
});

module.exports = router;
