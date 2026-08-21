<script setup lang="ts">
import { useRoute } from 'vue-router';
import { GetNewsById, GetAllNews } from '@/utils/NewUtils';
import { ref, onMounted, computed, watch } from 'vue';
import type { News } from '@/models/news';

let newsdata = ref<News[]>([]);
const news = ref();
const route = useRoute();
const id = computed(() => route.params.id as string);
const newList = ref<HTMLElement | null>(null);
const limit = 10;
const page = 1;
const title = null, type = null, author = null, time = null;

const hozirontalScroll = () => {
    const el = newList.value;

    el?.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
        
        e.preventDefault();
        el.scrollLeft += (e.deltaY * 5);
  })
}

const fetchAllNews = async () => {
    const res = await GetAllNews(page, limit, type, title, author, time);

    if (res) {
        newsdata.value.push(...res.data);
    }
}

const fetchNewsById = async (id : any) => {
    const res = await GetNewsById(id);
    
    if (res) {
        news.value = res.data;
    }
}

onMounted(async () => {
    await fetchNewsById(id.value);
    await fetchAllNews();
    hozirontalScroll();
});

watch(id, async (newId) => {
    await fetchNewsById(newId);
})

</script>

<template>
    <main class="container-fluid m-0 p-0" style="z-index: 1; overflow: hidden;">
        <section v-if="news" class="container-fluid p-0">
            <div id="news_bg" class="p-0 container-fluid d-flex justify-content-start">
                <img class="w-100" :src="news.img.link">
                <div id="news_title" class="container-fluid position-absolute d-flex flex-column">
                    <h1>{{ news.title }}</h1>
                    <p>{{ news.time }}</p>
                </div>
            </div>
            
            <div id="news-content" class="container-fluid">
                <p style="color: #012970; font-weight: 700;">Nguồn: {{ news.author }}</p>
                <p id="content">{{ news.content }}</p>

                <RouterLink to="/News" class="text-decoration-none w-100">
                    <h3 class="p-3"><span class="bi bi-arrow-left p-0 px-2"></span>Quay lại</h3>
                </RouterLink>
            </div>
        </section>

        <section v-else id="no_content" class="container-fluid p-md-5 p-3 d-flex flex-column justify-content-center align-items-center" style="min-height: 100dvh;">
            <h4>Không có dữ liệu</h4>

            <RouterLink to="/News" class="text-decoration-none w-100 mt-5">
                <h3 class="p-3"><span class="bi bi-arrow-left p-0 px-2"></span>Quay lại</h3>
            </RouterLink>
        </section>
        
        <h1 id="title" class="ps-4">TIN TỨC LIÊN QUAN</h1>
        <div ref="newList" id="news_list" class="container-fluid d-flex my-3 ps-4">
                <div id="new_card" class="card" v-for="news in newsdata" :key="news._id">
                    <RouterLink :to="`/News/${news._id}`" class="text-decoration-none text-body">
                        <div class="card-img-top p-0" style="overflow: hidden; aspect-ratio: 16 / 9;">
                            <img class="w-100" :src="news.img.link">
                        </div>
                        <div class="card-body p-0" style="overflow: hidden; height: 130px;">
                            <h4 class="m-0 px-2 pt-3 p-0">{{ news.title }}</h4>
                            <p class="m-0 p-2 pb-0 position-absolute d-flex align-items-center" style="bottom: 5px;">
                                <span class="bi bi-clock pe-1"></span>
                                {{ news.type }} | {{ news.time }}</p>
                        </div>
                    </RouterLink>
                </div>
        </div>
    </main>
</template>

<style scoped>
#news_bg {
    height: 80vh;
    position: relative;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
    border-bottom: 10px solid rgb(0, 133, 205);

    img {
        object-fit: cover;
        z-index: -1;
    }

    #news_title {
        font-family: 'Barlow', sans-serif;
        color: white;
        bottom: 30px;
        padding: 0 10vw;

        h1 {
            font-size: clamp(30px, 3vw, 40px);
            font-weight: 700;
        }

        p {
            font-size: clamp(15px, 3vw, 20px);
            font-weight: 500;
        }
    }
}

#news-content {
    max-width: 2000px;
    font-family: 'Barlow', sans-serif;
    font-size: clamp(15px, 3vw, 20px);
    font-weight: 400;
    padding: 30px 10vw;
    
    #content {
        white-space: pre-line;
        font-weight: 500;
    }

    h3 {
        color: white;
        background-color: rgb(0, 133, 205);
        font-family: 'Barlow', sans-serif;
        font-weight: 500;
        font-size: 20px;
    }

    span {
        color: #012970;
        font-size: 20px;
        -webkit-text-stroke: 1px;
    }
}

#no_content {
    font-family: 'Barlow', sans-serif;

    h3 {
        color: white;
        background-color: rgb(0, 133, 205);
        font-weight: 500;
        font-size: 20px;
    }

    h4 {
        font-size: 35px;
        font-weight: 600;
    }
}

#title {
    font-weight: 700;
    color: rgb(0, 133, 205);
    font-family: 'Barlow', sans-serif;
    padding: 5px 2vw;
}

#news_list {
    font-family: 'Barlow', sans-serif;
    padding: 0 2vw;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    
    #new_card {
        overflow: hidden;
        width: 100%;
        min-width: 350px;
        max-width: 350px;
        border-radius: 10px;
        font-family: "Barlow", sans-serif;

        h4{
            color: rgb(0, 133, 205);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: 700;
            font-size: 20px;
        }
        
        span, p{
            color: black;
            font-size: 15px;
            font-weight: 500;
        }
    }

    #new_card:hover {
        background-color: rgb(0, 133, 205);
        transition: 0.3s ease;
        border: none;

        h4 {
            color: white;
            transition: ease 0.3s;
        }

        span, p {
            color: white;
            transition: ease 0.3s;
        }

        img:first-child {
            transform: scale(1.05);
            transition: 0.3s ease;
        }
    }
}
</style>