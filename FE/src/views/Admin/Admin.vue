<script setup lang="ts">
    import { onMounted } from 'vue';
    import { isAdmin } from '@/middlewares/isAdmin';

    onMounted( async () => {
        await isAdmin();
    })
</script>

<template></template>

<style scoped></style>