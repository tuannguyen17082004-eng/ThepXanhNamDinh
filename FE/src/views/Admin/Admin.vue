<script setup lang="ts">
    import router from '@/router';
    import { ref, onMounted } from 'vue';
    import { toast } from 'vue3-toastify';
    import { GetAllNews } from '@/utils/NewUtils';
    import { GetAllPlayers } from '@/utils/PlayerUtils';
    import { GetAllVideos } from '@/utils/VideoUtils';
    import { GetAllUser } from '@/utils/UserUtils';
    import { GetAllMatch } from '@/utils/MatchUtils';
    import { type News } from '@/models/news';
    import { type Player } from '@/models/player';
    import { type Video } from '@/models/video';
    import { type User } from '@/models/user';
    import { type Match } from '@/models/match';

    const news = ref<News[]>([]);
    const players = ref<Player[]>([]);
    const videos = ref<Video[]>([]);
    const users = ref<User[]>([]);
    let match = ref<Match>();
    const season = "2027";

    const fetchData = async() => {
        const newData = await GetAllNews(null, null, null, null, null, null);
        const playerData = await GetAllPlayers(null);
        const videoData = await GetAllVideos(null, null, null, null);
        const userData = await GetAllUser(null, null);
        const matchData = await GetAllMatch(season);

        if (!newData || !playerData || !videoData || !userData || !matchData) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

        news.value = newData.data;
        players.value = playerData.data;
        videos.value = videoData.data;
        users.value = userData.data;
        
        match.value = matchData.data.find((matches : Match) => new Date(matches.time) > new Date(Date.now()));
    }

    onMounted(() => [
        fetchData()
    ])
</script>

<template>
    <main class="container-fluid m-0 px-3" style="height: 100dvh;">
        <section id="number_section" class="row w-100 p-0 m-0">
            <div class="row col-xl-6 p-0 m-0">
                <div id="number_card" class="col-sm-6 pt-3 p-0 py-sm-2 pe-sm-2">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-end">
                            <h4>Bài viết</h4>|
                            <p v-on:click="() => router.push('/Admin/News')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-newspaper"></i><span>{{ news.length }}</span>
                        </div>
                    </div>
                </div>
                
                <div id="number_card" class="col-sm-6 pt-3 p-0 p-sm-2">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Video</h4>|
                            <p v-on:click="() => router.push('/Admin/Video')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-play-btn"></i><span>{{ videos.length }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row col-xl-6 p-0 m-0">
                <div id="number_card" class="col-sm-6 pt-3 p-0 p-sm-2">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Cầu thủ</h4>|
                            <p v-on:click="() => router.push('/Admin/Players')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-file-person"></i><span>{{ players.length }}</span>
                        </div>
                    </div>
                </div>

                <div id="number_card" class="col-sm-6 pt-3 p-0 py-sm-2 ps-sm-2">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Người dùng</h4>|
                            <p v-on:click="() => router.push('/Admin/Users')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-people"></i><span>{{ users.length }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="match_section" class="container-fluid p-0 px-3 my-3 m-0">
            <div class="container-fluid p-0 pt-3 d-flex justify-content-center align-items-center">
                <h3 class="pt-3">TRẬN ĐẤU TIẾP THEO</h3>
            </div>

            <div v-if="match" class="container-fluid p-0 py-3 d-flex flex-column justify-content-center align-items-center">
                <img v-if="match.leaguelg" :src="match.leaguelg.link" style="height: 40px;">
                <p class="m-0 pt-2">{{ match.VNtime }}</p>
                <p class="m-0">{{ match.stadium }}</p>

                <div class="row w-100 m-0 p-0">
                    <div class="col-4 p-0 m-0 d-flex flex-column justify-content-center align-items-center">
                        <img class="w-100 p-3" :src="match.hometeamlg.link" style="max-width: 100px; max-height: 100px;">
                        <h4 class="text-truncate w-100 text-center">{{ match.hometeam }}</h4>
                    </div>

                    <div class="col-4 p-0 m-0 d-flex flex-column justify-content-center align-items-center">
                        <h2>VS</h2>
                    </div>

                    <div class="col-4 p-0 m-0 d-flex flex-column justify-content-center align-items-center">
                        <img class="w-100 p-3" :src="match.awayteamlg.link" style="max-width: 100px; max-height: 100px;">
                        <h4 class="text-truncate w-100 text-center">{{ match.awayteam }}</h4>
                    </div>
                </div>

                <div class="container-fluid p-0 d-flex justify-content-center">
                    <RouterLink :to="`/Admin/Match/${match._id}`" class="text-decoration-none" style="width: max-content;">
                        <button class="btn btn-lg">Chỉnh sửa</button>
                    </RouterLink>
                </div>
            </div>

            <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center" style="height: 300px;">
                <h2>Không có dữ liệu!</h2>
            </div>
        </section>

        <section id="media_section" class="container-fluid p-0">
            <div class="row w-100 m-0 p-0">
                <div class="col-xl-6 p-0 pe-xl-2 pb-3">
                    <div id="new_section" class="container-fluid p-3 d-flex flex-column">
                        <h3 class="p-0">Tin tức mới nhất</h3>

                        <table class="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center">Tiêu đề</th>
                                    <th class="text-center">Ngày đăng</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="newdetail in news.slice(0, 5)" :key="newdetail._id" v-on:click="() => router.push(`/Admin/News/${newdetail._id}`)" style="cursor: pointer;">
                                    <td>{{ newdetail.title }}</td>
                                    <td>{{ newdetail.time }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-xl-6 p-0 ps-xl-2">
                    <div id="video_section" class="container-fluid p-3 d-flex flex-column">
                        <h3 class="p-0">Video mới nhất</h3>

                        <table class="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center">Tiêu đề</th>
                                    <th class="text-center">Ngày đăng</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="videodetail in videos.slice(0, 5)" :key="videodetail._id" v-on:click="() => router.push(`/Admin/Video/${videodetail._id}`)" style="cursor: pointer;">
                                    <td>{{ videodetail.title }}</td>
                                    <td>{{ videodetail.time }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
#number_section {
    #number_card {
        
        #card_content {
            min-width: 210px;
            height: 120px;
            background-color: white;
            font-family: 'Barlow', sans-serif;
            border-radius: 10px;

            h4 {
                margin: 0 10px 0 0;
                font-size: 20px;
                font-weight: 700;
                height: max-content;
            }

            p {
                margin: 0 0 0 10px;
                color: #899bbd;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
            }

            i {
                border-radius: 50%;
                padding: 10px 15px;
                font-size: 20px;
                color: #012970;
                background-color: #f6f6fe;
            }

            span {
                color: rgb(0, 133, 205);
                margin: 0 10px;
                font-size: 30px;
                font-weight: 700;
            }
        }
    }
}

#match_section {
    border-radius: 10px;
    background-color: white;
    font-family: 'Barlow', sans-serif;

    h3 {
        color: #012970;
        font-weight: 700;
        font-size: clamp(25px, 3vw, 30px);
    }

    p {
        font-size: clamp(15px, 3vw, 18px);
        color: gray;
        font-weight: 600;
    }

    h4 {
        font-size: clamp(25px, 3vw, 30px);
        color: rgb(0, 133, 205);
        font-weight: 700;
    }

    h2 {
        color: #012970;
        font-weight: 700;
        font-size: clamp(25px, 3vw, 45px);
    }

    button {
        background-color: rgb(0, 133, 205);
        color: white;
        font-weight: 500;
    }

}

#media_section {
    font-family: 'Barlow', sans-serif;

    #video_section, #new_section {
            background-color: white;
            border-radius: 10px;
    }

    h3 {
        color: rgb(0, 133, 205);
        font-weight: 700;
        font-size: clamp(25px, 3vw, 30px);
    }

    td {
        height: 90px;
        font-weight: 500;
        align-content: center;
    }

    th {
        color: gray;
        font-weight: 700;
    }
}
</style>