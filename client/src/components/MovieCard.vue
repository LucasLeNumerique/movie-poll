<template>
    <div class="movie-card mx-auto max-w-[450px] md:max-w-none md:w-[750px] md:p-3 md:flex justify-between bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg overflow-hidden">
        <img :src="movie.image" :alt="movie.title" class="w-full md:w-1/2 h-[20vh] sm:h-[20vh] md:h-[initial] md:rounded-md object-cover" />
        <div class="py-3 px-1 md:py-5 md:px-3 md:flex flex-col justify-center text-center">
            <h2 class="text-2xl md:text-3xl leading-7 font-medium">{{ movie.title }}</h2>
            <h3 class="text-base md:text-lg font-medium md:leading-7">({{ movie.year }})</h3>
            <h3 class="text-lg md:text-xl md:leading-7">{{ movie.author }}</h3>
            <hr class="w-3/4 mx-auto my-2">
            <p class="text-sm md:text-base leading-snug">{{ movie.synopsis }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    movie: { 
        type: Object,
        required: true
    }
})
</script>