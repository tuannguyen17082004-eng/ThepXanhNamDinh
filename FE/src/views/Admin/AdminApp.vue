<script setup lang="ts">
import { SidebarLayout, SidebarBackdrop, SidebarTrigger, SidebarSpacer, SidebarAside, SidebarPanel, Sidebar, SidebarHeader, SidebarMain, SidebarContent, SidebarFooter } from 'primevue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { GetUserInformation } from '@/utils/UserUtils';
import { type User } from '@/models/user';
import router from '@/router';

const isMobile = ref(false);
const open = ref(true);
const a = ref<User>();
let mql = null;
let onMqlChange = null;

const CheckSidebar = () => {
    if (typeof window === 'undefined') return;
    mql = window.matchMedia('(max-width: 720px)');
    isMobile.value = mql.matches;
    open.value = !isMobile.value;

    onMqlChange = (event: any) => {
        isMobile.value = event.matches;
        open.value = !event.matches;
    };

    mql.addEventListener('change', onMqlChange);
}

const GetUser = async () => {
    const id = localStorage.getItem('bruh');
    const res = await GetUserInformation(id);
    a.value = res?.data;
}

onMounted(async () => {
    await GetUser();
    CheckSidebar();
});

</script>

<template>
    <div class="container-fluid p-0 d-flex position-relative" style="z-index: 0; overflow: hidden;">
        <SidebarLayout class="container-fluid p-0" style="min-height: 100dvh;">
            <SidebarBackdrop v-if="isMobile && open"></SidebarBackdrop>
            <Sidebar id="sidebar" :collapsible="'offcanvas'" :overlay="isMobile" style="height: 100dvh;"
                v-model:open="open">
                <SidebarSpacer />
                <SidebarAside>
                    <SidebarPanel>
                        <SidebarHeader>
                            <div id="sidebar_header" class="container-fluid p-0">
                                <RouterLink to="/"
                                    class="text-decoration-none d-flex align-items-center justify-content-start">
                                    <img src="/pictures/logo.png" style="width: 50px;" alt="logo">
                                    <h3 class="m-0 ms-2">THÉP XANH NAM ĐỊNH</h3>
                                </RouterLink>
                            </div>
                        </SidebarHeader>

                        <SidebarContent>
                            <div class="container-fluid p-0 mt-2" id="sidebar_content">
                                <ul class="sidebar-nav p-0">
                                    <li class="nav-item mb-2">
                                        <RouterLink to="/Admin"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-house"><span class="px-2">Trang chủ</span></i>
                                        </RouterLink>
                                    </li>
                                    <li class="nav-item my-2">
                                        <RouterLink to="/Admin/News"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-newspaper"><span class="px-2">Tin tức</span></i>
                                        </RouterLink>
                                    </li>
                                    <li class="nav-item my-2">
                                        <RouterLink to="/Admin/Video"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-play-btn"><span class="px-2">Video</span></i>
                                        </RouterLink>
                                    </li>
                                    <li class="nav-item my-2">
                                        <RouterLink to="/Admin/Match"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-calendar3"><span class="px-2">Lịch trình</span></i>
                                        </RouterLink>
                                    </li>
                                    <li class="nav-item my-2">
                                        <RouterLink to="/Admin/Players"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-file-person"><span class="px-2">Cầu thủ</span></i>
                                        </RouterLink>
                                    </li>
                                    <li class="nav-item my-2">
                                        <RouterLink to="/Admin/Users"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-person"><span class="px-2">Người dùng</span></i>
                                        </RouterLink>
                                    </li>
                                    <li class="nav-item">
                                        <RouterLink to="/Admin/Season"
                                            class="text-decoration-none w-100 h-100 d-flex align-items-center">
                                            <i class="bi bi-globe"><span class="px-2">Mùa giải</span></i>
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>
                        </SidebarContent>
                    </SidebarPanel>
                </SidebarAside>
            </Sidebar>

            <SidebarMain style="height: 100dvh; overflow-y: scroll; scrollbar-width: none; position: relative;">
                <header id="content_header" class="container-fluid p-0 position-sticky d-flex">
                    <SidebarTrigger severity="secondary" target="sidebar" :text="true" size="small">
                        <i class="bi bi-list"></i>
                    </SidebarTrigger>

                    <div id="profile" class="container-fluid p-0 py-2 m-0 me-3" v-on:click="() => router.push('/Profile')">
                        <RouterLink to="/Profile" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                            <img :src="a?.avatar.link" class="h-100 object-fit-cover"
                                style="aspect-ratio: 1 / 1; border-radius: 50%;">
                            <p class="m-0 mx-2" style="color: #012970;">{{ a?.name }}</p>
                        </RouterLink>
                    </div>
                </header>

                <div class="container-fluid p-0 pt-2">
                    <RouterView />
                </div>
            </SidebarMain>
        </SidebarLayout>
    </div>
</template>

<style scoped>
#sidebar {
    width: 270px;
}

#sidebar_header {
    font-family: 'Be Vietnam Pro', sans-serif;

    h3 {
        font-weight: 900;
        font-size: 16px;
        color: rgb(0, 133, 205);
    }
}

#sidebar_content {
    ul {
        list-style: none;
        font-family: 'Barlow', sans-serif;

        li {
            padding: 0 0 0 20px;
            height: 50px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            display: flex;
            align-items: center;
            white-space: nowrap;
        }

        i {
            font-size: 20px;
            font-style: normal;
            transition: 0.3s ease-in-out;
            color: #012970;
            font-weight: 600;
        }
    }

    li:hover {
        background-color: rgb(248, 249, 250);

        i {
            color: rgb(0, 133, 205);
        }
    }
}

#profile {
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    height: 50px;
    cursor: pointer;
    width: max-content;
}

#content_header {
    justify-content: space-between;
    align-items: center;
    background-color: white;
    top: 0;
    box-shadow: 1px 2px 5px rgb(224, 220, 220); 

    i {
        color: #012970;
        font-size: 25px;
        cursor: pointer;
    }
}
</style>