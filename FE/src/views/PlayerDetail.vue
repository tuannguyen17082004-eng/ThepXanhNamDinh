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
    player.value = res?.data;
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

        <section id="pd_content" v-if="player" class="container-fluid p-0 d-flex flex-column">
            <div class="container-fluid py-3 d-flex flex-wrap justify-content-center">
                <h2 class="mx-3">Ngày sinh: <span>{{ player.birth }}</span></h2>
                <h2 class="mx-3">Nơi sinh: <span>{{ player.bio.placeBirth }}</span> <img :src="player.nationality" class="mx-1" style="height: 35px;"></h2>
                <h2 class="mx-3">Chiều cao: <span>{{ player.bio.height }}m</span></h2>
            </div>

            <div class="container-fluid p-5 d-flex flex-column justify-content-center align-items-center" style="max-width: 2000px;">
                <div class="container-fluid d-flex flex-md-row flex-column-reverse p-0">
                    <div class="container-fluid p-0 d-flex flex-column justify-content-center align-items-center">
                        <h3 class="w-100">Thông tin cầu thủ:</h3>
                        <p>{{ player.bio.information }}</p>
                            <RouterLink to="/Squad" class="text-decoration-none" style="width: max-content;">
                                <button class="btn btn-lg px-4">Quay lại</button>
                            </RouterLink>
                    </div>
                    <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
                        <img :src="player.img" class="w-50" style="mask-image: linear-gradient(to top, transparent, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)); min-width: 250px;">
                    </div>
                </div>

            </div>
        </section>

    </main>
</template>

<style scoped>
#pd_background {
    height: 90vh;
    overflow: hidden;
    font-family: 'Barlow', sans-serif;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
    border-bottom: 10px solid rgb(0, 133, 205);

    img {
        z-index: -1;
        height: 90vh;
    }

    h1 {
        font-family: 'Be Vietnam Pro';
        color: white;
        font-size: clamp(50px, 20vw, 100px);
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

#pd_content {
    font-family: 'Barlow', sans-serif;
    color: white;

    h2 {
        color: rgb(0, 133, 205);
        border-bottom: 1px solid rgb(0, 133, 205);
        width: 100%;
        padding: 10px;
        min-width: 200px;
        max-width: 450px;
        font-size: clamp(20px, 3vw, 25px);
        font-weight: 700;
    }

    span {
        font-weight: 500;
    }

    h3 {
        color: black;
        font-weight: 600;
    }

    p {
        color: black;
        white-space: pre-line;
        font-weight: 500;
        font-size: clamp(15px, 3vw, 20px);
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