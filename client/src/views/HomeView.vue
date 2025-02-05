<template>
    <div v-if="movie">
        <h1 class="mb-2 lg:mb-10 block text-center text-3xl md:text-5xl font-thin">Tu dois regarder :</h1>
        <MovieCard v-if="movie" :movie="movie" />
    </div>
    <div v-else>
        <p class="text-center mt-5">Film du jour en chargement...</p>
    </div>
</template>

<script setup>
import MovieCard from '../components/MovieCard.vue';
import { getMovieOfTheDay } from '../api';
import { ref, onMounted } from 'vue';

const movie = ref(null);

onMounted(async () => {
  try {
    movie.value = await getMovieOfTheDay(); // Fetch the movie of the day
  } catch (error) {
    console.error('Error fetching the movie of the day:', error.message);
  }
});
</script>