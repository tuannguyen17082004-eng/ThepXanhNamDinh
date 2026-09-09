<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { UpdateClub, GetClubDetail, DeleteClub } from '@/utils/ClubUtils';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const id = route.params.id;

const name = ref();
const shortname = ref();
const logo_url = ref();
const logo_file = ref();
let logo_png = ref();
let isLoading = ref(false);

const FetchData = async () => {
    const res = await GetClubDetail(id);

    if (res) {
        if (res.data.logo)
            logo_png.value = res.data.logo.link;
        name.value = res.data.name;
        shortname.value = res.data.shortname;
    }
}

const handleLogoImg = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
        logo_png.value = null;
        logo_file.value = null;
        return;
    }

    logo_file.value = file;
    logo_png.value = URL.createObjectURL(file);
}

const handleUpdateClub = async () => {
    isLoading.value = true;
    if (!name.value || !shortname.value || (!logo_file.value && !logo_url.value)) {
        toast.error("Vui lòng điền đầy đủ thông tin!", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    if (logo_file.value && logo_url.value) {
        toast.error("Vui lòng chỉ chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    const res = await UpdateClub(id, logo_file.value, name.value, shortname.value, logo_url.value);
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push('/Admin/Club');
    }
    isLoading.value = false;
}

const handleDelete = async () => {
    Swal.fire({
        html: `Bạn chắc chắn muốn xóa thông tin CLB này chứ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    }).then(async (result) => {
        isLoading.value = true;
        if (result.isConfirmed) {
            const res = await DeleteClub(id);

            if (res) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push("/Admin/Club");
                isLoading.value = false;
            }
        }
    });
}

onMounted(async () => {
    await FetchData();
});
</script>

<template>
    <Loading v-if="isLoading" />
    <main class="container-fluid p-3" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center"
            style="background-color: white; border-radius: 10px;">
            <div id="title_club" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Cập nhật câu lạc bộ</h5>
                <p class="m-0 pt-1">Nhập đầy đủ thông tin cần thiết</p>
            </div>

            <RouterLink to="/Admin/Club" class="container-fluid p-0" style="width: max-content;">
                <button class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <form id="add_form" class="container-fluid p-3 mt-4" @submit.prevent="handleUpdateClub">
            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Tên câu lạc bộ:</h3>
                    <input v-model="name" type="text" class="form-control" placeholder="Nhập tên câu lạc bộ...">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Tên viết tắt:</h3>
                    <input v-model="shortname" type="text" class="form-control" placeholder="Nhập tên viết tắt...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex justify-content-center">
                <div class="col-md-6 p-3">
                    <h3 class="w-100">Logo CLB (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img v-if="logo_png" :src="logo_png" width="200" class="my-2">
                    <input type="file" class="form-control mb-3" @change="handleLogoImg">
                    <input v-model="logo_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="update_btn" type="submit" class="btn btn-lg">Sửa</button>
                <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
                <button id="del_btn" type="button" class="btn btn-lg" v-on:click="handleDelete">Xóa</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
#title_club {
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

button {
    width: 100px;
    color: #012970;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
}

button:hover {
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

    #update_btn {
        width: 100px;
        background-color: rgb(0, 133, 205);
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #reset_btn {
        width: 100px;
        background-color: gray;
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