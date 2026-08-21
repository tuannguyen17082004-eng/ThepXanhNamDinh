<script setup lang="ts"></script>

<template>
    <aside id="sidebar" class="sidebar m-0 w-100">
        <ul class="sidebar-nav p-0">
            <li class="nav-item mb-2">
                <RouterLink to="/Admin" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-house"><span class="px-2">Trang chủ</span></i>
                </RouterLink>
            </li>
            <li class="nav-item my-2">
                <RouterLink to="/Admin/News" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-newspaper"><span class="px-2">Tin tức</span></i>
                </RouterLink>
            </li>
            <li class="nav-item my-2">
                <RouterLink to="/Admin/Video" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-play-btn"><span class="px-2">Video</span></i>
                </RouterLink>
            </li>
            <li class="nav-item my-2">
                <RouterLink to="/Admin/Match" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-calendar3"><span class="px-2">Lịch trình</span></i>
                </RouterLink>
            </li>
            <li class="nav-item my-2">
                <RouterLink to="/Admin/Players" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-file-person"><span class="px-2">Cầu thủ</span></i>
                </RouterLink>
            </li>
            <li class="nav-item my-2">
                <RouterLink to="/Admin/Users" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-person"><span class="px-2">Người dùng</span></i>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/Admin/Season" class="text-decoration-none w-100 h-100 d-flex align-items-center">
                    <i class="bi bi-globe"><span class="px-2">Mùa giải</span></i>
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>

<style scoped>
#sidebar {
    font-family: 'Barlow', sans-serif;
    box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
    background-color: white;
    height: 100dvh;
    padding-top: 80px;
    overflow-y: scroll;
    scrollbar-width: none;

    ul {
        list-style: none;

        li {
            padding: 0 0 0 20px;
            height: 50px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            display: flex;
            align-items: center;
            white-space: nowrap;
        }
    }

    i {
        font-size: 20px;
        font-style: normal;
        transition: 0.3s ease-in-out;
        color: #012970;
        font-weight: 600;
    }

    li:hover {
        background-color: rgb(248, 249, 250);

        i {
            color: rgb(0, 133, 205);
        }
    }
}
</style>