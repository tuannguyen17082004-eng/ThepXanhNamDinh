<script setup lang="ts">

</script>

<template>
    <section id="honours_page" class="container-fluid m-0 p-0">
        <div id="honours_background" class="container-fluid m-0 p-0 d-flex justify-content-center align-items-end">
            <div class="container-fluid px-5 pb-3">
                <h1>DANH HIỆU</h1>
                <p>Là một trong những câu lạc bộ bóng đá có lịch sử lâu đời tại Việt Nam, CLB Thép Xanh Nam Định từng
                    giành nhiều danh hiệu và thành tích đáng ghi nhận ở các giải đấu quốc nội, góp phần khẳng định vị
                    thế và niềm tự hào của bóng đá thành Nam.</p>
            </div>
        </div>

        <div id="honours_list" class="container-fluid m-0 p-0 py-5 d-flex justify-content-center">
            <div class="row w-100" style="max-width: 1200px;">
                <div class="col-sm-6 ps-3">
                    <h4>V.League 1</h4>
                    <p>1985, 2023–24, 2024–25</p>
                    <h4>V.League 2</h4>
                    <p>1981, 2017</p>
                    <h4>V.League 3</h4>
                    <p>2014</p>
                    <h4>Cúp Quốc Gia</h4>
                    <p>2007</p>
                    <h4>Siêu cúp Quốc Gia</h4>
                    <p>2024</p>
                    <h4>Vô địch Quốc Gia U-21</h4>
                    <p>2004, 2011</p>
                    <h4>Vô địch Quốc Gia U-15</h4>
                    <p>2008</p>
                    <h4>Vô địch Quốc Gia U-13</h4>
                    <p>2025</p>
                    <h4>Giải vô địch bóng đá Đông Dương</h4>
                    <p>1943, 1945</p>
                    <h4>Giải bóng đá Viettel mở rộng</h4>
                    <p>2022</p>
                </div>

                <div class="col-sm-6 d-flex flex-column justify-content-center align-items-center">
                    <div id="picture"
                        class="pt-5 container d-flex flex-column justify-content-center align-items-center">
                        <img src="/pictures/vô địch.jpg">
                        <p class="p-0 m-0 pt-2">Chức vô địch V.League 2023/2024</p>
                    </div>

                    <div id="picture"
                        class="pt-5 container d-flex flex-column justify-content-center align-items-center">
                        <img src="/pictures/Vô địch V.League 3 2017.jpg">
                        <p class="p-0 m-0 pt-2">Chức vô địch V.League 2 2017</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
#honours_background {
    height: 600px;
    overflow: hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(../pictures/vô\ địch.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    h1 {
        font-family: "Barlow", sans-serif;
        font-size: clamp(40px, 3vw, 50vw);
        font-weight: 700;
        color: white;
    }

    p {
        width: 80%;
        font-family: "Barlow", sans-serif;
        font-size: clamp(15px, 3vw, 20px);
        color: white;
    }
}

#honours_list {
    font-family: "Barlow", sans-serif;

    h4 {
        margin: 0;
        margin-bottom: 5px;
        padding-left: 10px;
        color: rgb(0, 133, 205);
        font-weight: 700;
    }

    p {
        margin: 0;
        margin-bottom: 25px;
        padding-left: 10px;
        font-weight: 600;
    }
}

#picture {
    img {
        max-width: 400px;
        width: 100%;
        min-width: 280px;
    }

    p {
        width: max-content;
        font-weight: 500;
    }
}
</style>