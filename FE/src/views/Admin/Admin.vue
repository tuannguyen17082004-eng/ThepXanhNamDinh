<script setup lang="ts">
    import { onMounted } from 'vue';
    import { isAdmin } from '@/middlewares/isAdmin';

    onMounted( async () => {
        await isAdmin();
    })
</script>

<template>
    <main class="container-fluid m-0" style="padding-top: 70px;">
        <section id="number_section" class="row w-100 p-0 m-0">
            <div class="row col-xl-6 p-0 m-0">
                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Bài viết</h4>|
                            <p>Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-newspaper"></i><span>123</span>
                        </div>
                    </div>
                </div>
                
                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Video</h4>|
                            <p>Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-newspaper"></i><span>123</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row col-xl-6 p-0 m-0">
                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Cầu thủ</h4>|
                            <p>Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-newspaper"></i><span>36</span>
                        </div>
                    </div>
                </div>

                <div id="number_card" class="col-sm-6 pt-3">
                    <div id="card_content" class="container-fluid p-3">
                        <div class="container-fluid p-0 d-flex align-items-center">
                            <h4>Người dùng</h4>|
                            <p>Chi tiết</p>
                        </div>
                        <div class="container-fluid p-0 mt-3 d-flex align-items-center">
                            <i class="bi bi-newspaper"></i><span>123</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
#number_section {
    
    #number_card {
        
        #card_content {
            min-width: 210px;
            height: 120px;
            background-color: white;
            font-family: 'Barlow', sans-serif;

            h4 {
                margin: 0 10px 0 0;
                font-size: 20px;
                font-weight: 700;
                height: max-content;
            }

            p {
                margin: 0 0 0 10px;
                color: #899bbd;
                font-size: 15px;
                font-weight: 500;
            }

            i {
                border-radius: 50%;
                padding: 10px 15px;
                font-size: 20px;
                color: rgb(0, 133, 205);
                background-color: #f6f6fe;
            }

            span {
                color: rgb(0, 133, 205);
                margin: 0 10px;
                font-size: 30px;
                font-weight: 700;
            }
        }
    }
}
</style>