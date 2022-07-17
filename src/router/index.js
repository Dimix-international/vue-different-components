import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import HomePage from "@/views/HomePage";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutPage.vue'),
    },
    {
        path: '/weight',
        name: 'Weight',
        component: () => import('@/views/WeightPage.vue'),
    },
    {
        path: '/rock-paper-scissors',
        name: 'RockPaperScissorsGame',
        component: () => import('@/views/RockPaperScissorsGame.vue'),
    },
    {
        path: '/tic-tac-toe',
        name: 'TicTacToe',
        component: () => import('@/views/TicTacToeGame.vue'),
    },
    {
        path: '/speech-recognition',
        name: 'SpeechRecognition',
        component: () => import('@/views/SpeechRecognition.vue'),
    },
    {
        path: '/quiz',
        name: 'Quiz',
        component: () => import('@/views/QuizPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

export default router;