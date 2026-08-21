<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { GetMatchDetail } from '@/utils/MatchUtils';
import { useRoute } from 'vue-router';
import { type Match } from '@/models/match';

const route = useRoute();
const id = route.params.id;
const match = ref<Match>();
let check = null;

const getMatch = async (id : any) => {
    const res = await GetMatchDetail(id);

    if (!res) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu!", {
            position: toast.POSITION.TOP_CENTER,
        });
        return;
    }
    match.value = res.data;
    check = res.data.highlight;
}


onMounted( async () => {
    await getMatch(id);
})
</script>

<template>
    <main class="container-fluid p-0">
        <section id="schedule_detail_bg" v-if="match" class="container-fluid p-0 d-flex align-items-end">
            <div class="container-fluid p-0 d-flex flex-column">
                <div class="container-fluid p-0 d-flex flex-column justify-content-center align-items-center">
                    <img v-if="match.leaguelg" class="mb-3" id="league_logo" :src="match.leaguelg.link" alt="league logo">
                    <h3 class="mb-1">{{ match.VNtime }}</h3>
                    <h3 class="mb-3">{{ match.stadium }}</h3>
                </div>
                <div class="row w-100 py-4 m-0">
                    <div class="col-4 d-flex flex-column justify-content-end align-items-center">
                        <img id="team_logo" :src="match.hometeamlg.link">
                        <h2 class="d-none d-md-block">{{ match.hometeam }}</h2>
                    </div>
                    <div class="col-4 d-flex flex-column justify-content-center align-items-center">
                        <h3>FT</h3>
                        <h1 class="px-md-4 py-md-2 px-3 py-1">{{ match.result }}</h1>
                    </div>
                    <div class="col-4 d-flex flex-column justify-content-end align-items-center">
                        <img id="team_logo" :src="match.awayteamlg.link">
                        <h2 class="d-none d-md-block">{{ match.awayteam }}</h2>
                    </div>
                </div>
            </div>
        </section>

        <section class="container-fluid p-0">
            <img class="w-100 p-0" src="/pictures/Vfantasy advertisement.png">
        </section>

        <section id="schedule_detail_content" class="container-fluid py-3">
            <div class="container p-0">
                <h1>Highlight</h1>
                <p v-if="!check" class="w-100 text-center" style="height: 300px; justify-content: center; align-items: center; display: flex;">Không có highlight!</p>
                <video v-else :src="match?.highlight" class="w-100" style="aspect-ratio: 16 / 9;"></video>
            </div>
        </section>
    </main>
</template>

<style scoped>
#schedule_detail_bg {
    border-bottom: 4px rgb(0, 133, 205) solid;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url("/pictures/Chi tiết trận đấu.jpg");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;
    font-family: 'Barlow', sans-serif;
    color: white;

    #league_logo {
        height: 40px;
    }

    #team_logo {
        padding: 10px;
        margin-bottom: 10px;
        width: 100%;
        max-width: 140px;
        min-width: 70px;
    }

    h3 {
        font-size: clamp(15px, 2vw, 18px);
        font-weight: 600;
    }

    h2 {
        font-size: clamp(25px, 2vw, 30px);
        font-weight: 700;
    }

    h1 {
        font-size: clamp(25px, 5vw, 60px);
        font-weight: 700;
        background-color: rgb(0, 133, 205);
        border-radius: 10px;
    }
}

#schedule_detail_content {
    font-family: 'Barlow', sans-serif;

    h1 {
        font-weight: 700;
    }

    p {
        font-size: 20px;
    }
}
</style>