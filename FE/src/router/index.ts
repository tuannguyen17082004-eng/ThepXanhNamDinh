import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { isAdmin } from '@/middlewares/isAdmin'

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
import History from '@/views/User/History.vue'
import Introduction from '@/views/User/Introduction.vue'
import UpdateProfile from '@/views/User/UpdateProfile.vue'
import NotFound from '@/views/User/NotFound.vue'
import PlayerDetail from '@/views/User/PlayerDetail.vue'
import Login from '@/views/User/Login.vue'
import Register from '@/views/User/Register.vue'
import RegisterOTP from '@/views/User/RegisterOTP.vue'
import ForgetPasswordEmail from '@/views/User/ForgetPasswordEmail.vue'
import ResetPassword from '@/views/User/ResetPassword.vue'
import Profile from '@/views/User/Profile.vue'
import Admin from '@/views/Admin/Admin.vue'
import MatchManagement from '@/views/Admin/MatchManagement.vue'
import NewsManagement from '@/views/Admin/NewsManagement.vue'
import PlayersManagement from '@/views/Admin/PlayersManagement.vue'
import VideoManagement from '@/views/Admin/VideoManagement.vue'
import UserManagement from '@/views/Admin/UserManagement.vue'
import ChangePassword from '@/views/User/ChangePassword.vue'
import AddPlayer from '@/views/Admin/AddPlayer.vue'
import UpdatePlayer from '@/views/Admin/UpdatePlayer.vue'
import AddNews from '@/views/Admin/AddNews.vue'
import UpdateNews from '@/views/Admin/UpdateNews.vue'
import AddVideo from '@/views/Admin/AddVideo.vue'
import UpdateVideo from '@/views/Admin/UpdateVideo.vue'
import UserDetail from '@/views/Admin/UserDetail.vue'
import AddAdmin from '@/views/Admin/AddAdmin.vue'
import AddMatch from '@/views/Admin/AddMatch.vue'
import UpdateMatch from '@/views/Admin/UpdateMatch.vue'
import TicketPrice from '@/views/User/TicketPrice.vue'
import Charter from '@/views/User/Charter.vue'
import Careers from '@/views/User/Careers.vue'
import ContactUs from '@/views/User/ContactUs.vue'
import TermOfUse from '@/views/User/TermOfUse.vue'
import PrivacyPolicy from '@/views/User/PrivacyPolicy.vue'

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
    {path: 'ForgetPasswordEmail', component: ForgetPasswordEmail},
    {path: 'ResetPassword', component: ResetPassword},
    {path: 'ChangePassword', component: ChangePassword},
    {path: ':pathMatch(.*)*', component: NotFound},
    {path: 'Profile', component: Profile},
    {path: 'Introduction', component: Introduction},
    {path: 'History', component: History},
    {path: 'UpdateProfile', component: UpdateProfile},
    {path: 'TicketDetail', component: TicketPrice},
    {path: 'Charter', component: Charter},
    {path: 'Careers', component: Careers},
    {path: 'ContactUs', component: ContactUs},
    {path: 'TermOfUse', component: TermOfUse},
    {path: 'PrivacyPolicy', component: PrivacyPolicy},
    {path: 'RegisterOTP', component: RegisterOTP}
  ]
},
{
  path: '/Admin',
  component: () => import('@/views/Admin/AdminApp.vue'),
  beforeEnter: isAdmin,
  children: [
    {path: '', component: Admin},
    {path: 'News', component: NewsManagement},
    {path: 'Players', component: PlayersManagement},
    {path: 'Players/Add', component: AddPlayer},
    {path: 'Players/:id', component: UpdatePlayer},
    {path: 'Video', component: VideoManagement},
    {path: 'News/Add', component: AddNews},
    {path: 'News/:id', component: UpdateNews},
    {path: 'Video/Add', component: AddVideo},
    {path: 'Video/:id', component: UpdateVideo},
    {path: 'Users', component: UserManagement},
    {path: 'Users/Add', component: AddAdmin},
    {path: 'Users/:id', component: UserDetail},
    {path: 'Match', component: MatchManagement},
    {path: 'Match/Add', component: AddMatch},
    {path: 'Match/:id', component: UpdateMatch}
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
