<script setup lang="ts">
</script>

<template>
    <footer id="footer" class="container-fluid m-0">
        <section class="container-fluid" style="border-bottom: 1px solid white;">
            <div id="row_2" class="container-fluid p-0 py-md-4 d-flex justify-content-center align-items-center">
                <img src="/pictures/Jogabola.png" alt="logo Jogabola">
                <img src="/pictures/Động lực.png" alt="logo Động lực">
            </div>

            <div id="row_1" class="container-fluid p-0 py-md-4 pt-5 d-flex justify-content-center align-items-center">
                <img src="/pictures/Venesto.png" alt="logo Venesto">
                <img src="/pictures/Ocany.png" alt="logo Ocany">
                <img src="/pictures/Tập đoàn Xuân Thiện.png" alt="logo tập đoàn Xuân Thiện">
            </div>

            <div class="container-fluid px-0 d-flex justify-content-center align-items-center" style="padding-top: 50px;">
                <img src="/pictures/Tháp Phổ Minh.png" alt="logo Tháp Phổ Minh" style="height: 150px;">
            </div>
        </section>

        <section class="container-fluid p-0 py-4" style="border-bottom: 1px solid white;">
            <div class="row w-100 p-0 m-0 d-flex" style="justify-content:space-around">
                <div class="col-sm-2 p-0 py-2 d-flex justify-content-center align-items-center">
                    <img src="/pictures/logo.png" alt="logo" style="max-width: 100px; min-width: 80px; width: 100%;">
                </div>

                <div class="col-sm-6 p-0 py-2 d-flex flex-column justify-content-center align-items-center">
                    <h3>Theo dõi chúng tôi</h3>
                    <div id="social_media" class="container-fluid h-100 p-0 d-flex justify-content-center align-items-center">
                        <a href="https://www.facebook.com/ThepXanhNamDinhFC" class="bi bi-facebook text-white"></a>
                        <a href="https://www.instagram.com/officialthepxanhnamdinh" class="bi bi-instagram text-white"></a>
                        <a href="https://t.me/thepxanhnamdinh" class="bi bi-telegram text-white"></a>
                        <a href="https://www.tiktok.com/@thepxanhnamdinh" class="bi bi-tiktok text-white"></a>
                    </div>
                </div>

                <div class="col-md-4 py-md-2 pt-5 p-0">
                    <div id="contact" class="container-fluid p-0 d-flex flex-column">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <i class="bi bi-geo-alt-fill"></i>
                            <p class="m-0 px-3">Số 5 Đặng Xuân Thiều, phường Vị Hoàng, TP Nam Định, Nam Định</p>
                        </div>

                        <div class="container-fluid p-0 d-flex align-items-center">
                            <i class="bi bi-envelope-fill"></i>
                            <p class="m-0 px-3">clbbdnamdinh@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="container-fluid p-0">
            <div id="copyright" class="row m-0 p-0 py-2 w-100">
                <div class="col-6 p-0">
                    <p>© 2026 Thép Xanh Nam Định</p>
                </div>

                <div class="col-6 p-0 d-flex justify-content-end">
                    <p>Thiết kế bởi Nguyễn Đình Anh Tuấn</p>
                </div>
            </div>
        </section>
    </footer>
</template>

<style scoped>
    footer {
        background-color: rgb(0, 133, 205);
        font-family: 'Barlow', san-serif;
        padding-top: 40px;

        #row_1 {
            gap: 60px;
            flex-wrap: nowrap;

            img {
                max-width: 160px;
                min-width: 60px;
                width: 100%;
            }
        }

        #row_2 {
            gap: 60px;

            img {
                max-width: 70px;
                min-width: 40px;
                width: 100%;
            }
        }

        #social_media {
            gap: 20px;

            a {
                font-size: 28px;
            }
        }

        #contact {
            gap: 20px;

            i {
                font-size: 25px;
                color: white;
            }

            p {
                font-weight: 500;
                color: white;
            }
        }

        h3 {
            color: white;
            font-family: 'Barlow', sans-serif;
            font-size: clamp(18px, 3vw, 25px);
            font-weight: 500;
        }

        #copyright p {
            font-family: 'Barlow', sans-serif;
            font-size: 12px;
            font-weight: 300;
            color: white;
        }
    }
</style>