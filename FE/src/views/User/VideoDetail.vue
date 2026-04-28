<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Video } from '@/models/video';
import { GetVideoById, GetAllVideos } from '@/utils/VideoUtils';
import { computed, onMounted, ref, watch } from 'vue';

const route = useRoute();
const video = ref();
const videodata = ref<Video[]>([]);
const id = computed(() => route.params.id as string);
const videoList = ref<HTMLElement | null>(null);
const page = 1;
const limit = 10;
const time = null, title = null;

const hozirontalScroll = () => {
    const el = videoList.value;

    el?.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

        e.preventDefault();
        el.scrollLeft += (e.deltaY * 5);
  })
}

const fetchVideoById = async (id : any) => {
    const res = await GetVideoById(id);
    video.value = res?.data;
}

const fetchVideo = async (page : any, limit : any, time : any, title : any) => {
    const res = await GetAllVideos(page, limit, time, title);
    videodata.value = res?.data;
}

onMounted(async () => {
    await fetchVideo(page, limit, time, title);
    await fetchVideoById(id.value);
    hozirontalScroll();
});

watch(id, async (newId) => {
    await fetchVideoById(newId);
})

</script>

<template>
    <main class="container-fluid m-0 p-0 d-flex flex-column align-items-center" style="background-color: white;">
        <section class="container-fluid p-0" v-if="video">
            <div class="container-fluid m-0 p-0 d-flex justify-content-center align-items-center"
                style="aspect-ratio: 16 / 9;">
                <video class="p-0 m-0 w-100 h-100" :src="video?.link" controls></video>
            </div>
            <div id="video_detail_content" class="container-fluid m-0 px-md-5 px-4 pt-3 d-flex flex-column">
                <p id="vid_time" class="d-flex align-items-center"><img src="/pictures/watch-bg-black.png"
                    style="background-color: transparent; width: 27px; height: 27px; margin-right: 3px;">
                    {{ video?.time }}</p>
                <h1 id="vid_title" class="w-50">{{ video?.title }}</h1>
                <div class="d-flex my-4 justify-content-center align-items-center">
                    <RouterLink to="/Video" class=" text-decoration-none" style="width: max-content;">
                        <button class="btn btn-primary" style="width: 120px;">Quay lại</button>
                    </RouterLink>
                </div>
            </div>
            <h1 class="px-md-5 m-0 px-4 pt-3" style="align-self: flex-start;">VIDEO MỚI NHẤT</h1>
        <div ref="videoList" id="video_extend" class="container-fluid my-3 px-md-5 px-4 d-flex">
                <div id="video_extend_card" class="card" v-for="video in videodata" :key="video._id">
                    <RouterLink :to="`/Video/${video._id}`" class="text-decoration-none">
                        <div class="card-img-top p-0" style="aspect-ratio: 16 / 9; overflow: hidden;">
                            <img class="w-100" :src="video.poster"></img>
                        </div>
                        <div class="card-body m-0" style="height: 120px;">
                            <h4 class="pt-1">{{ video.title }}</h4>
                            <p class="position-absolute d-flex align-items-center"><img src="/pictures/watch-bg-black.png"
                                    style="background-color: transparent; width: 22px; height: 22px; margin-right: 3px;">
                                {{ video.time }}</p>
                        </div>
                    </RouterLink>
                </div>
        </div>
        </section>
        <section class="container-fluid p-0" v-else>
            <div id="no_video" class="container-fluid p-0 px-4 d-flex flex-column justify-content-center align-items-center w-100">
                <h4>Bạn cần đăng nhập hoặc đăng ký tài khoản để xem video này</h4>
                <div class="container p-0 d-flex justify-content-center align-items-center">
                    <RouterLink to="/Login" class="text-decoration-none">
                        <button class="btn btn-primary m-3">Đăng nhập</button>
                    </RouterLink>
                    <RouterLink to="/Register" class="text-decoration-none">
                        <button class="btn btn-primary m-3">Đăng ký</button>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
#video_detail_content {
    max-width: 2000px;

    #vid_time {
        color: black;
        font-family: "Barlow", sans-serif;
        font-weight: 500;
        font-size: clamp(14px, 1.5vw, 18px);
    }

    #vid_title {
        color: rgb(0, 133, 205);
        font-family: "Barlow", sans-serif;
        font-weight: 700;
        font-size: clamp(20px, 1rem + 3vw, 40px);
    }

    button {
        font-family: "Barlow", sans-serif;
        font-weight: 500;
        background-color: rgb(0, 133, 205);
        color: white;
    }
}

h1:not(#vid_title) {
    background-color: white;
    color: rgb(0, 133, 205);
    font-family: "Barlow", sans-serif;
    font-weight: 700;
}

#video_extend {
    background-color: white;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    gap: 1rem;

    #video_extend_card {
        width: 350px;
        min-width: 350px;
        max-width: 350px;
        overflow: hidden;

        p {
            color: black;
            font-family: "Barlow", sans-serif;
            font-size: 15px;
            font-weight: 500;
            bottom: -8px;
        }

        h4 {
            color: rgb(0, 133, 205);
            font-family: "Barlow", sans-serif;
            font-size: 20px;
            font-weight: 700;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    #video_extend_card:hover {
        img:first-child {
            transform: scale(1.05);
            transition: ease 0.3s;
        }
        
    }

}

#no_video {
    background-image:linear-gradient(rgba(0, 0, 0, 0.5)), url(../pictures/Thiên\ Trường.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100dvh;

    h4 {
        color: white;
        font-family: "Barlow", sans-serif;
        font-size: clamp(18px, 1rem + 2vw, 40px);
        font-weight: 700;
    }

    button {
        width: 120px;
        font-family: "Barlow", sans-serif;
        font-weight: 500;
        background-color: rgb(0, 133, 205);
        color: white;
    }
}

@media screen and (max-width: 575px) {
    #video_extend_card {
        width: 300px !important;
        min-width: 300px !important;
        transition: ease 0.3s;
    }

    #vid_title {
        width: 100% !important;
    }
}
</style>