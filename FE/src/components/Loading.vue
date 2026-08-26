<script setup lang="ts">
import { ProgressSpinner } from 'primevue';
</script>

<template>
    <div id="spinner_background" class="container-fluid p-0 d-flex flex-column justify-content-center align-items-center position-fixed">
        <ProgressSpinner
            :strokeWidth="18"
            animationDuration=".5s"
            style="width: 50px; height: 50px"
            :pt="{
                circleTrack: { style: { stroke: 'transparent' } }
            }"
        />
        <p class="m-3">Hệ thống đang xử lý, vui lòng không chuyển trang hay thoát!</p>
    </div>
</template>

<style scoped>
#spinner_background {
    top: 0;
    left: 0;
    height: 100dvh; 
    z-index: 1000;
    font-family: 'Barlow', sans-serif;
    backdrop-filter: blur(8px);
}
</style>