import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Homepage from '@/views/Homepage.vue'
import Player from '@/views/Player.vue'
import News from '@/views/News.vue'
import Schedule from '@/views/Schedule.vue'
import ScheduleDetail from '@/views/ScheduleDetail.vue'
import Video from '@/views/Video.vue'
import VideoDetail from '@/views/VideoDetail.vue'
import Stadium from '@/views/Stadium.vue'
import Honours from '@/views/Honours.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import NotFound from '@/views/NotFound.vue'
import PlayerDetail from '@/views/PlayerDetail.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {path: '/', component: Homepage},
  {path: '/Squad', component: Player},
  {path: '/Squad/:id', component: PlayerDetail},
  {path: '/News', component: News},
  {path: '/News/:id', component: NewsDetail, props: true},
  {path: '/Schedule', component: Schedule},
  {path: '/Schedule/:id', component: ScheduleDetail, props: true},
  {path: '/Video', component: Video},
  {path: '/Video/:id', component: VideoDetail, props: true},
  {path: '/Stadium', component: Stadium},
  {path: '/Honours', component: Honours},
  {path: '/Login', component: Login},
  {path: '/Register', component: Register},
  {path: '/:pathMatch(.*)*', component: NotFound},
  {path: '/Profile/:id', component: Profile}
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition){
    if (savedPosition)
      return savedPosition;
    else
      return {top: 0};
  }
})

export default router
