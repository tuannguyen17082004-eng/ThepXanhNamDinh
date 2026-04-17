<script setup lang="ts"></script>

<template>
    <aside id="sidebar" class="sidebar py-3 fixed-top w-100">
        <ul class="sidebar-nav">
            <li class="nav-item mb-2">
                <i class="bi bi-house"><span class="px-2">Trang chủ</span></i>
            </li>
            <li class="nav-item my-2">
                <i class="bi bi-newspaper"><span class="px-2">Tin tức</span></i>
            </li>
            <li class="nav-item my-2">
                <i class="bi bi-play-btn"><span class="px-2">Video</span></i>
            </li>
            <li class="nav-item my-2">
                <i class="bi bi-calendar3"><span class="px-2">Lịch trình</span></i>
            </li>
            <li class="nav-item my-2">
                <i class="bi bi-file-person"><span class="px-2">Cầu thủ</span></i>
            </li>
            <li class="nav-item my-2">
                <i class="bi bi-person"><span class="px-2">Người dùng</span></i>
            </li>
        </ul>
    </aside>
</template>

<style scoped>
#sidebar {
    z-index: 0;
    font-family: 'Barlow', sans-serif;
    box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
    max-width: 300px;
    min-width: none;
    bottom: 0;
    margin-top: 70px;

    ul {
        list-style: none;

        li {
            height: 50px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            display: flex;
            align-items: center;
        }
    }

    i {
        font-size: 20px;
        font-style: normal;
        color: rgb(0, 133, 205);
        font-weight: 500;
    }

    li:hover {
        background-color: rgb(248, 249, 250);
    }
}
</style>