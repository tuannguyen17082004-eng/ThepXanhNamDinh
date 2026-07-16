<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import { SearchNews } from '@/utils/NewUtils';
import { SearchVideo } from '@/utils/VideoUtils';
import { type News } from '@/models/news';
import { type Video } from '@/models/video';

let news = ref<News[]>([]);
let video = ref<Video[]>([]);
let page1 = 1;
let page2 = 1;
let keyword = '';
const limit = 3;
const search = ref<HTMLElement>();
const i1 = ref<HTMLElement>();
const i2 = ref<HTMLElement>();
const i3 = ref<HTMLElement>();
const i4 = ref<HTMLElement>();

const searchForNews = async(page : any) => {
    const res = await SearchNews(page, limit, keyword);

    if (res)
        news.value = res.data;
}

const searchForVideo = async(page : any) => {
    const res = await SearchVideo(keyword, page, limit);

    if (res)
        video.value = res.data;
}

const handleSearchButton = async() => {
    page1 = 1;
    page2 = 1;
    await searchForNews(page1);
    await searchForVideo(page2);
}

const closeSearch = () => {
    if (!search.value) return;
    search.value.style.opacity = '0';
    search.value.style.pointerEvents = 'none';
}

onMounted( async() => {
    await searchForNews(page1);
    await searchForVideo(page2);
})
</script>

<template>
    <div ref="search" id="search_bg" class="container-fluid p-0 position-fixed">
        <section id="first_row" class="row w-100 m-0 p-0">
            <div class="col-5 d-flex justify-content-start align-items-center ps-3">
                <h1 class="m-0 d-none d-md-block">THÉP XANH NAM ĐỊNH</h1>
            </div>
            
            <div class="col-2 d-flex justify-content-center align-items-center">
                <RouterLink to="/" v-on:click="closeSearch">
                    <img id="logo" src="/pictures/logo.png" alt="Logo Thép Xanh Nam Định FC"></img>
                </RouterLink>
            </div>

            <div class="col-5 d-flex flex-row justify-content-end align-items-center">
                <i class="bi bi-x-lg" v-on:click="closeSearch"></i>
            </div>
        </section>

        <section id="second_row" class="container-fluid p-0 px-5 d-flex flex-column justify-content-center">
            <h2 class="py-2">TÌM KIẾM</h2>
            
            <div id="search_bar" class="container-fluid px-3 py-2 d-flex align-items-center" style="justify-content: space-between;">
                <input v-model="keyword" type="text" placeholder="Nhập từ khóa..." v-on:keyup.enter="handleSearchButton">
                <i class="bi bi-search ps-2" v-on:click="handleSearchButton"></i>
            </div>
        </section>

        <section id="third_row" class="container-fluid p-0 px-sm-5 px-2 d-flex flex-column position-relative">
            <div class="container-fluid py-5">
                <div class="container-fluid p-0 d-flex align-items-center" style="justify-content: space-between;">
                    <h2>TIN TỨC</h2>

                    <div class="p-0" style="width: max-content;">
                        <ul class="pagination p-0" style="width: max-content; gap: 10px;">
                            <li class="page-item"><span ref="i1" id="icon" class="bi bi-arrow-left" v-on:click="page1 > 1? searchForNews(--page1) : null"></span></li>
                            <li class="page-item"><span ref="i2" id="icon" class="bi bi-arrow-right" v-on:click="async () => {
                                const res = await SearchNews(page1 + 1, limit, keyword);
                                res?.data.length > 0? searchForNews(++page1) : null
                            }"></span></li>
                        </ul>
                    </div>
                </div>

                <div v-if="news.length > 0" id="card_container" class="container-fluid p-0 d-flex">
                    <div id="card" v-for="newcard in news" class="card p-0 position-relative" v-on:click="() => {
                        router.push(`/News/${newcard._id}`);
                        closeSearch();
                    }">
                        <img :src="newcard.img.link"><span id="filter" class="container-fluid h-100 p-0 position-absolute"></span></img>

                        <div id="card_content" class="container-fluid h-100 p-0 position-absolute d-flex flex-column justify-content-end">
                            <h3 class="p-3 pb-0 text-truncate">{{ newcard.title }}</h3>
                            <p class="px-3"><span class="bi bi-clock pe-1"></span>{{ newcard.type }} | {{ newcard.time }}</p>
                        </div>
                    </div>
                </div>

                <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center" style="height: 90px;">
                    <h3>Không tìm thấy kết quả!</h3>
                </div>
            </div>

            <div class="container-fluid py-5">
                <div class="container-fluid p-0 d-flex align-items-center" style="justify-content: space-between;">
                    <h2>VIDEO</h2>

                    <div class="p-0" style="width: max-content;">
                        <ul class="pagination p-0" style="width: max-content; gap: 10px;">
                            <li class="page-item"><span ref="i3" id="icon" class="bi bi-arrow-left" v-on:click="page2 > 1? searchForVideo(--page2) : null"></span></li>
                            <li class="page-item"><span ref="i4" id="icon" class="bi bi-arrow-right" v-on:click="async () => {
                                const res = await SearchVideo(keyword, page2 + 1, limit);
                                res?.data.length > 0? searchForVideo(++page2) : null
                            }"></span></li>
                        </ul>
                    </div>
                </div>

                <div v-if="video.length > 0" id="card_container" class="container-fluid p-0 d-flex">
                    <div id="card" v-for="videocard in video" class="card p-0 position-relative" v-on:click="() => {
                        router.push(`/Video/${videocard._id}`);
                        closeSearch();
                    }">
                        <img :src="videocard.poster.link"><span id="filter" class="container-fluid h-100 p-0 position-absolute"></span></img>

                        <div id="card_content" class="container-fluid h-100 p-0 position-absolute d-flex flex-column justify-content-end">
                            <h3 class="p-3 pb-0 text-truncate">{{ videocard.title }}</h3>
                            <p class="px-3"><span class="bi bi-clock pe-1"></span>{{ videocard.time }}</p>
                        </div>
                    </div>
                </div>

                <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center" style="height: 90px;">
                    <h3>Không tìm thấy kết quả!</h3>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
#search_bg {
    inset: 0;
    background-color: rgb(0, 133, 205);
    z-index: 1001;
    opacity: 0;
    pointer-events: none;
    transition: ease 0.5s;
    overflow-y: scroll;
    scrollbar-width: none;

    #first_row {
        height: 60px;
        border-bottom: 1px white solid;

        h1 {
            font-family: 'Be Vietnam Pro', sans-serif;
            font-size: 23px;
            font-weight: 800;
            color: white;
        }

        i {
            font-size: 25px;
            -webkit-text-stroke: 1px;
            cursor: pointer;
            color: white;
        }

        #logo {
            width: 50px;
            height: 50px;
        }
    }

    #second_row {
        height: 300px;
        font-family: 'Barlow', sans-serif;
        color: white;
        
        h2 {
            font-size: clamp(20px, 20vw, 40px);
            font-weight: 700;
        }

        #search_bar {
            background-color: white;
            border-radius: 40px;

            input {
                height: 40px;
                font-family: 'Barlow', sans-serif;
                width: 100%;
                border: none;
            }

            i {
                color: #012970;
                font-size: 25px;
                -webkit-text-stroke: 1px;
                cursor: pointer;
            }
        }
    }

    #third_row {
        background-color: white;
        font-family: 'Barlow', sans-serif;
        color: #012970;
        border-radius: 40px 40px 0 0;
        bottom: 0;

        h2 {
            font-size: clamp(20px, 20vw, 40px);
            font-weight: 700;
        }

        #icon {
            font-size: 20px;
            -webkit-text-stroke: 1px;
            color: #012970;
        }

        #card_container {
            column-gap: 20px;
            overflow-x: scroll;
            scrollbar-width: none;

            #card {
                min-width: 450px;
                max-width: 450px;
                border: none;
                aspect-ratio: 16 / 9;
                overflow: hidden;

                #filter {
                    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
                }

                #card_content {
                    font-family: 'Barlow', sans-serif;
                    color: white;

                    h3 {
                        font-weight: 600;
                        font-size: 26px;
                    }

                    p {
                        font-weight: 500;
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>