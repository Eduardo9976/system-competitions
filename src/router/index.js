import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/Home/index.vue')
const CreateCompetition = () => import('../views/CreateCompetition/index.vue')
const Competition = () => import('../views/Competition/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-competition',
    name: 'CreateCompetition',
    component: CreateCompetition
  },
  {
    path: '/competition',
    name: 'Competition',
    component: Competition
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
