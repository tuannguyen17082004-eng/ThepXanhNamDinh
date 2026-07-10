<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { type Player } from '@/models/player';
import { GetPlayerByID } from '@/utils/PlayerUtils'

const player = ref<Player>();
const route = useRoute();
const id = route.params.id;

const getPlayerByID = async (id : any) => {
    const res = await GetPlayerByID(id);

    if (res) {
        player.value = res.data;
    }   
}

onMounted(async () => {
    await getPlayerByID(id);
})

</script>

<template>
    <main class="container-fluid p-0">
        <section id="pd_background" v-if="player" class="container-fluid p-0 d-flex justify-content-center">
            <img :src="player.bio.background" class="w-100 object-fit-cover position-absolute">

            <div class="container px-5 py-3 d-flex flex-column justify-content-end" style="height: 90vh;">
                <h2>{{ player.number }}</h2>
                <h3>{{ player.firstname }}</h3>
                <h1>{{ player.lastname }}</h1>
            </div>
        </section>

        <section class="container-fluid p-0" style="background-color: rgb(0, 133, 205);">
            <div id="pd-btn" class="container-fluid py-3 px-4 d-flex justify-content-start align-items-center">
                <RouterLink to="/Squad" class="text-decoration-none d-flex align-items-center">
                    <i class="bi bi-arrow-left p-0 px-2"></i>
                    <button class="btn btn-lg p-0 text-white">Quay lại</button>
                </RouterLink>
            </div>

            <div id="pd_content" v-if="player" class="container-fluid p-0 pt-3 d-flex flex-column">
                <div class="container-fluid py-3 d-flex flex-wrap justify-content-center" style="max-width: max-content; column-gap: 40px; row-gap: 10px;">
                    <div id="info" class="container-fluid p-0">
                        <h2 class="m-0 p-0">Ngày sinh:</h2>
                        <p class="m-0 mb-2">{{ player.birth }}</p>
                    </div>
                    <div id="info" class="container-fluid p-0">
                        <h2 class="m-0 p-0">Nơi sinh:</h2>
                        <p class="m-0 mb-2">{{ player.bio.placeBirth }}<img class="ms-2" :src="player.nationality" style="height: 25px;" alt="Nationality"></p>
                    </div>
                    <div id="info" class="container-fluid p-0">
                        <h2 class="m-0 p-0">Chiều cao:</h2>
                        <p class="m-0 mb-2">{{ player.bio.height }}m</p>
                    </div>
                </div>

                <div class="container-fluid p-5 pt-3 d-flex flex-column justify-content-center align-items-center" style="max-width: 2000px;">
                    <div class="container-fluid d-flex flex-md-row flex-column-reverse p-0">
                        <div class="container-fluid p-0 d-flex flex-column justify-content-center align-items-center">
                            <h3 class="w-100">Thông tin cầu thủ:</h3>
                            <p>{{ player.bio.information }}</p>
                        </div>
                        <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
                            <img :src="player.img" class="w-50" style="mask-image: linear-gradient(to top, transparent, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)); min-width: 250px;">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center" style="gap: 20px; flex-wrap: wrap;">
                <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
                <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100" style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped>
#pd_background {
    height: 90vh;
    overflow: hidden;
    font-family: 'Barlow', sans-serif;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));

    img {
        z-index: -1;
        height: 90vh;
    }

    h1 {
        font-family: 'Be Vietnam Pro';
        color: white;
        font-size: clamp(50px, 20vw, 80px);
        font-weight: 700;
    }

    h2 {
        font-size: clamp(15px, 20vw, 70px);
        color: rgb(0, 133, 205);
        font-weight: 700;
    }

    h3 {
        font-size: clamp(15px, 20vw, 35px);
        color: white;
        font-weight: 700;
    }
}

#pd-btn {
    button {
        font-family: 'Barlow', sans-serif;
        font-weight: 600;
    }

    i {
        color: #012970;
        font-size: 20px;
        -webkit-text-stroke: 1px;
    }
}

#pd_content {
    font-family: 'Barlow', sans-serif;
    color: white;
    background-color: white;
    border-radius: 40px 40px 0 0;

    #info {
        width: 250px;
        border-bottom: 1px solid rgb(0, 133, 205);

        h2 {
            color: #012970;
            width: 100%;
            padding: 10px;
            font-size: clamp(15px, 3vw, 20px);
            font-weight: 700;
        }
    }

    h3 {
        color: #012970;
        font-weight: 700;
    }

    p {
        color: black;
        white-space: pre-line;
        font-weight: 500;
        font-size: clamp(18px, 3vw, 20px);
    }

    button {
        color: rgb(0, 133, 205);
        font-family: "Barlow", sans-serif;
        font-size: 16px;
        font-weight: 600;
        border-radius: 25px;
        border: 2px rgb(0, 133, 205) solid;
    }

    button:hover {
        color: white;
        background-color: rgb(0, 133, 205);
        transition: ease 0.3s;
    }
}
</style>