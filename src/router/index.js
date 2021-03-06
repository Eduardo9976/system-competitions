import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/Home/index.vue')
const CreateCompetition = () => import('../views/CreateCompetition/index.vue')
const Competition = () => import('../views/Competition/index.vue')
const Congrats = () => import('../views/Congrats')

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
  },
  {
    path: '/congrats',
    name: 'Congrats',
    component: Congrats
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

export default router
