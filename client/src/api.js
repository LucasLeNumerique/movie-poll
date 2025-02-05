import axios from 'axios';

// Dynamically set the API URL based on the environment
// const API_URL = "http://localhost:3000/api";
const API_URL = import.meta.env.VITE_API_URL;

// Fetch all movies
export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all movies:', error.message);
    throw error;
  }
};

// Fetch the movie of the day
export const getMovieOfTheDay = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies/movie-of-the-day`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the movie of the day:', error.message);
    throw error;
  }
};

export default API_URL;