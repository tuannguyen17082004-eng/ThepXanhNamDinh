<script setup lang="ts">
    import router from '@/router';
    import { ref, onMounted } from 'vue'
    import { toast } from 'vue3-toastify'
    import { GetAllNews } from '@/utils/NewUtils'
    import { GetAllPlayers } from '@/utils/PlayerUtils'
    import { GetAllVideos } from '@/utils/VideoUtils'
    import { GetAllUser } from '@/utils/UserUtils'
    import { type News } from '@/models/news'
    import { type Player } from '@/models/player'
    import { type Video } from '@/models/video'
    import { type User } from '@/models/user'

    const news = ref<News[]>([])
    const players = ref<Player[]>([])
    const videos = ref<Video[]>([])
    const users = ref<User[]>([])

    const fetchData = async() => {
        const newData = await GetAllNews(null, null, null, null, null, null)
        const playerData = await GetAllPlayers(null)
        const videoData = await GetAllVideos(null, null, null, null)
        const userData = await GetAllUser(null, null)

        if (!newData || !playerData || !videoData || !userData) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

        news.value = newData.data
        players.value = playerData.data
        videos.value = videoData.data
        users.value = userData.data
    }

    onMounted(() => [
        fetchData()
    ])
</script>

<template>
    <main class="container-fluid m-0" style="padding-top: 70px;">
        <section id="number_section" class="row w-100 p-0 m-0">
            <div class="row col-xl-6 p-0 m-0">
                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-end">
                            <h4>Bài viết</h4>|
                            <p v-on:click="() => router.push('/Admin/News')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-newspaper"></i><span>{{ news.length }}</span>
                        </div>
                    </div>
                </div>
                
                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Video</h4>|
                            <p v-on:click="() => router.push('/Admin/Video')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-play-btn"></i><span>{{ videos.length }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row col-xl-6 p-0 m-0">
                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Cầu thủ</h4>|
                            <p v-on:click="() => router.push('/Admin/Players')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-file-person"></i><span>{{ players.length }}</span>
                        </div>
                    </div>
                </div>

                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Người dùng</h4>|
                            <p v-on:click="() => router.push('/Admin/Users')">Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-people"></i><span>{{ users.length }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
#number_section {
    
    #number_card {
        
        #card_content {
            min-width: 210px;
            height: 120px;
            background-color: white;
            font-family: 'Barlow', sans-serif;

            h4 {
                margin: 0 10px 0 0;
                font-size: 20px;
                font-weight: 700;
                height: max-content;
            }

            p {
                margin: 0 0 0 10px;
                color: #899bbd;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
            }

            i {
                border-radius: 50%;
                padding: 10px 15px;
                font-size: 20px;
                color: #012970;
                background-color: #f6f6fe;
            }

            span {
                color: rgb(0, 133, 205);
                margin: 0 10px;
                font-size: 30px;
                font-weight: 700;
            }
        }
    }
}
</style>