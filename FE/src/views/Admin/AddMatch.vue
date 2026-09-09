<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { CreateMatch } from '@/utils/MatchUtils';
import { GetAllClub } from '@/utils/ClubUtils';
import { GetAllSeason } from '@/utils/SeasonUtils';
import { type Season } from '@/models/season';
import { type Club } from '@/models/club';
import Select from 'primevue/select';
import Loading from '@/components/Loading.vue';
import router from '@/router';

const league = ref();
const date = ref();
const hour = ref();
const stadium = ref();
const hometeam = ref();
const awayteam = ref();
const season = ref();
const result = ref();
const highlight = ref();
const league_url = ref();
const league_file = ref();
let league_png = ref();
let time;
let isLoading = ref(false);
const seasonList = ref<Season[]>([]);
const clubList = ref<Club[]>([]);

const FetchAllClub = async () => {
    const res = await GetAllClub();

    if (!res) {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    clubList.value = res.data;
}

const handleLeagueImg = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
        league_png.value = null;
        league_file.value = null;
        return;
    }

    league_file.value = file;
    league_png.value = URL.createObjectURL(file);
}

const handleAdd = async () => {
    isLoading.value = true;
    if (!season.value || !league.value || !date.value || !hour.value || !stadium.value || !hometeam.value || !awayteam.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    if (league_file.value && league_url.value) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    time = new Date(hour.value + " " + date.value);
    const res = await CreateMatch(league_file.value, season.value.season, stadium.value, league.value, league_url.value, hometeam.value._id, awayteam.value._id, result.value, highlight.value, time);

    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push('/Admin/Match');
    }
    isLoading.value = false;
}

const FetchSeason = async () => {
    const res = await GetAllSeason();

    if (!res) {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    seasonList.value = res.data;
}

onMounted(() => {
    FetchSeason();
    FetchAllClub();
})
</script>

<template>
    <Loading v-if="isLoading" />
    <main class="container-fluid p-3" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center"
            style="background-color: white; border-radius: 10px;">
            <div id="title_video" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Thêm thông tin trận đấu</h5>
                <p class="m-0 pt-1">Nhập đầy đủ thông tin cần thiết</p>
            </div>

            <RouterLink to="/Admin/Match" class="container-fluid p-0" style="width: max-content;">
                <button class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <form id="add_form" class="container-fluid p-3 mt-4" @submit.prevent="handleAdd">
            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3 class="w-100">Logo giải đấu (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img v-if="league_png" :src="league_png" width="200" class="my-2">
                    <input type="file" class="form-control mb-3" @change="handleLeagueImg">
                    <input v-model="league_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Giải đấu:</h3>
                    <input v-model="league" type="text" class="form-control" placeholder="Nhập tên giải đấu...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Ngày thi đấu:</h3>
                    <input v-model="date" type="date" class="form-control mb-3">
                    <input v-model="hour" type="time" class="form-control">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Sân vận động:</h3>
                    <input v-model="stadium" type="text" class="form-control" placeholder="Nhập tên sân vận động...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Đội nhà:</h3>

                    <Select v-model="hometeam" :options="clubList" optionLabel="name" filter filterBy="name" showClear
                        placeholder="Chọn đội bóng" class="w-100">
                        <template #value="club">
                            <div v-if="club.value" class="d-flex align-items-center">
                                <img class="me-2" :src="club.value.logo.link" style="height: 30px;" alt="logo CLB">
                                <p class="m-0">{{ club.value.name }}</p>
                            </div>
                        </template>

                        <template #option="club">
                            <div v-if="club.option" class="d-flex align-items-center">
                                <img class="me-2" :src="club.option.logo.link" style="height: 30px;" alt="logo CLB">
                                <p class="m-0">{{ club.option.name }}</p>
                            </div>
                        </template>
                    </Select>
                </div>

                <div class="col-md-6 p-3">
                    <h3>Đội khách:</h3>

                    <Select v-model="awayteam" :options="clubList" optionLabel="name" filter filterBy="name" showClear
                        placeholder="Chọn đội bóng" class="w-100">
                        <template #value="club">
                            <div v-if="club.value" class="d-flex align-items-center">
                                <img class="me-2" :src="club.value.logo.link" style="height: 30px;" alt="logo CLB">
                                <p class="m-0">{{ club.value.name }}</p>
                            </div>
                        </template>

                        <template #option="club">
                            <div v-if="club.option" class="d-flex align-items-center">
                                <img class="me-2" :src="club.option.logo.link" style="height: 30px;" alt="logo CLB">
                                <p class="m-0">{{ club.option.name }}</p>
                            </div>
                        </template>
                    </Select>
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Kết quả:</h3>
                    <input v-model="result" type="text" class="form-control" placeholder="Nhập kết quả...">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Highlight:</h3>
                    <input v-model="highlight" type="text" class="form-control"
                        placeholder="Nhập thông tin highlight...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex justify-content-center">
                <div class="col-md-6 p-3">
                    <h3>Mùa giải</h3>

                    <Select v-model="season" :options="seasonList" showClear placeholder="Chọn mùa giải" class="w-100">
                        <template #value="season">
                            <div v-if="season.value">
                                <p class="m-0">{{ season.value.season -1 }} - {{ season.value.season }}</p>
                            </div>
                        </template>

                        <template #option="season">
                            <div v-if="season.option">
                                <p class="m-0">{{ season.option.season -1 }} - {{ season.option.season }}</p>
                            </div>
                        </template>
                    </Select>
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="add_btn" type="submit" class="btn btn-lg">Thêm</button>
                <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
#title_video {
    font-family: 'Barlow', sans-serif;

    h5 {
        font-weight: 700;
        font-size: clamp(20px, 2vw, 25px);
        color: #012970;
    }

    p {
        font-weight: 500;
        color: #899bbd;
    }
}

button {
    width: 100px;
    color: #012970;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
}

button:hover {
    background-color: rgb(0, 133, 205);
    color: white;
}

#add_form {
    background-color: white;
    border-radius: 10px;
    font-family: 'Barlow', sans-serif;

    h3 {
        width: max-content;
        margin-right: 10px;
        display: flex;
        align-items: center;
        font-size: clamp(15px, 3vw, 18px);
        font-weight: 600;
    }

    #add_btn {
        width: 100px;
        background-color: rgb(0, 133, 205);
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #reset_btn {
        width: 100px;
        background-color: red;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }
}
</style>