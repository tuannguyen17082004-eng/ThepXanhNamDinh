<script setup lang="ts">
import stadiumdata from '../data/stadium.json';


</script>
<template>
    <section id="stadium_page"
        class="container-fluid m-0 p-0 d-flex flex-column justify-content-center align-items-center">
        <div id="stadium_image_background" class="container-fluid m-0 p-0"></div>
        <div id="stadium_content" class="container-fluid m-0 px-3 pt-2">
            <h1 class="mt-5" style="font-family: 'Barlow', sans-serif; font-weight: 700; color: rgb(0, 133, 205);">
                THÔNG TIN VỀ SÂN VẬN ĐỘNG
            </h1>
            <div id="stadium_detail" class="container-fluid m-0 p-3">
                <h2 class="pb-3">THÔNG TIN CHI TIẾT</h2>
                <p class="px-3">Tên: {{ stadiumdata.name }}</p>
                <p class="px-3">Sức chứa: {{ stadiumdata.capacity }}</p>
                <p class="px-3">Địa điểm: {{ stadiumdata.location }}</p>
                <p class="px-3">Năm khánh thành: {{ stadiumdata.open }}</p>
                <p class="px-3">Kích thước: {{ stadiumdata.size }}</p>
            </div>
            <div id="stadium_introduction" class="container-fluid m-0 p-3">
                <h2 class="pb-3">GIỚI THIỆU VỀ SÂN VẬN ĐỘNG</h2>
                <p class="px-3">{{ stadiumdata.introduction }}</p>
            </div>
            <div id="stadium_diagram" class="container-fluid m-0 mb-5 p-3">
                <h2 class="pb-3">SƠ ĐỒ SÂN VẬN ĐỘNG</h2>
                <img :src="stadiumdata.image" alt="Sơ đồ sân vận động" class="img-fluid">
            </div>

        </div>
    </section>
</template>

<style scoped>
#stadium_image_background {
    height: 400px;
    overflow: hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(../pictures/SVĐ\ Thiên\ Trường\ 3.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

}

#stadium_content {
    width: 80%;

    h2 {
        font-family: 'Barlow', sans-serif;
        font-weight: 700;
        color: rgb(0, 133, 205);
    }

    p {
        font-family: 'Barlow', sans-serif;
        font-weight: 500;
        font-size: 18px;
    }

    #stadium_diagram {
        img {
            width: 100%;
        }
    }
}

@media screen and (max-width: 720px) {

    #stadium_content {
        width: 100%;
    }

    #stadium_image_background {
        height: 400px;
    }
}
</style>