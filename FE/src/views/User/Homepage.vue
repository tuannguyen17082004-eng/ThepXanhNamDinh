<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { type News } from '@/models/news';
import { type Video } from '@/models/video';
import { type Scoreboard } from '@/models/scoreboard';
import { type Match } from '@/models/match';

import { GetAllVideos } from '@/utils/VideoUtils';
import { GetAllNews } from '@/utils/NewUtils';
import { GetScoreboard } from '@/utils/ScoreboardUtils';
import { GetAllMatch } from '@/utils/MatchUtils';
import { isLogin } from '@/middlewares/isLogined';

const matchdata = ref<Match[]>([]);
const scoreboard = ref<Scoreboard[]>([]);
const phonelist = ref<News[]>([]);
const videolist = ref<Video[]>([]);
const newslist = ref<News[]>([]);
let firstnew = ref<News>();
let nextmatch = ref<Match>();
let lastmatch = ref<Match>();
let Login = ref(false);
const page = 1;
const limit = 5;
const limitvid = 4;
const title = null, type = null, author = null, time = null;

const checkLogin = async() => {
    Login.value = await isLogin();
}

const fetchVideo = async () => {
    const res = await GetAllVideos(page, limitvid, time, title);

    if (res) {
        videolist.value = res.data;
    }
}

const fetchNews = async () => {
    const res = await GetAllNews(page, limit, type, title, author, time);

    if (res) {
        newslist.value = res.data;
        firstnew.value = newslist.value.shift();
        phonelist.value = newslist.value.slice(0, 4);
    }
}

const fetchScoreboard = async () => {
    const res = await GetScoreboard("2027");

    if (res) {
        scoreboard.value = res.data.scoreboard;
        const root = scoreboard.value.findIndex(team => team.img == "https://vpf.vn/wp-content/uploads/2018/10/Logo-TXND-3-sao-150x150.png");
        scoreboard.value = scoreboard.value.slice(root - 1, root + 2);
    }

}

const fetchMatch = async () => {
    const res = await GetAllMatch("2027");
    
    if (res) {
        
        matchdata.value = res.data.filter((match : Match) => new Date(match.time) > new Date(Date.now())).slice(0, 3);
        lastmatch.value = res.data.filter((match : Match) => new Date(match.time) < new Date(Date.now())).reverse()[0];
        nextmatch.value = matchdata.value[0];
    }
    
}

onMounted(async () => {
    await fetchVideo();
    await fetchNews();
    await fetchScoreboard();
    await fetchMatch();
    await checkLogin();
});

</script>

<template>
    <main class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center" style="z-index: 1;">

        <!--Tin tức-->
        <section id="background" class="container-fluid m-0 p-0 d-flex flex-column align-items-center justify-content-end">
            <img class="position-absolute" :src="firstnew?.img.link ? firstnew?.img.link : ''"
                style="width: 100vw; height: 107vh; top: 0; left: 0; object-fit: cover; object-position: center; z-index: -1;">
            <div id="filter" class="container-fluid m-0 p-0 position-absolute w-100">
                <div class="container-fluid m-0 p-0 position-absolute" style="bottom: 0;">
                    <div class="row mx-0 p-0" style="margin-bottom: 90px;">
                        <div id="left" class="col-sm-7 justify-content-center align-items-start text-white">
                            <p>{{ firstnew?.time }}</p>
                            <h1>{{ firstnew?.title.toUpperCase() }}</h1>
                            <RouterLink :to="`/News/${firstnew?._id}`" class="text-decoration-none text-white">
                                <button type="button" class="btn btn-lg">Đọc tiếp</button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <!--Bảng tỉ số và xếp hạng-->
        <section id="rankings_background" class="container-fluid m-0 p-0 w-100 d-none d-lg-flex justify-content-center"
            style="margin-top: -35px !important; z-index: 2; position: relative;">

            <!--Kết quả trận trước-->
            <div id="score_background"
                class="container m-0 p-2 d-flex flex-row justify-content-center align-items-center">
                <div id="previous_match" v-if="lastmatch"
                    class="container h-100 p-0 pt-2 m-0 d-flex flex-column justify-content-center align-items-center">
                    <img v-if="lastmatch.leaguelg" :src="lastmatch.leaguelg.link" style="width: auto; height: 30px;">
                    <p class="m-0 p-0 pt-2">{{ lastmatch.VNtime }}</p>
                    <p>{{ lastmatch.stadium }}</p>
                    <div class="container m-0 p-2">
                        <div class="row m-0 p-0 w-100">
                            <div class="col-sm-3 p-0 m-0"> <img :src="lastmatch.hometeamlg.link"></div>
                            <div class="col-sm-6 p-0 m-0 d-flex flex-row justify-content-center align-items-center">
                                <h1 class="text-center p-0 m-0">{{ lastmatch.result }}</h1>
                            </div>
                            <div class="col-sm-3 p-0 m-0"><img :src="lastmatch.awayteamlg.link"></div>
                        </div>
                    </div>
                </div>

                <div v-else id="previous_match" class="container m-0 p-2 d-flex justify-content-center align-items-center h-100">
                    <h5>Không có dữ liệu!</h5>
                </div>

                <!--Trận tiếp theo-->
                <div id="next_match" v-if="nextmatch"
                    class="container h-100 p-0 pt-2 m-0 ms-2 d-flex flex-column justify-content-center align-items-center">
                    <img v-if="nextmatch.leaguelg" :src="nextmatch.leaguelg.link" style="width: auto; height: 30px;">
                    <p class="m-0 p-0 pt-2">{{ nextmatch.VNtime }}</p>
                    <p>{{ nextmatch.stadium }}</p>
                    <div class="container m-0 p-2 d-flex flex-row justify-content-between align-items-center">
                        <div class="row m-0 p-0 w-100">
                            <div class="col-sm-3 m-0 p-0"><img :src="nextmatch.awayteamlg.link"></div>
                            <div class="col-sm-6 m-0 p-0 d-flex flex-row justify-content-center align-items-center">
                                <h2 class="text-center p-0 m-0">{{ nextmatch.VNtime.split(" ")[0] }}</h2>
                            </div>
                            <div class="col-sm-3 m-0 p-0"><img :src="nextmatch.hometeamlg.link"></div>
                        </div>
                    </div>
                </div>

                <div v-else id="next_match" class="container m-0 ms-2 p-2 d-flex justify-content-center align-items-center h-100">
                    <h5>Không có dữ liệu!</h5>
                </div>

                <!--Bảng xếp hạng-->
                <div id="rankings_table"
                    class="container p-0 m-0 ms-2 d-flex flex-column justify-content-center align-items-center">
                    <table class="table m-0 p-0">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>CLB</th>
                                <th>M</th>
                                <th>GD</th>
                                <th>PTS</th>
                            </tr>
                            <tr v-for="team in scoreboard">
                                <td>{{ team.position }}</td>
                                <td><img id="clblogo" class="me-2" :src="team.img">{{ team.team }}</td>
                                <td>{{ team.match }}</td>
                                <td>{{ team.goaldiff }}</td>
                                <td>{{ team.point }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>



        <!--Tin tức-->
        <section id="new_for_lap"
            class="contain-fluid my-4 px-5 w-100 d-none d-md-flex justify-content-center align-items-center">
            <div id="new_section" class="row m-0 p-0 w-100" style="max-width: 2000px;">
                <div class="col-md-6 m-0 p-0">
                    <div class="container-fluid m-0 p-0 w-100">
                        <div class="row m-0 p-0 w-100">
                            <div id="top_left"
                                class="col-md-6 m-0 p-0 ps-3 pt-3 d-flex flex-column justify-content-center">
                                <h1 class="p-0">TIN TỨC MỚI NHẤT</h1>
                                <router-link class="text-decoration-none" to="/News">
                                    <button type="button" class="btn btn-lg">Xem thêm</button>
                                </router-link>
                            </div>
                            <div class="col-md-6 m-0 p-0 ps-2 pt-3">
                                <RouterLink v-if="newslist[0]" :to="`/News/${newslist[0]._id}`" class="text-decoration-none p-0">
                                <div id="top_right" class="container-fluid p-0 w-100 h-100 d-flex justify-content-center"
                                    style="aspect-ratio: 1 / 1;">
                                    <img class="p-0 object-fit-cover w-100 h-100" :src="newslist[0].img.link">
                                    <div id="filter_new" class="container-fluid p-0 w-100 h-100 position-absolute">
                                        <div class="container-fluid m-0 py-2 position-absolute" style="bottom: 0;">
                                            <p class="mx-3 m-0 p-0 d-flex align-items-center"><span class="bi bi-clock pe-1"></span>
                                                {{ newslist[0].time }}</p>
                                            <h1 class="mx-3 p-0 py-1 text-truncate">{{ newslist[0].title }}</h1>
                                        </div>
                                    </div>
                                </div>
                                </RouterLink>
                            </div>
                        </div>
                        <div class="row m-0 p-0 ps-3 pt-3 w-100">
                            <RouterLink v-if="newslist[1]" :to="`/News/${newslist[1]._id}`" class="text-decoration-none p-0">
                            <div id="bottom_left" class="container-fluid p-0 w-100 h-100 d-flex justify-content-center"
                                style="aspect-ratio: 1 / 1;">
                                <img id="pic_2" class="p-0 object-fit-cover w-100 h-100" :src="newslist[1].img.link">
                                <div id="filter_new" class="container-fluid p-0 w-100 h-100">
                                    <div class="container-fluid m-0 py-2 position-absolute" style="bottom: 0;">
                                        <p class="mx-3 m-0 p-0 d-flex align-items-center"><span class="bi bi-clock pe-1"></span> {{ newslist[1].time }} </p>
                                        <h1 class="mx-3 p-0 py-2 text-truncate">{{ newslist[1].title }} </h1>
                                    </div>
                                </div>
                            </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 m-0 p-0">
                    <div class="row m-0 p-0 ps-3 pt-3 w-100">
                        <RouterLink v-if="newslist[2]" :to="`/News/${newslist[2]._id}`" class="text-decoration-none p-0">
                        <div id="top_1" class="container-fluid p-0 w-100 d-flex justify-content-center" style="aspect-ratio: 1 / 1;">
                            <img id="pic_1" class="p-0 object-fit-cover w-100 h-100" :src="newslist[2].img.link">
                            <div id="filter_new" class="container-fluid m-0 p-0 w-100 h-100">
                                <div class="container-fluid py-2 position-absolute" style="bottom: 0;">
                                    <p class="mx-3 m-0 p-0 d-flex align-items-center"><span class="bi bi-clock pe-1"></span> {{ newslist[2].time }} </p>
                                    <h1 class="mx-3 p-0 py-2 text-truncate">{{ newslist[2].title }} </h1>
                                </div>
                            </div>
                        </div>
                        </RouterLink>
                    </div>
                    <div class="row m-0 p-0 ps-3 pt-3 w-100">
                        <RouterLink v-if="newslist[3]" :to="`/News/${newslist[3]._id}`" class="text-decoration-none p-0">
                        <div id="bottom_right" class="container-fluid p-0 w-100 d-flex justify-content-center">
                            <img class="p-0 object-fit-cover w-100 h-100" :src="newslist[3].img.link">
                            <div id="filter_new" class="container-fluid m-0 p-0 w-100 h-100">
                                <div class="container-fluid py-2 position-absolute" style="bottom: 0;">
                                    <p class="mx-3 m-0 p-0 d-flex align-items-center"><span class="bi bi-clock pe-1"></span> {{ newslist[3].time }}</p>
                                    <h1 class="mx-3 p-0 py-2 text-truncate">{{ newslist[3].title }} </h1>
                                </div>
                            </div>
                        </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>



        <!--Tin tức nhưng hiển thị trên điện thoại và tablet-->
        <section id="new_for_mobile" class="container-fluid d-md-none d-flex flex-column p-0 m-0 mt-5 mb-3 w-100">
            <div class="row m-0 px-5 py-2 w-100">
                <div class="col-md-12 d-flex justify-content-center align-items-center">
                    <h1 class="m-0 w-100">TIN TỨC MỚI NHẤT</h1>
                </div>
            </div>
            <div id="new_menu" class="container-fluid p-3 w-100">
                <div id="new_card" v-for="news in phonelist" :key="news._id" class="card">
                    <RouterLink :to="`/News/${news._id}`" class="text-decoration-none">
                        <div class="card-img-top p-0" style="overflow: hidden; aspect-ratio: 16 / 9;">
                            <img class="w-100" :src="news.img.link">
                        </div>
                        <div id="new_card_body" class="card-body m-1 p-1 d-flex flex-column"
                            style="justify-content: space-between; height: 110px;">
                            <h4 class="pt-2">{{ news.title }}</h4>
                            <p class="m-0 p-0 d-flex align-items-center"><span class="bi bi-clock pe-1"></span>
                                {{ news.time }}</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="container-fluid m-0 p-0 d-flex justify-content-center align-items-center">
                <router-link class="text-decoration-none" to="/News">
                    <button type="button" class="btn btn-lg">Xem thêm</button>
                </router-link>
            </div>
        </section>



        <!--Banner-->
        <section id="banner" v-if="!Login" class="container-fluid m-0 p-0 w-100 d-none d-md-flex justify-content-center align-items-center">
            <div class="container" style="width: 70%; aspect-ratio: 16 / 9;">
                <div class="container-fluid">
                    <img class="w-100" src="/pictures/Đăng ký thành viên.png" alt="Đăng ký thành viên">
                </div>
                <div id="banner_content" class="container position-absolute p-4 d-flex flex-column">
                    <h2>TRỞ THÀNH 1 PHẦN CỦA ĐẠI GIA ĐÌNH THÉP XANH NAM ĐỊNH</h2>
                    <p class="pt-3">Đăng ký ngay để nhận được các đặc quyền dành cho hội viên và nhiều hơn thế!</p>
                    <button type="button" class="btn btn-md" @click="$router.push('/Login')">Đăng ký ngay</button>
                </div>
            </div>
        </section>



        <!--Lịch trình-->
        <section id="schedule_background" class="container-fluid mb-3 p-0 d-md-none d-flex flex-column">
            <div class="row m-0 my-2 px-5 pt-3 pb-0 w-100">
                <div class="col-md-12 p-0 d-flex justify-content-center align-items-center">
                    <h1 class="w-100 text-center">LỊCH TRÌNH</h1>
                </div>
            </div>
            <div class="container-fluid p-0 d-flex">
                <div id="schedule_list" v-if="matchdata.length > 0" class="container-fluid mx-2 d-flex flex-column">
                        <div id="schedule_card" v-for="match in matchdata" :key="match._id" class="container-fluid p-0 my-2 d-flex flex-column">
                            <div class="row m-0 p-4 w-100">
                                <div class="col-10 p-0 text-start">
                                    <p class="m-0 p-0">{{ match.VNtime }}</p>
                                    <p class="m-0 p-0 text-truncate">{{ match.stadium }}</p>
                                </div>
                                <div class="col-2 p-0 ps-3 d-flex align-items-center justify-content-center">
                                    <img v-if="match.leaguelg" id="league" :src="match.leaguelg.link">
                                </div>
                            </div>
                            <div class="row m-0 p-0 px-1 pb-3 w-100">
                                <div class="col-10 p-0 px-3 text-start d-flex align-items-center">
                                    <h1 class="m-0 p-0 text-truncate">{{ match.awayteam }}</h1>
                                </div>
                                <div class="col-2 p-0 pe-3 d-flex justify-content-center">
                                    <img id="team" :src="match.awayteamlg.link">
                                </div>
                            </div>
                            <div class="row m-0 p-0 px-1 pb-4 w-100">
                                <div class="col-10 p-0 px-3 text-start d-flex align-items-center">
                                    <h1 class="m-0 p-0 text-truncate">{{ match.hometeam }}</h1>
                                </div>
                                <div class="col-2 p-0 pe-3 d-flex justify-content-center">
                                    <img id="team" :src="match.hometeamlg.link">
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="container-fluid m-0 mb-4 p-0 d-flex justify-content-center align-items-center">
                <router-link class="text-decoration-none" to="/Schedule">
                    <button type="button" class="btn btn-lg">Xem thêm</button>
                </router-link>
            </div>
        </section>



        <!--Quảng cáo-->
        <section id="advertisement" class="container-fluid pt-3 px-3">
            <div class="container p-0 col-md-5">
                <img src="/pictures/Động lực advertisement.jpg" alt="Quảng cáo Động Lực" class="w-100">
            </div>
        </section>



        <!--Video-->
        <section id="video" class="container-fluid mb-5 p-0 w-100 d-flex flex-column align-items-center">
            <div class="row p-0 m-0 mt-5 mb-1 w-100">
                <div class="col-lg-3 p-0 px-3">
                    <div id="video_title" class="container-fluid ps-4 d-flex flex-column h-100">
                        <h1 class="py-3">VIDEO MỚI NHẤT</h1>
                        <RouterLink class="text-decoration-none d-flex align-items-center" style="width: max-content;" to="/Video">
                            <button type="button" class="btn btn-lg">Xem thêm</button>
                        </RouterLink>
                    </div>
                </div>
                <div class="col-lg-9 p-0">
                    <div id="video_menu" class="container-fluid d-flex flex-column d-md-grid w-100 p-0">
                        <div id="video_card" v-for="video in videolist" :key="video._id" class="card">
                            <RouterLink :to="`/Video/${video._id}`" class="text-decoration-none text-white">
                                <div class="card-img-top p-0" style=" aspect-ratio: 16 / 9; overflow: hidden;">
                                    <img class="w-100" :src=video.poster.link></img>
                                </div>
                                <div class="card-body m-1 p-1 d-flex flex-column"
                                    style="height: 120px; justify-content: space-between;">
                                    <h4 class="pt-2">{{ video.title }}</h4>
                                    <p class="p-0 m-0 d-flex align-items-center">
                                        <span class="bi bi-clock pe-1"></span>
                                        {{ video.time }}
                                    </p>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <router-link class="text-decoration-none d-flex justify-content-center" to="/Video">
                <button id="phone_button" type="button" class="btn btn-lg">Xem thêm</button>
            </router-link>
        </section>



        <!--Biệt danh-->
        <section id="nickname" class="container-fluid p-0 d-flex">
            <div id="nickname_content" class="container-fluid p-0 py-3"><span>ĐỘI BÓNG THÀNH NAM. HÀO KHÍ ĐÔNG A.</span></div>
        </section>


        <!--Về đội bóng-->
        <section id="about_team" class="container-fluid px-md-3 py-3 p-0">
            <div class="container-fluid p-0 d-flex flex-column flex-md-row justify-content-center align-items-center">
                <RouterLink to="/Introduction" id="introduction" class="w-100 text-decoration-none text-white d-flex justify-content-end align-items-end">
                        <div class="container-fluid px-4">
                            <h1 class="w-100">Giới thiệu</h1>
                            <p class="w-100">Tìm hiểu về đội bóng của chúng tôi</p>
                        </div>
                </RouterLink>

                <RouterLink to="/History" id="history" class="w-100 text-decoration-none text-white d-flex justify-content-end align-items-end">
                        <div class="container-fluid px-4">
                            <h1 class="w-100">Lịch sử</h1>
                            <p class="w-100">Khám phá hành trình và thành tựu của đội bóng</p>
                        </div>

                </RouterLink>
            </div>
        </section>



        <!--Quảng cáo-->
        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center" style="gap: 20px; flex-wrap: wrap;">
                <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
                <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100" style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped></style>
