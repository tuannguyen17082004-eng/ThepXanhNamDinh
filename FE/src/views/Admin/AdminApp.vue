<script setup lang="ts">
    import HeaderComponent from '@/components/AdminHeader.vue';
    import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
    <HeaderComponent />
    <div class="container-fluid p-0 d-flex" style="margin-top: 70px;">
        <Sidebar />
        <RouterView />
    </div>
</template>

<style scoped></style>