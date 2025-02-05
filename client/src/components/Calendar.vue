<template>
    <section>
        <div class="grid-movie hidden lg:grid grid-cols-7 gap-2">
            <div class="" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <Splide 
            :options="splideOptions" 
            aria-label="Movies of the month"
            class="splideCalendar"
        >
            <SplideSlide 
                v-for="(day, index) in daysInMonth" 
                :key="index"
                :class="{
                    'border-4 border-teal-400 shadow': day.isToday,
                    'future-day': day.isFuture,
                    'has-movie': day.movie
                }"
                class="cursor-pointer relative w-full h-[200px] lg:h-[100px] bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg overflow-hidden group"
            >
                <img v-if="day.movie" :src="day.movie.image" :alt="day.movie.title" class="w-full h-full object-cover opacity-55 lg:opacity-100 transition-opacity duration-300 lg:group-hover:opacity-20" />
                <p 
                    class="absolute bottom-1 md:bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 flex justify-center text-sm items-center font-bold bg-gradient-to-r from-slate-900 to-slate-700 text-slate-200 rounded-full"
                    :class="{'bg-gradient-to-b from-teal-500 to-teal-400 shadow-navLink': day.isToday}"
                >
                    {{ day.date }}
                </p>
                <p v-if="day.movie" class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[95%] mx-auto text-center font-medium  lg:leading-4 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">{{ day.movie.title }}</p>
            </SplideSlide>
        </Splide>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllMovies } from '../api'; // Use getAllMovies instead of getMovieOfTheDay
import moment from 'moment-timezone';

const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const daysInMonth = ref([]);

const generateCalendar = async () => {
    const currentDate = moment().tz('Europe/Paris');
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month();

    // Get the first and last days of the month
    const firstDay = moment.tz({ year: currentYear, month: currentMonth, day: 1 }, 'Europe/Paris');
    const lastDay = moment.tz({ year: currentYear, month: currentMonth, day: firstDay.daysInMonth() }, 'Europe/Paris');

    // Calculate padding days (empty cells) before the first day
    const firstDayOfWeek = firstDay.day(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const paddingDays = firstDayOfWeek; // No adjustment needed; Sunday is already the first column

    const days = [];

    // Add empty days at the beginning of the calendar
    for (let i = 0; i < paddingDays; i++) {
        days.push({
            date: null, // No date for padding days
            isFuture: false,
            movie: null,
        });
    }

    // Fetch all movies once
    const allMovies = await getAllMovies();

    // Add actual days of the month
    for (let day = 1; day <= lastDay.date(); day++) {
        const currentDay = moment.tz({ year: currentYear, month: currentMonth, day }, 'Europe/Paris').format('YYYY-MM-DD');
        const movieForDay = allMovies.find((movie) => movie.calendar_day === currentDay);

        days.push({
            date: day,
            isFuture: moment(currentDay).isAfter(currentDate, 'day'),
            isToday: currentDay === currentDate.format('YYYY-MM-DD'), // Check if the day is "today"
            movie: movieForDay || null,
        });
    }

    daysInMonth.value = days;
};


onMounted(generateCalendar);

const splideOptions = ref({
    type: 'slide',
    pagination: false,
    mediaQuery: 'min',
    perPage: 1,
    padding: {right: '2rem'},
    gap: '0.5rem',
    breakpoints: {
        300: {
            perPage: 2,
            perMove: 2,
        },
        425: {
            perPage: 3,
            perMove: 3,
        },
		550: {
			perPage: 4,
			perMove: 4,
		},
		768: {
			perPage: 6,
            perMove: 6,
		},
		1024: {
            destroy: true
		},
    }
})
</script>


<style>
@media only screen and (min-width: 1024px) {
    .splideCalendar ul {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
    }
}
.splide__arrow--prev, .splide__arrow--next {
    width: 45px !important;
    height: 45px !important;
    background-image: linear-gradient(to right, #0f172a, #334155) !important;
    box-shadow: 0 5px 5px black;
}
.splide__arrow--prev {
    left: 0.25rem !important
}
.splide__arrow--next {
    right: 0.25rem !important
}
.splide__arrow svg {
    fill: white !important;
}
</style>