<script setup lang="ts"></script>

<template>
    <main class="container-fluid p-0">
        <section id="contact_background" class="container-fluid p-0 d-flex align-items-end">
            <h1 class="p-0 px-5 pb-3">LIÊN HỆ VỚI CHÚNG TÔI</h1>
        </section>

        <section id="contact_content" class="container-fluid p-0 px-4 d-flex flex-column">
            <h3>Địa chỉ</h3>

            <p class="my-2">CLB bóng đá Thép Xanh Nam Định</p>

            <p class="mb-2">Sân vận động Thiên Trường</p>

            <p class="mb-4">Đường Đặng Xuân Thiều, Nam Định, Ninh Bình, Việt Nam</p>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d773.6445845164856!2d106.16064002792838!3d20.443528218839866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e7471458090d%3A0xc7cf9a0dbd3dad0d!2zU8OibiB24bqtbiDEkeG7mW5nIFRoacOqbiBUcsaw4budbmc!5e0!3m2!1svi!2s!4v1784733780172!5m2!1svi!2s" width="100%" style="border:0; aspect-ratio: 3 / 2;" allowfullscreen="false" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>            
            
            <h3>Thông tin liên hệ</h3>

            <p class="my-2">SĐT: 0123456789</p>

            <p class="mb-2">Email: <a href="mailto:clbbdnamdinh@gmail.com">clbbdnamdinh@gmail.com</a></p>

            <p class="mb-2">Facebook: <a href="https://www.facebook.com/ThepXanhNamDinhFC">www.facebook.com/ThepXanhNamDinhFC</a></p>

            <p class="mb-4">Instagram: <a href="l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fofficialthepxanhnamdinh%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExTXg3VHpMVXNraXE1QU5Yd3NydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6d8ouTLElHUwwzWPB_-k3eCt0qFbgAHTALSTvxf4Dme-60Ptnjd8YnIPYyLA_aem_0B7ODD6MGX986NdqQLg0dA&h=AUAtlO31r4fm1bopf0E5v0QW5TsnDKdehG6DfxiV4ZqwNgBGR2p2LgPbZYJgefTxoPbq1eCIlkdkPcvnr1S7pwM86MajcDoO4YHL59qQurNCRWTfZf_ys4ik8kn8Lsdq8cUK">officialthepxanhnamdinh</a></p>
        </section>

        <section id="advertisement" class="container-fluid py-3 px-3 d-flex justify-content-center align-items-center" style="gap: 20px; flex-wrap: wrap;">
                <img src="/pictures/Ocany advertisement.webp" alt="Quảng cáo Ocany" class="w-100" style="max-width: 250px;">
                <img src="/pictures/Jogarbola advertisement.jpg" alt="Quảng cáo Jogarbola" class="w-100" style="max-width: 250px;">
        </section>
    </main>
</template>

<style scoped>
#contact_background {
    position: relative;
    height: 300px;
    background-color: rgb(0, 133, 205);
    font-family: 'Barlow', sans-serif;
    color: white;

    h1 {
        font-weight: 700;
        font-size: clamp(40px, 3vw, 50vw);
    }
}

#contact_content {
    max-width: 800px;
    font-family: "Barlow", sans-serif;

    p, ul, li {
        width: 100%;
        font-size: clamp(15px, 3vw, 20px);
        font-weight: 400;
    }

    h3 {
        padding-top: 30px;
        width: 100%;
        font-size: clamp(20px, 3vw, 28px);
        font-weight: 700;
        color: rgb(0, 133, 205);
    }
}
</style>