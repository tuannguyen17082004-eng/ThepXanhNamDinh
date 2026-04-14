<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router';
import MenuComponent from '../components/Menu.vue';
import { isLogin } from '@/middlewares/isLogined';

const top = ref<HTMLElement | null>()
const bottom = ref<HTMLElement | null>()

const handleScroll = () => {
    if (top.value && bottom.value) {
        if (window.scrollY > 200) {
           top.value.style.display = ''
            bottom.value.style.backgroundColor = "rgb(0, 133, 205)"
           bottom.value.style.backgroundImage = "none"
        }
        else {
            top.value.style.display = "none"
            bottom.value.style.backgroundColor = "transparent"
            bottom.value.style.backgroundImage = "linear-gradient(to top, rgba(0,0,0,0),rgba(0,0,0,0.5))"
        }
    }
}

const LoginNav = async () => {
    const res = await isLogin();
    const id = sessionStorage.getItem("bruh")

    if (res != true)
        router.push('/Login');
    else
        router.push(`/Profile/${id}`);
}

MenuComponent.showMenu = () => {
    const hamburger_menu = document.getElementById("hamburger_menu")
    if (!hamburger_menu) return
    hamburger_menu.style.opacity = "1";
    hamburger_menu.style.pointerEvents = "auto";
}

onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <header class="container-fluid m-0 p-0 w-100">

        <!--Dòng trên-->

        <div ref="top" id="top" class="row m-0 p-0 justify-content-between align-items-center bg-white w-100">
            <div class="col-8 d-flex flex-row m-0 p-0 justify-content-start ps-3 position-absolute top-left">
                <strong>THÉP XANH NAM ĐỊNH</strong>
            </div>
            <div class="col-4 d-flex flex-row m-0 p-0 justify-content-end pe-3 position-absolute top-right">
                <ul class="nav">
                    <li class="nav-item pe-3">
                        <RouterLink to="/Search">
                            <img class="icon" src="/pictures/Search icon.png" alt="Tìm kiếm"></img>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                            <img class="icon" src="/pictures/Login icon.png" alt="Đăng nhập" v-on:click="LoginNav"></img>
                    </li>
                </ul>
            </div>
        </div>

        <!--Dòng dưới-->

        <div ref="bottom" id="bottom"
            class="row m-0 p-0 justify-content-between align-items-center w-100 border-bottom">
            <div class="col-5 d-flex m-0 p-0 justify-content-start">
                <ul class="nav d-flex flex-row m-0 p-0 justify-content-center align-items-center ps-3">
                    <li class="nav-item">
                        <img class="icon" src="/pictures/Menu icon.png" alt="Menu"
                            v-on:click="MenuComponent.showMenu()"></img>

                    </li>
                    <li id="hiddenchoice" class="nav-item ps-1">
                        <RouterLink class="text-decoration-none" to="/News">
                            <p>Tin tức</p>
                        </RouterLink>
                    </li>
                    <li id="hiddenchoice" class="nav-item">
                        <RouterLink class="text-decoration-none" to="/Squad">
                            <p>Đội hình</p>
                        </RouterLink>
                    </li>
                    <li id="hiddenchoice" class="nav-item">
                        <RouterLink class="text-decoration-none" to="/Schedule">
                            <p>Lịch trình</p>
                        </RouterLink>
                    </li>
                    <li id="hiddenchoice" class="nav-item">
                        <RouterLink class="text-decoration-none" to="/Store">
                            <p>Cửa hàng</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="col-2 d-flex flex-row justify-content-center align-items-center">
                <RouterLink to="/">
                    <img id="logo" src="/pictures/logo.png" alt="Logo Thép Xanh Nam Định FC"></img>
                </RouterLink>
            </div>
            <div class="col-5 d-flex flex-row justify-content-end align-items-center pe-4">
                <img id="sponsor" src="/pictures/Tập đoàn Xuân Thiện.png" alt="Tập đoàn Xuân Thiện"></img>
            </div>
        </div>
    </header>

    <MenuComponent />
</template>

<style scoped>
header {
    position: fixed;
    z-index: 999;
}

#top {
    height: 40px;
    overflow: hidden;
}

#bottom {
    height: 60px;
    transition: ease 0.3s;
}

.top-left {
    top: 5px;
    left: 0;
}

.top-right {
    top: 5px;
    right: 0;
}

strong {
    font-family: "Be Vietnam Pro", sans-serif;
    font-weight: 820;
    font-size: 20px;
    color: rgb(0, 133, 205);
    transition: ease 0.3s;
}

.icon {
    width: 25px;
    height: 25px;
}

.icon:hover {
    cursor: pointer;
}

#logo {
    width: 50px;
    height: 50px;
}

p {
    color: white;
    font-family: "Barlow", sans-serif;
    font-weight: 700;
    padding-top: 5px;
    margin: 0 20px;
}

p:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-skip-ink: all;
    cursor: pointer;
}

#sponsor {
    height: 30px;
    width: 90px;
}

@media screen and (max-width: 1140px) {
    #bottom {
        height: 50px;
    }

    #hiddenchoice {
        display: none;
    }

    #logo {
        width: 40px;
        height: 40px;
    }
}

@media screen and (max-width: 425px) {
    strong {
        font-size: 15px;
        padding: 5px;
        transition: ease 0.3s;
    }

    #sponsor {
        display: none;
    }

}
</style>