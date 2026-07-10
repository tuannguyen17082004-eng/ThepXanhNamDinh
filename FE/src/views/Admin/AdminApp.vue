<script setup lang="ts">
    import HeaderComponent from '@/components/AdminHeader.vue';
    import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
    <HeaderComponent />
    <div class="container-fluid p-0 d-flex position-relative" style="z-index: 0;">
        <div id="sidebar_container" class="container p-0 m-0 fixed-top">
            <Sidebar />
        </div>
        <div id="content_container" class="container-fluid p-0" style="background-color: rgb(242, 246, 253);">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
#sidebar_container {
    height: 100dvh;
    min-width: 260px;
    width: 260px;
    transition: 1s ease-in-out;
}

#content_container {
    margin: 0 0 0 260px;
    transition: 1s ease-in-out;
}

@media screen and (max-width: 767.5px) {
    #content_container {
        margin: 0 !important;
    }

    #sidebar_container {
        min-width: 0;
        width: 0;
    }
}
</style>