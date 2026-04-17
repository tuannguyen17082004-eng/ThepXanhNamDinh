import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Homepage from '@/views/User/Homepage.vue'
import Player from '@/views/User/Player.vue'
import News from '@/views/User/News.vue'
import Schedule from '@/views/User/Schedule.vue'
import ScheduleDetail from '@/views/User/ScheduleDetail.vue'
import Video from '@/views/User/Video.vue'
import VideoDetail from '@/views/User/VideoDetail.vue'
import Stadium from '@/views/User/Stadium.vue'
import Honours from '@/views/User/Honours.vue'
import NewsDetail from '@/views/User/NewsDetail.vue'
import NotFound from '@/views/User/NotFound.vue'
import PlayerDetail from '@/views/User/PlayerDetail.vue'
import Login from '@/views/User/Login.vue'
import Register from '@/views/User/Register.vue'
import Profile from '@/views/User/Profile.vue'
import Admin from '@/views/Admin/Admin.vue'

const routes = [{
  path: "/", 
  component: () => import('@/views/User/UserApp.vue'),
  children: [
    {path: '', component: Homepage},
    {path: 'Squad', component: Player},
    {path: 'Squad/:id', component: PlayerDetail},
    {path: 'News', component: News},
    {path: 'News/:id', component: NewsDetail, props: true},
    {path: 'Schedule', component: Schedule},
    {path: 'Schedule/:id', component: ScheduleDetail, props: true},
    {path: 'Video', component: Video},
    {path: 'Video/:id', component: VideoDetail, props: true},
    {path: 'Stadium', component: Stadium},
    {path: 'Honours', component: Honours},
    {path: 'Login', component: Login},
    {path: 'Register', component: Register},
    {path: ':pathMatch(.*)*', component: NotFound},
    {path: 'Profile/:id', component: Profile},
  ]
},
{
  path: '/Admin', 
  component: () => import('@/views/Admin/AdminApp.vue'),
  children: [
    {path: '', component: Admin}
  ]
}]


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
