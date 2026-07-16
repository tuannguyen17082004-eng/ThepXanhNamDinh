<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router';
import MenuComponent from '@/components/Menu.vue';
import SearchComponent from '@/components/Search.vue';
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

    if (res != true)
        router.push('/Login');
    else
        router.push(`/Profile`);
}

MenuComponent.showMenu = () => {
    const hamburger_menu = document.getElementById("hamburger_menu");

    if (!hamburger_menu) return
    hamburger_menu.style.opacity = "1";
    hamburger_menu.style.pointerEvents = "auto";
}

SearchComponent.showSearch = () => {
    const search = document.getElementById("search_bg");
    
    if (!search) return;
    search.style.opacity = '1';
    search.style.pointerEvents = 'auto';
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
    <header class="container-fluid m-0 p-0 w-100 fixed-top">

        <!--Dòng trên-->

        <div ref="top" id="top" class="row m-0 p-0 justify-content-between align-items-center bg-white w-100">
            <div class="col-8 d-flex flex-row h-100 p-0 justify-content-start align-items-center ps-3">
                <strong>THÉP XANH NAM ĐỊNH</strong>
            </div>
            <div class="col-4 d-flex flex-row h-100 m-0 p-0 justify-content-end align-items-center pe-3">
                <ul class="nav">
                    <li class="nav-item pe-3">
                            <i class="bi bi-search" v-on:click="SearchComponent.showSearch()"></i>
                    </li>
                    <li class="nav-item">
                            <i class="bi bi-person-circle" v-on:click="LoginNav"></i>
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
                        <i class="bi bi-list text-white" v-on:click="MenuComponent.showMenu()"></i>

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
    <SearchComponent />
</template>

<style scoped>
header {
    z-index: 999;
}

#top {
    height: 45px;
    overflow: hidden;
}

#bottom {
    height: 60px;
    transition: ease 0.3s;
}

strong {
    font-family: "Be Vietnam Pro", sans-serif;
    font-weight: 820;
    font-size: 20px;
    color: rgb(0, 133, 205);
    transition: ease 0.3s;
}

i {
    color: #012970;
    font-size: 25px;
    cursor: pointer;
    -webkit-text-stroke: 1px;
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