<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { GetPlayerByID, UpdatePlayer, DeletePlayer } from '@/utils/PlayerUtils';
import Loading from '@/components/Loading.vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

let isLoading = ref(false);
const firstname = ref();
const lastname = ref();
const number = ref();
const position = ref();
const height = ref();
const dateofbirth = ref();
const placeofbirth = ref();
const bio = ref();
const selfie_url = ref();
const selfie_file = ref();
const nationality_url = ref();
const nationality_file = ref();
const background_url = ref();
const background_file = ref();
let selfie_png = ref();
let nationality_png = ref();
let background_png = ref();

const handleSelfie = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        selfie_png.value = null;
        selfie_file.value = null;
        return;
    }

    selfie_file.value = file;
    selfie_png.value = URL.createObjectURL(file);
}

const handleNationality = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        nationality_png.value = null;
        nationality_file.value = null;
        return;
    }

    nationality_file.value = file;
    nationality_png.value = URL.createObjectURL(file);
}

const handleBackground = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        background_png.value = null;
        background_file.value = null;
        return;
    }

    background_file.value = file;
    background_png.value = URL.createObjectURL(file);
}

const FetchPlayerByID = async (id: any) => {
    const res = await GetPlayerByID(id);

    if (res) {
        const [day, month, year] = res.data.birth.split('/');
        res.data.birth = `${year}-${month}-${day}`;

        firstname.value = res.data.firstname;
        lastname.value = res.data.lastname;
        number.value = res.data.number;
        position.value = res.data.position;
        height.value = res.data.bio.height;
        dateofbirth.value = res.data.birth;
        placeofbirth.value = res.data.bio.placeBirth;
        bio.value = res.data.bio.information;
        selfie_png.value = res.data.img.link;
        nationality_png.value = res.data.nationality.link;
        background_png.value = res.data.bio.background.link;
    }
}

const handleUpdate = async () => {
    isLoading.value = true;
    if (!firstname.value || !lastname.value || !number.value || !position.value || !height.value || !dateofbirth.value || !placeofbirth.value || !bio.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    if ((selfie_file.value && selfie_url.value) || (nationality_file.value && nationality_url.value) || (background_file.value && background_url.value)) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    const res = await UpdatePlayer(id, selfie_file.value, nationality_file.value, background_file.value, firstname.value + " " + lastname.value, firstname.value, lastname.value, number.value, nationality_url.value, dateofbirth.value, selfie_url.value, position.value, background_url.value, placeofbirth.value, height.value, bio.value);
    
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push("/Admin/Players");
        isLoading.value = false;
    }
}

const handleDelete = () => {
    Swal.fire({
        html: `Bạn chắc chắn muốn xóa cầu thủ này chứ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    }).then(async (result) => {
        isLoading.value = true;
        if (result.isConfirmed) {
            const res = await DeletePlayer(id);

            if (res) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push("/Admin/Players");
                isLoading.value = false;
            }
        }
    });
}

onMounted(async() => {
    await FetchPlayerByID(id);
})
</script>

<template>
    <Loading v-if="isLoading"/>
    <main class="container-fluid p-3" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_player" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Cập nhật thông tin cầu thủ</h5>
                <p class="m-0 pt-1">Nhập đầy đủ thông tin cần thiết</p>
            </div>

            <RouterLink to="/Admin/Players" class="container-fluid p-0" style="width: max-content;">
              <button id="back_btn" class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <form ref="addPlayer" id="add_form" class="container-fluid p-3 mt-4" @submit.prevent="handleUpdate">
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
                    <input v-model="selfie_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>

                <div class="col-md-6 p-3">
                    <h3 class="w-100">Quốc tịch (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img :src="nationality_png" id="nationality_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleNationality">
                    <input v-model="nationality_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center">
                <div class="col-md-6 p-3">
                    <h3 class="w-100">Ảnh bìa (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img :src="background_png" id="background_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleBackground">
                    <input v-model="background_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="add_btn" type="submit" class="btn btn-lg">Sửa</button>
                <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
                <button id="del_btn" type="button" class="btn btn-lg" v-on:click="handleDelete">Xóa</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
#title_player {
    font-family: 'Barlow', sans-serif;

    h5 {
        font-weight: 700;
        font-size: clamp(20px, 2vw, 25px);
        color: #012970;
    }

    p {
        font-weight: 500;
        color: #899bbd;
    }
}

#back_btn {
    width: 100px;
    color: #012970;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
}

#back_btn:hover {
    background-color: rgb(0, 133, 205);
    color: white;
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
        font-size: clamp(15px, 3vw, 18px);
        font-weight: 600;
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
        background-color: grey;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #del_btn {
        width: 100px;
        background-color: red;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }
}
</style>