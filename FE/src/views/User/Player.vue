<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Player } from '@/models/player';
import { GetAllPlayers } from '@/utils/PlayerUtils';

const cards = ref([])

const GKplayers = ref<Player[]>([]);
const DFplayers = ref<Player[]>([]);
const MFplayers = ref<Player[]>([]);
const STplayers = ref<Player[]>([]);

const fetchPlayers = async () => {
    let res = await GetAllPlayers('GK');

    if (res) {
        GKplayers.value = res.data;
    }
    
    res = await GetAllPlayers('DF');
    if (res) {
        DFplayers.value = res.data;
    }
    
    res = await GetAllPlayers('MF');
    if (res) {
        MFplayers.value = res.data;
    }
    
    res = await GetAllPlayers('ST');
    if (res) {
        STplayers.value = res.data;
    }
}

const showCard = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio >= 0.05) {
                entry.target.classList.add("show")
                observer.unobserve(entry.target)
            }
        })
        },
        {
            threshold: [0.05]
        }
    )

    cards.value.forEach(el => observer.observe(el))
}

onMounted(async () => {
    await fetchPlayers();
    showCard();
});

</script>

<template>
    <main class="container-fluid p-0">
        <div id="player_background" class="container-fluid m-0 p-0 d-flex align-items-end">
            <div class="container p-0 m-0 w-100 position-absolute">
                <h2 class="m-0 pb-3 px-5">ĐỘI HÌNH CHÍNH</h2>
                <p class="m-0 pb-3 px-5">Danh sách cầu thủ và ban huấn luyện mùa giải 2025/2026</p>
            </div>
        </div>
        <div id="player_content"
            class="container-fluid m-0 p-0 w-100 d-flex flex-column justify-content-center align-items-center">
        <div id="position_list" class="container-fluid m-0 p-0"
            style="background-color: #f8f9fa; box-shadow: 5px 5px 5px rgb(224, 220, 220);">
            <ul class="m-0 p-0 d-flex flex-row justify-content-center align-items-center">
                <a href="#GK" class="text-decoration-none text-body h-100">
                    <li>Thủ môn</li>
                </a>
                <a href="#DF" class="text-decoration-none text-body h-100">
                    <li>Hậu vệ</li>
                </a>
                <a href="#MF" class="text-decoration-none text-body h-100">
                    <li>Tiền vệ</li>
                </a>
                <a href="#ST" class="text-decoration-none text-body h-100">
                    <li>Tiền đạo</li>
                </a>
                <a href="#CO" class="text-decoration-none text-body h-100">
                    <li>Ban huấn luyện</li>
                </a>
            </ul>
        </div>
        <div id="title" class="container-fluid m-0 px-3 pt-5">
            <h3 id="GK">Thủ môn</h3>
        </div>
        <div id="player_menu" class="container-fluid m-0 mt-5 py-5">
            <div v-for="player in GKplayers" :key="player._id" id="player_card" ref="cards"
                class="card w-100 border-0 d-flex flex-column">
                <RouterLink :to="`/Squad/${ player._id }`" class="text-decoration-none">
                <h1 class="position-absolute w-100 text-center">{{ player.number }}</h1>
                <div id="card_img" class="container w-100 px-5">
                    <img class="card-img-top px-5 position-absolute" :src="player.img">
                </div>
                <div id="card_inf" class="card-body m-0 w-100">
                    <h3 class="card-title m-0 p-0">{{ player.firstname }}</h3>
                    <p class="card-text m-0 p-0 mt-1">{{ player.lastname }}</p>
                    <img id="national" class="position-absolute" :src="player.nationality">
                </div>
                </RouterLink>
            </div>
        </div>
        <div id="title" class="container-fluid m-0 p-0 pt-5 px-3">
            <h3 id="DF">Hậu vệ</h3>
        </div>
        <div id="player_menu" class="container-fluid m-0 mt-5 py-5">
            <div v-for="player in DFplayers" :key="player._id" id="player_card" ref="cards"
                class="card w-100 border-0 d-flex flex-column">
                <RouterLink :to="`/Squad/${player._id}`" class="text-decoration-none">
                    <h1 class="position-absolute w-100 text-center">{{ player.number }}</h1>
                    <div id="card_img" class="container w-100 px-5">
                        <img class="card-img-top px-5 position-absolute" :src="player.img">
                    </div>
                    <div id="card_inf" class="card-body m-0 w-100">
                        <h3 class="card-title m-0 p-0">{{ player.firstname }}</h3>
                        <p class="card-text m-0 p-0 mt-1">{{ player.lastname }}</p>
                        <img id="national" class="position-absolute" :src="player.nationality">
                    </div>
                </RouterLink>
            </div>
        </div>
        <div id="title" class="container-fluid m-0 p-0 pt-5 px-3">
            <h3 id="MF">Tiền vệ</h3>
        </div>
        <div id="player_menu" class="container-fluid m-0 mt-5 py-5">
            <div v-for="player in MFplayers" :key="player._id" id="player_card" ref="cards"
                class="card w-100 border-0 d-flex flex-column">
                <RouterLink :to="`/Squad/${player._id}`" class="text-decoration-none">
                    <h1 class="position-absolute w-100 text-center">{{ player.number }}</h1>
                    <div id="card_img" class="container w-100 px-5">
                        <img class="card-img-top px-5 position-absolute" :src="player.img">
                    </div>
                    <div id="card_inf" class="card-body m-0 w-100">
                        <h3 class="card-title m-0 p-0">{{ player.firstname }}</h3>
                        <p class="card-text m-0 p-0 mt-1">{{ player.lastname }}</p>
                        <img id="national" class="position-absolute" :src="player.nationality">
                    </div>
                </RouterLink>
            </div>
        </div>
        <div id="title" class="container-fluid m-0 p-0 pt-5 px-3">
            <h3 id="ST">Tiền đạo</h3>
        </div>
        <div id="player_menu" class="container-fluid m-0 mt-5 py-5" style="max-width: 1600px;">
            <div v-for="player in STplayers" :key="player._id" id="player_card" ref="cards"
                class="card w-100 border-0 d-flex flex-column">
                <RouterLink :to="`/Squad/${ player._id }`" class="text-decoration-none">
                    <h1 class="position-absolute w-100 text-center">{{ player.number }}</h1>
                    <div id="card_img" class="container w-100 px-5">
                        <img class="card-img-top px-5 position-absolute" :src="player.img">
                    </div>
                    <div id="card_inf" class="card-body m-0 w-100">
                        <h3 class="card-title m-0 p-0">{{ player.firstname }}</h3>
                        <p class="card-text m-0 p-0 mt-1">{{ player.lastname }}</p>
                        <img id="national" class="position-absolute" :src="player.nationality">
                    </div>
                </RouterLink>
            </div>
        </div>
        <div id="title" class="container-fluid m-0 p-0 pt-5 px-5 w-100 d-flex justify-content-start align-items-start">
            <h3 id="CO">Ban huấn luyện</h3>
        </div>
        <!--<div id="player_menu" class="container-fluid m-0 mt-5 p-5" style="max-width: 1600px;">
            <div v-for="coach in coachdata" :key="coach.id" id="player_card"
                class="card w-100 border-0 d-flex flex-column">
                <div id="card_img" class="container w-100 px-5">
                    <img class="card-img-top px-5 position-absolute" :src=" coach.img">
                </div>
                <div id="card_inf" class="card-body m-0 w-100">
                    <h3 class="card-title m-0 p-0">{{ coach.name }}</h3>
                    <p class="card-text m-0 p-0 mt-1">{{ coach.position }}</p>
                    <img id="national" class="position-absolute" :src="coach.national">
                </div>
            </div>
        </div>-->
    </div>
    </main>
</template>

<style scoped></style>