const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String, required: true },
    is_watched: { type: Boolean, default: false },
    calendar_day: { type: String }, // Format: YYYY-MM-DD
    likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);