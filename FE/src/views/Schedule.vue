<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { GetScoreboard } from '@/utils/ScoreboardUtils';
import { GetAllMatch } from '@/utils/MatchUtils';
import type { Scoreboard } from '@/models/scoreboard';
import type { Match } from '@/models/match';

const schedule = ref();
const scoreboard = ref();
const result = ref();
const sbdata = ref<Scoreboard[]>([]);
const matchdata = ref<Match[]>([]);
const scoredata = ref<Match[]>([]);
const months = ["08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07"];
let match = ref<Match>();
const matches = ref([]);

const fetchScoreboard = async () => {
    const res = await GetScoreboard();
    sbdata.value = res?.data;
}

const fetchMatch = async () => {
    const res = await GetAllMatch();
    
    res?.data.forEach((match : any) => {
        if (!match.result)
            matchdata.value.push(match);
        else
            scoredata.value.push(match);
    });
}

const getNextMatch = () => {
    match.value = matchdata.value.shift();
    if (match.value?.awayteam == "Thép Xanh Nam Định") {
        match.value.awayteam = match.value.hometeam;
        match.value.awayteamlg = match.value.hometeamlg;
    } else {
        match.value.hometeam = match.value.awayteam;
        match.value.hometeamlg = match.value.awayteamlg;
    }
}

const showContent = (c : any) => {
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
                if (entry.intersectionRatio >= 0.2) {
                entry.target.classList.add("show")
                observer.unobserve(entry.target)
            }
        })
        },
        {
            threshold: [0.2]
        }
    )

    matches.value.forEach(el => observer.observe(el))
}

onMounted(async () => {
    showContent('a');
    fetchScoreboard();
    await fetchMatch();
    await getNextMatch();
    await showMatch();
})
</script>

<template>
    <section class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center" style="background-color: #f8f9fa;">
        <div id="schedule_bg" class="container-fluid justify-content-start align-items-end p-0">
            <div class="container-fluid m-0 px-md-5 px-3 position-absolute" style="bottom: 20px;">
                <div id="schedule_title" class="container pb-3 p-0">
                    <h1>TRẬN ĐẤU TIẾP THEO</h1>
                </div>

                <div id="next_match" v-if="match" class="container-fluid px-md-5 pb-3 p-0">
                    <div class="row m-0">
                        <div class="col-6 p-0 py-4 px-5 d-flex flex-column justify-content-center align-items-start">
                            <p class="m-0 text-truncate">{{ match.time }}</p>
                            <p class="m-0 text-truncate">{{ match.stadium }}</p>
                        </div>

                        <div class="col-6 p-0 px-5 d-flex justify-content-end align-items-center">
                            <p class="m-0 px-3 d-md-block d-none">{{ match.league }}</p>
                            <img id="league_logo" :src="match.leaguelg">
                        </div>
                    </div>

                    <div class="row m-0">
                        <div id="schedule_col1" class="container-fluid p-0 pb-3 d-flex flex-column justify-content-center align-items-center">
                            <img id="team_logo" :src="match.awayteamlg">
                            <h1 class="py-3 m-0 text-truncate">{{ match.awayteam }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="schedule_menu" class="container-fluid mb-3 p-0 d-flex align-items-center">
            <ul class="p-0 m-0 d-flex">
                    <li v-on:click="showContent('a')">Lịch thi đấu</li>
                    <li v-on:click="showContent('b')">Kết quả trận đấu</li>
                    <li v-on:click="showContent('c')">Bảng xếp hạng</li>
            </ul>
        </div>

        <div ref="schedule" id="schedule_content" class="container-fluid pt-3 justify-content-center align-items-center">
            <div class="container-fluid p-0" v-for="month in months">
                <div class="container-fluid p-0" v-if="matchdata.filter(x=> x.time.slice(9, 11) == month).length != 0">
                    <div class="container-fluid my-4 mx-2 p-0">
                        <h1 id="month" class="text-center text-md-start">Tháng {{ month }}</h1>
                    </div>
                    <div id="next_match" ref="matches" v-for="match in matchdata.filter(x => x.time.slice(9,11) == month)" :key="match._id" class="container-fluid px-md-5 m-0 mb-4 p-0">
                        <div class="row m-0 py-3">
                            <div class="col-6 p-0 px-3 px-md-0 d-flex flex-column justify-content-center align-items-start">
                                <p class="m-0 text-truncate">{{ match.time }}</p>
                                <p class="m-0 text-truncate">{{ match.stadium }}</p>
                            </div>

                            <div class="col-6 p-0  px-3 px-md-0 d-flex justify-content-end align-items-center">
                                <p class="m-0 px-3 d-md-block d-none">{{ match.league }}</p>
                                <img id="league_logo" :src="match.leaguelg">
                            </div>
                        </div>

                        <div class="row m-0">
                            <div id="schedule_col1" class="col-md-5 p-0 pb-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                <h1 class="px-md-3 m-0 text-truncate w-100 text-md-end">{{ match.hometeam }}</h1>
                                <img id="team_logo" :src="match.hometeamlg">
                            </div>

                            <div class="col-md-2 p-0 d-none d-md-flex justify-content-center align-items-center">
                                <p class="py-2 px-3" style="background-color: gray; color: white; border-radius: 10px;">{{ match.time.slice(0, 5) }}</p>
                            </div>

                            <div id="schedule_col2" class="col-md-5 p-0 pb-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                <img id="team_logo" :src="match.awayteamlg">
                                <h1 class="px-md-3 m-0 text-truncate w-100">{{ match.awayteam }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div ref="result" id="result_content" class="container-fluid pt-3 justify-content-center align-items-center">
            <div class="container-fluid p-0" v-for="month in months">
                <div class="container-fluid p-0" v-if="scoredata.filter(x=> x.time.slice(9, 11) == month).length != 0">
                    <div class="container-fluid my-4 mx-2 p-0">
                        <h1 id="month" class="text-center text-md-start">Tháng {{ month }}</h1>
                    </div>
                    <div id="result_card" ref="matches" v-for="match in scoredata.filter(x => x.time.slice(9,11) == month)" :key="match._id" class="container-fluid px-md-5 m-0 mb-4 p-0">
                        <RouterLink :to="`/Schedule/${ match._id }`" class="text-decoration-none">
                            <div class="row m-0 py-3">
                                <div class="col-6 p-0 px-3 px-md-0 d-flex flex-column justify-content-center align-items-start">
                                    <p class="m-0 text-truncate">{{ match.time }}</p>
                                    <p class="m-0 text-truncate">{{ match.stadium }}</p>
                                </div>

                                <div class="col-6 p-0  px-3 px-md-0 d-flex justify-content-end align-items-center">
                                    <p class="m-0 px-3 d-md-block d-none">{{ match.league }}</p>
                                    <img id="league_logo" :src="match.leaguelg">
                                </div>
                            </div>

                            <div class="row m-0">
                                <div id="schedule_col1" class="col-4 p-0 pb-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                    <h1 class="px-md-3 my-3 m-0 w-100 text-md-end text-center text-truncate">{{ match.hometeam }}</h1>
                                    <img id="team_logo" :src="match.hometeamlg">
                                </div>

                                <div class="col-4 p-0 d-flex justify-content-center align-items-center">
                                    <h2 class="px-md-4 py-md-2 px-3 py-1">{{ match.result }}</h2>
                                </div>

                                <div id="schedule_col2" class="col-4 p-0 pb-3 px-3 px-md-0 d-flex justify-content-center align-items-center">
                                    <img id="team_logo" :src="match.awayteamlg">
                                    <h1 class="px-md-3 my-3 m-0 w-100 text-md-start text-center text-truncate">{{ match.awayteam }}</h1>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <div ref="scoreboard" id="scoreboard" class="container-fluid m-0 mt-3">
            <table class="table">
                <tbody>
                    <tr>
                        <th><img src="/pictures/Logo V.League 1.png" class="w-100" style="max-width: 80px; min-width: 40px;"/></th>
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
                        <td class="d-flex align-items-center"><img id="team_logo" :src="team.img" class="p-1 me-4"/><p class="m-0" style="text-align: left !important; font-weight: 500;">{{ team.team }}</p></td>
                        <td>{{ team.match }}</td>
                        <td>{{ team.win }}</td>
                        <td>{{ team.draw }}</td>
                        <td>{{ team.loss }}</td>
                        <td>{{ team.goaldiff }}</td>
                        <td>{{ team.point }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
    #schedule_bg {
        height: 600px;
        position: relative;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('../pictures/SVĐ\ Thiên\ Trường.jpg');
        background-size: cover;
        background-position: center;

        #schedule_title {
            font-family: 'Barlow', sans-serif;
            color: white;

            h1 {
                font-size: clamp(30px, 3vw, 50vw);
                font-weight: 700;
            }
        }

        #next_match {
            max-width: 800px;
            font-family: 'Barlow', sans-serif;
            color: white;

            p {
                font-weight: 600;
                font-size: clamp(15px, 3vw, 18px);
                color: white;
            }

            h1 {
                font-size: clamp(23px, 3vw, 30px);
                font-weight: 700;
            }

            #league_logo {
                height: 40px;
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

    #schedule_content, #result_content {
        max-width: 2000px;

        #month {
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            color: rgb(0, 133, 205);
        }

        #next_match, #result_card {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.6s ease;
            font-family: 'Barlow', sans-serif;
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
        }

        #next_match:hover, #result_card:hover {
            box-shadow: 5px 5px 5px rgb(224, 220, 220);
            transform: translateY(-10px) !important;
        }

        #next_match.show, #result_card.show {
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

        th {
            font-family: 'Barlow', sans-serif;
            color: rgb(0, 133, 205);
            font-size: clamp(15px, 2vw, 20px);
            text-align: center;
            align-content: center;
        }

        td {
            font-family: 'Barlow', sans-serif;
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
        #schedule_col1, #schedule_col2 {
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

        #scoreboard td:nth-child(n+4):nth-child(-n+7), th:nth-child(n+4):nth-child(-n+7){
            display: none !important;
        }
    }
</style>