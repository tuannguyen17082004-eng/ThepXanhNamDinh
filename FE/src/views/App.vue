<script setup lang="ts">
import HeaderCompoment from '../components/Header.vue';
import FooterCompoment from '../components/Footer.vue';
</script>

<template>
    <HeaderCompoment />
    <RouterView />
    <FooterCompoment />
</template>

<style scoped></style>
