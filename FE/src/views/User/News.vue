<script setup lang="ts">
import { GetAllNews } from "@/utils/NewUtils";
import { ref, onMounted } from 'vue';
import type { News } from '@/models/news';
import { Skeleton } from "primevue";

let newsdata = ref<News[]>([]);
let loading = ref(true);
let page = 1;
const limit = 9;
let type: string | null = null;
let title: string | null = null;
let author: string | null = null;
let time: string | null = null;

const fetchNews = async () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllNews(page, limit, type, title, author, time);

        if (res) {
            newsdata.value.push(...res.data);
            loading.value = false;
        }
    }, 500);
}

const getTypeNew = async (typef: any) => {
    type = typef;
    page = 1;
    newsdata.value = [];
    await fetchNews();
}

const moreNews = async () => {
    page++;
    await fetchNews();
}

onMounted(async () => {
    await fetchNews();
});
</script>

<template>
    <main class="container-fluid m-0 p-0">
        <section id="new_title_bg" class="container-fluid m-0 p-0 w-100 d-flex justify-content-start align-items-end">
            <div class="container-fluid m-0 p-0 w-100">
                <h1 class="m-0 p-0 px-5 pb-3">TIN TỨC CHÍNH</h1>
                <p class="m-0 p-0 px-5 pb-3">Chúng tôi đem đến những thông tin mới nhất về clb cũng như những câu chuyện
                    bên
                    lề,...</p>
            </div>
        </section>

        <!--Phần tin tức-->
        <section class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center">
            <div id="newtype_list" class="container-fluid m-0 p-0"
                style="background-color: #f8f9fa; box-shadow: 5px 5px 5px rgb(224, 220, 220);">
                <ul class="m-0 p-0 d-flex flex-row">
                    <li v-on:click="getTypeNew(null)">Tất cả</li>
                    <li v-on:click="getTypeNew('Highlights')">Highlights</li>
                    <li v-on:click="getTypeNew('CLB')">CLB</li>
                    <li v-on:click="getTypeNew('Fanclub')">Fanclub</li>
                    <li v-on:click="getTypeNew('Đào tạo')">Đào tạo</li>
                    <li v-on:click="getTypeNew('Thông tin trận đấu')">Thông tin trận đấu</li>
                </ul>
            </div>

            <div v-if="loading" class="container-fluid p-0">
                <div id="new_menu" class="container-fluid my-3 m-0 p-3 w-100"
                    style=" max-width: 1600px; grid-template-columns: repeat(auto-fill, 400px);">
                    <div v-for="i in 9" class="card w-100" style="max-width: 400px; border: none;">
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
                <div v-if="newsdata.length != 0" class="container-fluid d-flex flex-column align-items-center">
                    <div id="new_menu" class="container-fluid my-3 m-0 p-3 w-100"
                        style=" max-width: 1600px; grid-template-columns: repeat(auto-fill, 400px);">
                        <div id="new_card" v-for="news in newsdata" :key="news._id" class="card">
                            <RouterLink :to="`/News/${news._id}`" class="text-decoration-none text-body">
                                <div class="card-img-top p-0" style="overflow: hidden; aspect-ratio: 16 / 9;">
                                    <img class="w-100" :src="news.img.link">
                                </div>
                                <div class="card-body p-0" style="overflow: hidden; height: 130px;">
                                    <h4 class="m-0 px-2 pt-3 p-0">{{ news.title }}</h4>
                                    <p class="m-0 p-2 pb-0 position-absolute d-flex align-items-center"
                                        style="bottom: 5px;">
                                        <span class="bi bi-clock pe-1"></span>
                                        {{ news.type }} | {{ news.time }}
                                    </p>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                    <button id="button" type="button" class="btn btn-lg m-3" v-on:click="moreNews()">Đọc thêm</button>
                </div>
                <div id="no_item" v-else class="container-fluid my-5 d-flex justify-content-center align-items-center">
                    <h1>Không có tin tức nào phù hợp với danh mục này!</h1>
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
#new_title_bg {
    position: relative;
    height: 400px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(/pictures/Hình\ nền\ tin\ tức.jpg);
    background-position: center;
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

#button {
    color: rgb(0, 133, 205);
    font-family: "Barlow", sans-serif;
    font-size: 16px;
    font-weight: 600;
    border-radius: 25px;
    border: 2px rgb(0, 133, 205) solid;
}

#button:hover {
    color: white;
    background-color: rgb(0, 133, 205);
    transition: ease 0.3s;
}

#newtype_list {
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
}

#newtype_list ul {
    list-style-type: none;
    height: 60px;

    li {
        max-width: 180px;
        min-width: 180px;
        height: 100%;
        font-family: "Barlow", sans-serif;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

#newtype_list ul li:hover {
    border-bottom: 4px rgb(0, 133, 205) solid;
    cursor: pointer;
}

#new_menu {
    #new_card {
        max-width: 400px;

        h4 {
            color: rgb(0, 133, 205);
        }
    }

    #new_card:hover {
        h4 {
            color: white;
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

@media screen and (max-width: 575px) {
    #new_title_bg {

        h1,
        p {
            padding-left: 20px !important;
        }
    }
}
</style>