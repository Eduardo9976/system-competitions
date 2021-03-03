import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/Home/index.vue')
const CreateCompetition = () => import('../views/CreateCompetition/index.vue')

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
