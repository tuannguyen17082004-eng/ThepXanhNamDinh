<script setup lang="ts">
import { GetAllVideos } from '@/utils/VideoUtils';
import { type Video } from '@/models/video';
import { ref, onMounted } from 'vue';
import { Skeleton } from 'primevue';

const videolist = ref<Video[]>([]);
let loading = ref(false);
const limit = 12;
let page = 1;
const time = null, title = null;

const moreVideos = async () => {
    page++;
    await fetchVideo();
}

const fetchVideo = async () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllVideos(page, limit, time, title);

        if (res) {
            videolist.value.push(...res.data);
            loading.value = false;
        }
    }, 500);
}

onMounted(async () => {
    await fetchVideo();
});

</script>

<template>
    <main class="container-fluid m-0 p-0" style="z-index: 1; overflow: hidden;">
        <section id="video_title_bg" class="container-fluid p-0 d-flex justify-content-start align-items-end">
            <div class="container-fluid p-0">
                <h1 class="m-0 p-0 px-5 pb-3">VIDEO MỚI NHẤT</h1>
                <p class="m-0 p-0 px-5 pb-3">Chúng tôi đem đến những highlight mới nhất về những trận đấu của clb cũng
                    như
                    những video thú vị bên lề,...</p>
            </div>
        </section>

        <!--Phần video-->
        <section class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center"
            style="border-top: 10px solid rgb(0, 133, 205);">
            <div v-if="loading" class="container-fluid p-0">
                <div id="video_menu" class="container-fluid my-3 m-0 p-3">
                    <div v-for="i in 6" class="card w-100" style="max-width: 400px; border: none;">
                        <div class="card-img-top p-0" style="aspect-ratio: 16 / 9;">
                            <Skeleton border-radius="8px" height="220px"></Skeleton>
                        </div>

                        <div class="card-body p-0 mt-2 d-flex flex-column"
                            style="height: 130px; justify-content: space-between;">
                            <Skeleton border-radius="5px" height="30px" width="80%"></Skeleton>
                            <Skeleton border-radius="2px" height="15px" width="50%" class="mb-4"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="container-fluid p-0">
                <div v-if="videolist.length != 0" class="container-fluid d-flex flex-column align-items-center">
                    <div id="video_menu" class="container-fluid my-3 m-0 p-3">
                        <div id="video_card" v-for="video in videolist" :key="video._id" class="card w-100">
                            <RouterLink :to="`/Video/${video._id}`" class="text-decoration-none text-white">
                                <div class="card-img-top p-0" style="overflow: hidden; aspect-ratio: 16 / 9;">
                                    <img class="w-100" :src="video.poster.link">
                                </div>
                                <div class="card-body p-0" style="overflow: hidden; height: 130px;">
                                    <h4 class="m-0 px-2 pt-3 p-0">{{ video.title }}</h4>
                                    <p class="m-0 p-2 pb-0 position-absolute d-flex align-items-center">
                                        <span class="bi bi-clock pe-1"></span>
                                        {{ video.time }}
                                    </p>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                    <button id="button" type="button" class="btn btn-lg m-3" v-on:click="moreVideos()">Đọc thêm</button>
                </div>
                <div id="no_item" v-else class="container-fluid my-5 d-flex justify-content-center align-items-center">
                    <h1>Không có video:<<<< </h1>
                </div>
            </div>
        </section>


        <!--Quảng cáo-->
        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center"
            style="gap: 20px; flex-wrap: wrap;">
            <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
            <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100"
                style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped>
#video_title_bg {
    position: relative;
    height: 400px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(../pictures/Hình\ nền\ video.jpg);
    background-position: 10%;
    background-repeat: no-repeat;
    background-size: cover;

    h1 {
        font-family: "Barlow", sans-serif;
        font-size: clamp(40px, 3vw, 50vw);
        font-weight: 700;
        color: white;
    }

    p {
        font-family: "Barlow", sans-serif;
        font-size: clamp(15px, 3vw, 20px);
        font-weight: 500;
        color: white;
    }
}


#video_menu {
    max-width: 1600px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 400px);
    gap: 1rem;
    justify-content: center;
    justify-items: start;

    #video_card {
        overflow: hidden;
        max-width: 400px;
        border-radius: 10px;
        font-family: "Barlow", sans-serif;

        h4 {
            color: rgb(0, 133, 205);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: 700;
        }

        p {
            color: black;
            bottom: 5px;
            font-weight: 500;
        }
    }

    #video_card:hover {
        background-color: rgb(0, 133, 205);
        transition: 0.3s ease;
        border: none;

        h4,
        p {
            color: white;
            transition: 0.3s ease;
        }

        img:first-child {
            transform: scale(1.05);
            transition: 0.3s ease;
        }
    }
}

#no_item {
    h1 {
        font-family: 'Barlow', sans-serif;
        font-weight: 500;
        font-size: 30px;
    }
}

#button {
    color: rgb(0, 133, 205);
    font-family: "Barlow", sans-serif;
    font-size: 16px;
    font-weight: 700;
    border-radius: 25px;
    border: 2px rgb(0, 133, 205) solid;
}

#button:hover {
    color: white;
    background-color: rgb(0, 133, 205);
    transition: ease 0.3s;
}

@media screen and (max-width: 575px) {
    #video_title_bg {

        h1,
        p {
            padding-left: 20px !important;
        }
    }

    #video_menu {
        display: flex !important;
        flex-direction: column;

        #video_card {
            max-width: none !important;
        }
    }
}
</style>