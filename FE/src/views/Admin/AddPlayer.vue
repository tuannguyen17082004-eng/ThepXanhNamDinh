<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { AddPlayer } from '@/utils/PlayerUtils';
import router from '@/router';

const firstname = ref(null);
const lastname = ref(null);
const number = ref(null);
const position = ref(null);
const height = ref(null);
const dateofbirth = ref(null);
const placeofbirth = ref(null);
const bio = ref(null);
const selfie_url = ref(null);
const selfie_file = ref();
const nationality_url = ref(null);
const nationality_file = ref();
const background_url = ref(null);
const background_file = ref();
let selfie_png = ref();
let nationality_png = ref();
let background_png = ref();

const handleSelfie = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        selfie_png.value = null;
        return;
    }

    selfie_file.value = file;
    selfie_png.value = URL.createObjectURL(file);
}

const handleNationality = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        nationality_png.value = null;
        return;
    }

    nationality_file.value = file;
    nationality_png.value = URL.createObjectURL(file);
}

const handleBackground = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        background_png.value = null;
        return;
    }

    background_file.value = file;
    background_png.value = URL.createObjectURL(file);
}

const handleAdd = async() => {
    if (!firstname.value || !lastname.value || !number.value || !position.value || !height.value || !dateofbirth.value || !placeofbirth.value || !bio.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if ((selfie_png.value && selfie_url.value) || (nationality_png.value && nationality_url.value) || (background_png.value && background_url.value)) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    const res = await AddPlayer(selfie_file.value, nationality_file.value, background_file.value, firstname.value + " " + lastname.value, firstname.value, lastname.value, number.value, nationality_url.value, dateofbirth.value, selfie_url.value, position.value, background_url.value, placeofbirth.value, height.value, bio.value);

    if (res) {
        toast.success("Thêm thành công!", {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push("/Admin/Players")
    }
    else {
        toast.error("Có lỗi xảy ra!", {
            position: toast.POSITION.TOP_CENTER,
        })
    }

}

</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px;">
        <div id="title" class="container-fluid p-3">
            <h5>Thêm cầu thủ</h5>
        </div>

        <form id="add_form" class="container-fluid p-3" @submit.prevent="handleAdd">
            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-sm-6 p-3">
                    <h3>Họ:</h3>
                    <input v-model="firstname" type="text" class="form-control" placeholder="firstname...">
                </div>

                <div class="col-sm-6 p-3">
                    <h3>Tên:</h3>
                    <input v-model="lastname" type="text" class="form-control" placeholder="lastname...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-4 p-3">
                    <h3 class="text-truncate">Số áo:</h3>
                    <input v-model="number" type="text" class="form-control" placeholder="number...">
                </div>

                <div class="col-md-4 p-3">
                    <h3 class="text-truncate">Vị trí:</h3>
                    <select v-model="position" class="form-select">
                        <option value="GK">Thủ môn</option>
                        <option value="DF">Hậu vệ</option>
                        <option value="MF">Tiền vệ</option>
                        <option value="ST">Tiền đạo</option>
                    </select>
                </div>

                <div class="col-md-4 p-3">
                    <h3 class="text-truncate">Chiều cao:</h3>
                    <input v-model="height" type="text" class="form-control" placeholder="height...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3 class="text-truncate">Ngày sinh:</h3>
                    <input v-model="dateofbirth" type="date" class="form-control">
                </div>

                <div class="col-md-6 p-3">
                    <h3 class="text-truncate">Nơi sinh:</h3>
                    <input v-model="placeofbirth" type="text" class="form-control" placeholder="place...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex">
                <h3>Thông tin:</h3>
                <textarea v-model="bio" class="form-control" placeholder="bio..."></textarea>
            </div>

            <div class="row w-100 m-0 p-3 d-flex">
                <div class="col-md-6 p-3">
                    <h3 class="w-100">Ảnh (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img :src="selfie_png" id="selfie_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleSelfie">
                    <input v-model="selfie_url" type="text" class="form-control" placeholder="Nhập URL...">
                </div>

                <div class="col-md-6 p-3">
                    <h3 class="w-100">Quốc tịch (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img :src="nationality_png" id="nationality_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleNationality">
                    <input v-model="nationality_url" type="text" class="form-control" placeholder="Nhập URL...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center">
                <div class="col-md-6 p-3">
                    <h3 class="w-100">Ảnh bìa (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img :src="background_png" id="background_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleBackground">
                    <input v-model="background_url" type="text" class="form-control" placeholder="Nhập URL...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="add_btn" type="submit" class="btn btn-lg">Thêm</button>
                <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
#title {
    h5 {
        font-family: 'Barlow', sans-serif;
        font-weight: 600;
        font-size: clamp(20px, 2vw, 25px);
        color: #012970;
    }
}

#add_form {
    background-color: white;
    border-radius: 10px;
    font-family: 'Barlow', sans-serif;

    h3 {
        width: max-content;
        margin-right: 10px;
        display: flex;
        align-items: center;
        font-size: clamp(15px, 3vw, 20px);
        font-weight: 500;
    }

    #add_btn {
        width: 100px;
        background-color: rgb(0, 133, 205);
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #reset_btn {
        width: 100px;
        background-color: red;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }
}
</style>