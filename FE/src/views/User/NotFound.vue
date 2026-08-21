<script setup lang="ts">
</script>

<template>
    <section class="container-fluid d-flex justify-content-center align-items-center">
        <div id="not_found_content" class="container-fluid d-flex flex-column justify-content-center align-items-center">
            <h1>404</h1>
            <h2 class="pb-3 text-center">Không tìm thấy trang</h2>
            <p class="text-center">Có vẻ trang bạn muốn tìm không khả dụng ngay lúc này. Hãy thử nhập lại URL, hoặc đợi đến khi thằng developer đủ thông minh để tạo ra trang này nhé!</p>
        </div>
    </section>
</template>

<style scoped>
section {
    min-height: 100vh;
    max-height: max-content;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url('/pictures/SVĐ\ Thiên\ Trường\ 2.jpg');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;

    #not_found_content {
        font-family: 'Barlow', sans-serif;
        color: white;

        h1 {
            font-size: clamp(60px, 3vw, 70px);
            font-weight: 700;
        }

        h2 {
            font-size: clamp(30px, 3vw, 40px);
            font-weight: 700;
            border-bottom: 2px solid white;
        }
        
        p {
            font-size: clamp(15px, 3vw, 20px);
            font-weight: 500;
            max-width: 600px;
        }
    }
}
</style>