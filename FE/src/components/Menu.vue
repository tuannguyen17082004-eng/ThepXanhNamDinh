<script setup lang="ts">
import { ref } from 'vue'

const hamburger_menu = ref<HTMLElement | null>(null)

const closeMenu = () => {
    if (!hamburger_menu.value) return
    hamburger_menu.value.style.opacity = "0";
    hamburger_menu.value.style.pointerEvents = "none";
}
</script>

<template>
    <div ref="hamburger_menu" id="hamburger_menu" class="container-fluid p-0 h-100">
        <div id="ham_menu_row" class="row w-100 border-bottom p-0 m-0">
            <div class="col-5 d-flex justify-content-start align-items-center ps-3">
                <i class="bi bi-x-lg text-white" v-on:click="closeMenu()"></i>
            </div>

            <div class="col-2 d-flex justify-content-center align-items-center">
                <RouterLink to="/" v-on:click="closeMenu()">
                    <img id="logo" src="/pictures/logo.png" alt="Logo Thép Xanh Nam Định FC"></img>
                </RouterLink>
            </div>

            <div class="col-5 d-flex flex-row justify-content-end align-items-center">
                <img id="sponsor" src="/pictures/Tập đoàn Xuân Thiện.png" alt="Tập đoàn Xuân Thiện"></img>
            </div>
        </div>

        <div id="ham_bottom_row" class="row w-100 px-5 m-0 mt-5">
            <div class="col-lg-4 d-flex flex-column justify-content-start align-items-start mb-5" style="z-index: 999;">
                <RouterLink id="ham_menu_mainmenu" class="text-decoration-none" to="/News" v-on:click="closeMenu()">
                    <p class="text-white d-flex align-items-center w-100 m-0 ps-2 py-2">TIN TỨC</p>
                </RouterLink>
                <RouterLink id="ham_menu_mainmenu" class="text-decoration-none" to="/Squad" v-on:click="closeMenu()">
                    <p class="text-white d-flex align-items-center w-100 m-0 ps-2 py-2">ĐỘI HÌNH</p>
                </RouterLink>
                <RouterLink id="ham_menu_mainmenu" class="text-decoration-none" to="/Schedule"
                    v-on:click="closeMenu()">
                    <p class="text-white d-flex align-items-center w-100 m-0 ps-2 py-2">LỊCH TRÌNH</p>
                </RouterLink>
                <RouterLink id="ham_menu_mainmenu" class="text-decoration-none" to="/Video" v-on:click="closeMenu()">
                    <p class="text-white d-flex align-items-center w-100 m-0 ps-2 py-2">VIDEO</p>
                </RouterLink>
                <RouterLink id="ham_menu_mainmenu" class="text-decoration-none" to="/Store" v-on:click="closeMenu()">
                    <p class="text-white d-flex align-items-center w-100 m-0 ps-2 py-2">CỬA HÀNG</p>
                </RouterLink>
            </div>

            <div class="col-lg-8 d-flex flex-column" style="position: relative;">
                <div class="row w-100 m-0 p-0" style="z-index: 999;">
                    <div class="col-md-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <h3 class="w-100 border-bottom py-1 px-2">VÉ</h3>
                        <a href="https://datve.clbnamdinh.vn/?fbclid=IwY2xjawQk8vBleHRuA2FlbQIxMABicmlkETFJSnY5TW9hY3lFNGJDVlR3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHiAciJVZaJJguu_9R9z9VL17unfyVnlUyIcd-jIhk7hKBH_Wv05b8ZVuPQkX_aem_hP1uyhrXHCtxxh3f8dzEjg" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Mua vé</h5>
                        </a>
                        <RouterLink to="/TicketDetail" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Thông tin giá vé</h5>
                        </RouterLink>
                    </div>

                    <div class="col-md-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <h3 class="w-100 border-bottom py-1 px-2">VỀ ĐỘI BÓNG</h3>
                        <RouterLink to="/Academy" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Học viện</h5>
                        </RouterLink>
                        <RouterLink to="/Charter" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Tôn chỉ CLB</h5>
                        </RouterLink>
                        <RouterLink to="/History" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Lịch sử</h5>
                        </RouterLink>
                        <RouterLink to="/Honours" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Danh hiệu</h5>
                        </RouterLink>
                        <RouterLink to="/Stadium" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Sân vận động Thiên Trường</h5>
                        </RouterLink>
                    </div>
                </div>

                <div class="row w-100 m-0 p-0" style="z-index: 999;">
                    <div class="col-md-6 d-flex flex-column justify-content-start align-items-start mt-3">
                        <h3 class="w-100 border-bottom py-1 px-2">THEO DÕI CHÚNG TÔI</h3>
                        <a href="https://www.facebook.com/ThepXanhNamDinhFC" class="text-decoration-none">
                            <h5 class="text-white py-3 px-2">Facebook</h5>
                        </a>
                        <a href="https://www.instagram.com/officialthepxanhnamdinh?fbclid=IwY2xjawM8rV1leHRuA2FlbQIxMABicmlkETE0ekpHZ1U4cDh0RncxUW9vAR4D86-p6q8uy88E258gIofkg-9Yk48ORSNwWPTliEhZFMBVfQl8jXFIKhboRg_aem_fe6gddzCp9yk6v8sG1gmxw"
                            class="text-decoration-none">
                            <h5 class="text-white py-3 px-2">Instagram</h5>
                        </a>
                        <a href="https://www.tiktok.com/@thepxanhnamdinh" class="text-decoration-none">
                            <h5 class="text-white py-3 px-2">Tiktok</h5>
                        </a>
                        <a href="https://www.facebook.com/ThepXanhNamDinhFC" class="text-decoration-none">
                            <h5 class="text-white py-3 px-2">Telegram</h5>
                        </a>
                    </div>

                    <div class="col-md-6 d-flex flex-column justify-content-start align-items-start mt-3">
                        <h3 class="w-100 border-bottom py-1 px-2">THÊM</h3>
                        <RouterLink to="/" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Điều khoản sử dụng</h5>
                        </RouterLink>
                        <RouterLink to="/" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Chính sách bảo mật</h5>
                        </RouterLink>
                        <RouterLink to="/" class="text-decoration-none" v-on:click="closeMenu()">
                            <h5 class="text-white py-3 px-2">Liên hệ với chúng tôi</h5>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#hamburger_menu {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(0, 133, 205, 0.7), rgba(0, 133, 205, 0.7)), url("../pictures/Trước\ trận\ đấu.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1000;
    position: fixed;
    opacity: 0;
    transition: ease 0.5s;
    pointer-events: none;
    overflow-y: scroll;
    scrollbar-width: none;

    #ham_menu_row {
        height: 60px;
    }

    i {
        font-size: 25px;
        -webkit-text-stroke: 2px;
        cursor: pointer;
    }

    #logo {
        width: 50px;
        height: 50px;
    }

    #sponsor {
        height: 30px;
        width: 90px;
    }

    p {
        width: auto;
        font-family: 'Barlow', sans-serif;
        font-size: clamp(25px, 1rem + 3vw, 35px);
        font-weight: 700;
    }

    p:hover,
    h5:hover {
        padding-left: 20px !important;
        transition: ease 0.3s;
    }

    h3 {
        font-family: "Barlow", sans-serif;
        font-size: clamp(20px, 2vw, 30px);
        font-weight: 700;
        color: white;
    }

    h5 {
        font-family: "Barlow", sans-serif;
        font-size: clamp(15px, 1.5vw, 25px);
        font-weight: 500;
    }
}

@media screen and (max-width: 1140px) {
    #ham_menu_row {
        height: 50px !important;
    }

    #logo {
        width: 40px !important;
        height: 40px !important;
    }

}

@media screen and (max-width: 960px) {}

@media screen and (max-width: 576px) {
    #sponsor {
        display: none;
    }

    #ham_bottom_row {
        padding: 0 15px !important;
    }
}
</style>