import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
    { 
        path: '/', 
        name: 'Home',
        component: HomeView
    },
    { 
        path: '/calendrier', 
        name: 'Calendar',    
        component: CalendarView
    },
    { 
        path: '/a-propos', 
        name: 'About',    
        component: AboutView
    }
]

const router = createRouter({
    linkExactActiveClass: 'bg-gradient-to-b from-teal-500 to-teal-400 shadow-navLink',
    history: createWebHistory(),
    routes,
})

export default router