<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import router from '@/router';
import { useRoute } from 'vue-router';
import { UpdateMatch, DeleteMatch, GetMatchDetail } from '@/utils/MatchUtils';

const route = useRoute();
const id = route.params.id;

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
const hometeam_url = ref();
const hometeam_file = ref();
const awayteam_url = ref();
const awayteam_file = ref();
let league_png = ref();
let hometeam_png = ref();
let awayteam_png = ref();
let time;

const FetchData = async() => {
    const res = await GetMatchDetail(id);

    if (res) {
        if (res.data.leaguelg)
            league_png.value = res.data.leaguelg.link;
        
        league.value = res.data.league;
        stadium.value = res.data.stadium;
        hometeam_png.value = res.data.hometeamlg.link;
        awayteam_png.value = res.data.awayteamlg.link;
        hometeam.value = res.data.hometeam;
        awayteam.value = res.data.awayteam;
        result.value = res.data.result;
        highlight.value = res.data.highlight;
        [hour.value, date.value] = res.data.VNtime.split(" ");
        const [day, month, year] = date.value.split('/');
        date.value = `${year}-${month}-${day}`;
    }
}

const handleLeagueImg = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        league_png.value = null;
        league_file.value = null;
        return;
    }

    league_file.value = file;
    league_png.value = URL.createObjectURL(file);
}

const handleHometeamImg = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        hometeam_png.value = null;
        hometeam_file.value = null;
        return;
    }

    hometeam_file.value = file;
    hometeam_png.value = URL.createObjectURL(file);
}

const handleAwayteamImg = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        awayteam_png.value = null;
        awayteam_file.value = null;
        return;
    }

    awayteam_file.value = file;
    awayteam_png.value = URL.createObjectURL(file);
}

const handleUpdate = async() => {
    if (!league.value || !date.value || !hour.value || !stadium.value || !hometeam.value || !awayteam.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if ((league_file.value && league_url.value) || (hometeam_file.value && hometeam_url.value) || (awayteam_file.value && awayteam_url.value)) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    time = new Date(hour.value + " " + date.value);
    
    const res = await UpdateMatch(id, league_file.value, hometeam_file.value, awayteam_file.value, season.value, stadium.value, league.value, league_url.value, hometeam.value, hometeam_url.value, awayteam.value, awayteam_url.value, result.value, highlight.value, time);
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push('/Admin/Match');
    }
}

const handleDelete = async() => {
    Swal.fire({
        html: `Bạn chắc chắn muốn xóa thông tin trận đấu này chứ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await DeleteMatch(id);

            if (res) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push("/Admin/Match");
            }
        }
    });
}

onMounted(async() => {
    await FetchData();
})
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_video" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Cập nhật thông tin trận đấu</h5>
                <p class="m-0 pt-1">Nhập đầy đủ thông tin cần thiết</p>
            </div>

            <RouterLink to="/Admin/Match" class="container-fluid p-0" style="width: max-content;">
              <button id="back_btn" class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <form id="add_form" class="container-fluid p-3 mt-4" @submit.prevent="handleUpdate">
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
                    <h3 class="w-100">Logo đội nhà (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img v-if="hometeam_png" :src="hometeam_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleHometeamImg">
                    <input v-model="hometeam_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>

                <div class="col-md-6 p-3">
                    <h3 class="w-100">Logo đội khách (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img v-if="awayteam_png" :src="awayteam_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleAwayteamImg">
                    <input v-model="awayteam_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Đội nhà:</h3>
                    <input v-model="hometeam" type="text" class="form-control" placeholder="Nhập tên đội nhà...">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Đội khách:</h3>
                    <input v-model="awayteam" type="text" class="form-control" placeholder="Nhập tên đội khách...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Kết quả:</h3>
                    <input v-model="result" type="text" class="form-control" placeholder="Nhập kết quả...">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Highlight:</h3>
                    <input v-model="highlight" type="text" class="form-control" placeholder="Nhập thông tin highlight...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="update_btn" type="submit" class="btn btn-lg">Sửa</button>
                <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
                <button id="del_btn" type="button" class="btn btn-lg" v-on:click="handleDelete">Xóa</button>
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

#back_btn {
    width: 100px;
    color: #012970;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
}

#back_btn:hover {
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

    #update_btn {
        width: 100px;
        background-color: rgb(0, 133, 205);
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #reset_btn {
        width: 100px;
        background-color: gray;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #del_btn {
        width: 100px;
        background-color: red;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }
}
</style>