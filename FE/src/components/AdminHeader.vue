<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { GetUserInformation } from '@/utils/UserUtils';
    import { type User } from '@/models/user';

    const a = ref<User>();
    

    const GetUser = async () => {
        const id = sessionStorage.getItem('bruh');
        const res = await GetUserInformation(id);
        a.value = res?.data;
    }

    onMounted(async () => {
        await GetUser();
    });
</script>

<template>
    <header id="header" class="header fixed-top d-flex p-2">
        <div class="container d-flex align-items-center justify-content-start p-0 m-0" style="width: max-content;">
            <RouterLink to="/" class="text-decoration-none">
                <img src="/pictures/logo.png" style="width: 50px;" alt="logo">
            </RouterLink>
            <h3 class="m-0 ms-2 d-none d-sm-block">THÉP XANH NAM ĐỊNH</h3>
        </div>
        
        <div class="container d-flex align-items-center justify-content-end m-0 p-0" style="width: max-content;">
            <i class="bi bi-search"></i>
            <i class="bi bi-bell"></i>
            <i class="bi bi-list"></i>
            <div class="container p-0" style="height: 40px; overflow: hidden; aspect-ratio: 1 / 1;">
                <img :src="a?.avatar" class="h-100 w-100 object-fit-cover" style="border-radius: 50%;">
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: white;
    color: rgb(0, 133, 205);
    justify-content: space-between;
    box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
    height: 70px;
    z-index: 999;

    h3 {
        font-family: 'Be Vietnam Pro', sans-serif;
        font-weight: 900;
        font-size: 20px;
    }

    i {
        padding: 10px;
        color: black;
        font-size: 25px;
    }
}
</style>