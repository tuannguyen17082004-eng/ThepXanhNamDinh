<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { GetScoreboard } from '@/utils/ScoreboardUtils';
import { GetAllMatch } from '@/utils/MatchUtils';
import { GetAllSeason } from '@/utils/SeasonUtils';
import type { Match } from '@/models/match';
import type { Season } from '@/models/season';
import type { Scoreboard } from '@/models/scoreboard';

const schedule = ref();
const scoreboard = ref();
const result = ref();
let sbdata = ref<Scoreboard[]>([]);
const matchdata = ref<Match[]>([]);
const scoredata = ref<Match[]>([]);
const months = ["08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07"];
let match = ref<Match>();
let season = ref(2027);
const matches = ref([]);
const seasonList = ref<Season[]>([]);

const fetchScoreboard = async (season: any) => {
    const res = await GetScoreboard(season);

    if (res) {
        sbdata.value = res.data.scoreboard;
    }
}

const fetchNextMatch = async (season: any) => {
    const res = await GetAllMatch(season);

    if (res) {
        matchdata.value = res.data.filter((match: Match) => new Date(match.time) > new Date(Date.now()));
        match.value = matchdata.value.shift();
    }
}

const fetchAllSeason = async () => {
    const res = await GetAllSeason();

    if (res)
        seasonList.value = res.data;
}

const FetchLastMatch = async (season: any) => {
    const res = await GetAllMatch(season);

    if (res) {
        scoredata.value = res.data.filter((match: Match) => new Date(match.time) < new Date(Date.now())).reverse();
    }
}

const showContent = (c: any) => {
    if (!schedule || !scoreboard) return;
    if (c == "a") {
        schedule.value.style.display = "";
        scoreboard.value.style.display = "none";
        result.value.style.display = "none";
    }
    else if (c == "c") {
        schedule.value.style.display = "none";
        scoreboard.value.style.display = "";
        result.value.style.display = "none";

    }
    else {
        schedule.value.style.display = "none";
        scoreboard.value.style.display = "none";
        result.value.style.display = "";
    }
}

const showMatch = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show")
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            threshold: 0.2
        }
    );

    matches.value.forEach(el => observer.observe(el));
}

onMounted(async () => {
    showContent('a');
    await fetchScoreboard(season.value);
    await fetchNextMatch(2027);
    await FetchLastMatch(season.value);
    showMatch();
    await fetchAllSeason();
})
</script>

<template>
    <main class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center"
        style="background-color: #f8f9fa;">
        <section id="schedule_bg" class="container-fluid d-flex flex-column justify-content-end p-0">
            <div id="schedule_title" class="container-fluid p-0 ps-md-5 ps-3 mb-3">
                <h1>TRẬN ĐẤU TIẾP THEO</h1>
            </div>
            <div v-if="match" id="next_match" class="container-fluid px-4 pb-4">
                <div class="row w-100 m-0">
                    <div class="col-4 p-0 px-2 d-flex justify-content-center justify-content-md-end align-items-center flex-md-row" style="flex-direction: column-reverse;">
                        <h1 class="p-0 me-md-3 mt-2 mt-md-0 text-center">{{ match.hometeam }}</h1>
                        <img id="team_logo" :src="match.hometeamlg.link">
                    </div>

                    <div class="col-4 p-0 d-flex flex-column">
                        <div class="container-fluid p-0 mb-4 d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <img class="me-2" v-if="match.leaguelg" :src="match.leaguelg.link" id="league_logo"><span
                                class="m-0 text-center" style="height: max-content;">{{ match.league }}</span>
                        </div>
                        <h2 class="text-center my-2">{{ match.VNtime.slice(0,5) }}</h2>
                        <p class="text-center my-2 mt-4 m-0">{{ match.VNtime.slice(5) }}</p>
                        <p class="text-center my-md-2 m-0">{{ match.stadium }}</p>
                    </div>

                    <div class="col-4 p-0 px-2 d-flex justify-content-center justify-content-md-start align-items-center flex-column flex-md-row">
                        <img id="team_logo" :src="match.awayteamlg.link">
                        <h1 class="p-0 ms-md-3 mt-2 mt-md-0 text-center">{{ match.awayteam }}</h1>
                    </div>
                </div>

            </div>
        </section>

        <div id="schedule_menu" class="container-fluid mb-3 p-0 d-flex align-items-center">
            <ul class="p-0 m-0 d-flex">
                <li v-on:click="showContent('a')">Lịch thi đấu</li>
                <li v-on:click="showContent('b')">Kết quả trận đấu</li>
                <li v-on:click="showContent('c')">Bảng xếp hạng</li>
            </ul>
        </div>

        <section ref="schedule" id="schedule_content"
            class="container-fluid pt-3 justify-content-center align-items-center">
            <div class="container-fluid p-0" v-if="matchdata.length > 0" v-for="month in months">
                <div class="container-fluid p-0"
                    v-if="matchdata.filter(x => x.VNtime.slice(9, 11) == month).length != 0">
                    <div class="container-fluid my-4 mx-2 p-0">
                        <h1 id="month" class="text-center text-md-start">Tháng {{ month }}</h1>
                    </div>
                    <div id="next_match" ref="matches"
                        v-for="match in matchdata.filter(x => x.VNtime.slice(9, 11) == month)" :key="match._id"
                        class="container-fluid px-md-5 m-0 mb-4 p-0">
                        <div class="row m-0 py-3">
                            <div
                                class="col-6 p-0 px-3 px-md-0 d-flex flex-column justify-content-center align-items-start">
                                <p class="m-0 text-truncate">{{ match.VNtime }}</p>
                                <p class="m-0 text-truncate">{{ match.stadium }}</p>
                            </div>

                            <div class="col-6 p-0  px-3 px-md-0 d-flex justify-content-end align-items-center">
                                <p class="m-0 px-3 d-md-block d-none">{{ match.league }}</p>
                                <img v-if="match.leaguelg" id="league_logo" :src="match.leaguelg.link">
                            </div>
                        </div>

                        <div class="row m-0">
                            <div id="schedule_col1"
                                class="col-md-5 p-0 pb-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                <h1 class="px-md-3 m-0 text-truncate w-100 text-md-end">{{ match.hometeam }}</h1>
                                <img id="team_logo" :src="match.hometeamlg.link">
                            </div>

                            <div class="col-md-2 p-0 d-none d-md-flex justify-content-center align-items-center">
                                <p class="py-2 px-3" style="background-color: gray; color: white; border-radius: 10px;">
                                    {{ match.VNtime.slice(0, 5) }}</p>
                            </div>

                            <div id="schedule_col2"
                                class="col-md-5 p-0 pb-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                <img id="team_logo" :src="match.awayteamlg.link">
                                <h1 class="px-md-3 m-0 text-truncate w-100">{{ match.awayteam }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center"
                style="font-family: 'Barlow', sans-serif; height: 400px;">
                <h2>Không có dữ liệu!</h2>
            </div>
        </section>

        <section ref="result" id="result_content"
            class="container-fluid pt-3 justify-content-center align-items-center">
            <div class="container-fluid p-0 d-flex justify-content-end align-items-center" style="max-width: 100vw;">
                <p class="pe-3 m-0">Mùa giải</p>

                <select v-model="season" v-on:change="async () => { await FetchLastMatch(season); showMatch() }">
                    <div v-for="season in seasonList" class="form-control p-0">
                        <option :value="season.season">{{ season.season - 1 }}-{{ season.season }}</option>
                    </div>
                </select>
            </div>

            <div class="container-fluid p-0" v-if="scoredata.length > 0" v-for="month in months">
                <div class="container-fluid p-0"
                    v-if="scoredata.filter(x => x.VNtime.slice(9, 11) == month).length != 0">
                    <div class="container-fluid my-4 mx-2 p-0">
                        <h1 id="month" class="text-center text-md-start">Tháng {{ month }}</h1>
                    </div>
                    <div id="result_card" ref="matches"
                        v-for="match in scoredata.filter(x => x.VNtime.slice(9, 11) == month)" :key="match._id"
                        class="container-fluid px-md-5 m-0 mb-4 p-0">
                        <div class="row m-0 py-3">
                            <div
                                class="col-6 p-0 px-3 px-md-0 d-flex flex-column justify-content-center align-items-start">
                                <p class="m-0 text-truncate">{{ match.VNtime }}</p>
                                <p class="m-0 text-truncate">{{ match.stadium }}</p>
                            </div>

                            <div class="col-6 p-0  px-3 px-md-0 d-flex justify-content-end align-items-center">
                                <p class="m-0 px-3 d-md-block d-none">{{ match.league }}</p>
                                <img v-if="match.leaguelg" id="league_logo" :src="match.leaguelg.link">
                            </div>
                        </div>

                        <div class="row m-0">
                            <div id="schedule_col1"
                                class="col-4 p-0 pb-md-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                <h1 class="px-md-3 my-3 m-0 w-100 text-md-end text-center text-truncate">{{
                                    match.hometeam }}</h1>
                                <img id="team_logo" :src="match.hometeamlg.link">
                            </div>

                            <div class="col-4 p-0 d-flex justify-content-center align-items-center">
                                <h2 class="px-md-4 py-md-2 px-3 py-1">{{ match.result }}</h2>
                            </div>

                            <div id="schedule_col2"
                                class="col-4 p-0 pb-md-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                <img id="team_logo" :src="match.awayteamlg.link">
                                <h1 class="px-md-3 my-3 m-0 w-100 text-md-start text-center text-truncate">{{
                                    match.awayteam }}</h1>
                            </div>
                        </div>

                        <div id="schedule_option" class="row pb-3 d-flex justify-content-center align-items-center">
                            <RouterLink :to="`/Schedule/${match._id}`"
                                class="text-decoration-none d-flex justify-content-center align-items-center"
                                style="width: max-content;">
                                <i class="bi bi-play-btn p-0 px-2"></i>
                                <h5 class="m-0">Highlight</h5>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center"
                style="font-family: 'Barlow', sans-serif; height: 400px;">
                <h2>Không có dữ liệu!</h2>
            </div>
        </section>

        <section ref="scoreboard" id="scoreboard" class="container-fluid m-0 mt-3">
            <div class="container-fluid p-0 pb-4 d-flex justify-content-end align-items-center"
                style="max-width: 100vw;">
                <p class="pe-3 m-0">Mùa giải</p>

                <select v-model="season" v-on:change="fetchScoreboard(season)">
                    <div v-for="season in seasonList" class="form-control p-0">
                        <option :value="season.season">{{ season.season - 1 }}-{{ season.season }}</option>
                    </div>
                </select>
            </div>

            <table v-if="sbdata" class="table">
                <tbody>
                    <tr>
                        <th><img src="/pictures/Logo V.League.png" class="w-100"
                                style="max-width: 80px; min-width: 40px;" /></th>
                        <th style="text-align: left !important;">Câu lạc bộ</th>
                        <th>Trận</th>
                        <th>Thắng</th>
                        <th>Hòa</th>
                        <th>Thua</th>
                        <th>Hiệu số</th>
                        <th>Điểm</th>
                    </tr>
                    <tr v-for="team in sbdata" :key="team._id">
                        <td>{{ team.position }}</td>
                        <td class="d-flex align-items-center"><img id="team_logo" :src="team.img" class="p-1 me-4" />
                            <p class="m-0" style="text-align: left !important; font-weight: 500;">{{ team.team }}</p>
                        </td>
                        <td>{{ team.match }}</td>
                        <td>{{ team.win }}</td>
                        <td>{{ team.draw }}</td>
                        <td>{{ team.loss }}</td>
                        <td>{{ team.goaldiff }}</td>
                        <td>{{ team.point }}</td>
                    </tr>
                </tbody>
            </table>

            <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center"
                style="font-family: 'Barlow', sans-serif; height: 400px;">
                <h2>Không có dữ liệu!</h2>
            </div>
        </section>
    </main>
</template>

<style scoped>
#schedule_bg {
    height: 600px;
    position: relative;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('/pictures/Hình nền trận đấu.jpg');
    background-size: cover;
    background-position: center;

    #schedule_title {
        font-family: 'Barlow', sans-serif;
        color: white;

        h1 {
            font-size: clamp(25px, 3vw, 50vw);
            font-weight: 700;
        }
    }

    #next_match {
        font-family: 'Barlow', sans-serif;
        color: white;

        span {
            font-weight: 600;
            font-size: clamp(15px, 3vw, 18px);
            color: white;
        }

        h1 {
            font-size: clamp(20px, 3vw, 30px);
            font-weight: 700;
        }

        h2 {
            font-size: clamp(35px, 3vw, 48px);
            font-weight: 700;
        }

        p {
            font-size: clamp(10px, 3vw, 15px);
        }

        #league_logo {
            height: 30px;
            width: auto;
        }

        #team_logo {
            height: 130px;
            width: auto;
        }
    }
}

#schedule_menu {
    justify-content: center;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    background-color: #f8f9fa;
    box-shadow: 5px 5px 5px rgb(224, 220, 220);
}

#schedule_content,
#result_content {
    max-width: 2000px;
    font-family: 'Barlow', sans-serif;

    p {
        color: #012970;
        font-weight: 600;
    }

    select {
        border: none;
        border-bottom: #012970 3px solid;
        height: 30px;
        background-color: transparent;
    }

    #month {
        font-weight: 700;
        color: rgb(0, 133, 205);
    }

    #next_match,
    #result_card {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.6s ease;
        background-color: white;
        border-radius: 20px;

        p {
            font-weight: 600;
            font-size: clamp(15px, 3vw, 18px);
            color: gray;
        }

        h1 {
            font-size: clamp(23px, 3vw, 30px);
            font-weight: 700;
            color: rgb(0, 133, 205);
        }

        h2 {
            background-color: rgb(0, 133, 205);
            color: white;
            font-size: clamp(25px, 3vw, 35px);
            font-weight: 700;
            border-radius: 10px;
        }

        #league_logo {
            height: 40px;
            width: auto;
        }

        #team_logo {
            max-height: 80px;
            width: auto;
        }

        #schedule_option {
            i {
                color: #012970;
                width: max-content;
            }

            h5 {
                color: #012970;
                font-weight: 600;
                font-size: 18px;
                width: max-content;
            }
        }
    }

    #next_match:hover,
    #result_card:hover {
        box-shadow: 5px 5px 5px rgb(224, 220, 220);
        transform: translateY(-10px) !important;
    }

    #next_match.show,
    #result_card.show {
        opacity: 1;
        transform: translateY(0);
    }
}

ul {
    list-style-type: none;
    height: 60px;

    li {
        width: 200px;
        height: 100%;
        font-family: "Barlow", sans-serif;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

ul li:hover {
    border-bottom: 4px rgb(0, 133, 205) solid;
    cursor: pointer;
}

#scoreboard {
    max-width: 1500px;
    overflow-x: scroll;
    scrollbar-width: none;
    font-family: 'Barlow', sans-serif;

    p {
        color: #012970;
        font-weight: 600;
    }

    select {
        border: none;
        border-bottom: #012970 3px solid;
        height: 30px;
        background-color: transparent;
    }

    th {
        color: rgb(0, 133, 205);
        font-size: clamp(15px, 2vw, 20px);
        text-align: center;
        align-content: center;
    }

    td {
        text-align: center;
        font-weight: 500;
        align-content: center;
        font-size: 15px;
    }

    #team_logo {
        max-height: 70px;
    }
}

@media screen and (max-width: 768px) {

    #schedule_col1,
    #schedule_col2 {
        justify-content: space-between !important;
    }

    #next_match #schedule_col2 {
        flex-direction: row-reverse;
    }

    #result_card #schedule_col1 {
        flex-direction: column-reverse;
    }

    #result_card #schedule_col2 {
        flex-direction: column;
        text-align: center;
    }

    #team_logo {
        height: 50px !important;
    }

    #league_logo {
        height: 25px !important;
    }

    #schedule_menu {
        justify-content: start !important;
    }

}
</style>