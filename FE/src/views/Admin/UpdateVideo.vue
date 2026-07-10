<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import router from '@/router';
import { useRoute } from 'vue-router';
import { UpdateVideo, DeleteVideo, GetVideoById } from '@/utils/VideoUtils';

const route = useRoute();
const id = route.params.id;

const title = ref();
const video_url = ref();
const video_file = ref();
const video_link = ref();
const video_file_2 = ref();
let video_preview = ref();
let video_png = ref();

const handleImg = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        video_png.value = null;
        video_file.value = null;
        return;
    }

    video_file.value = file;
    video_png.value = URL.createObjectURL(file);
}

const handleVideo = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        video_preview.value = null;
        video_file_2.value = null;
        return;
    }

    video_file_2.value = file;
    video_preview.value = URL.createObjectURL(file);
}

const FetchVideoById = async (id: any) => {
    const res = await GetVideoById(id);

    if (res) {
        title.value = res.data.title;
        video_preview.value = res.data.video.link;
        video_png.value = res.data.poster.link;
    }
}

const handleUpdate = async () => {
    if (!title.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if (video_file.value && video_url.value) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if (video_file_2.value && video_link.value) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải video!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    const res = await UpdateVideo(id, video_file_2.value, video_file.value, video_link.value, video_url.value, title.value);
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        });
        router.push("/Admin/Video");
    }
}

const handleDelete = async () => {
    Swal.fire({
        html: `Bạn chắc chắn muốn xóa video này chứ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await DeleteVideo(id);

            if (res) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push("/Admin/Video");
            }
        }
    });
}

onMounted( async () => {
    await FetchVideoById(id);
})
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_video" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Cập nhật video</h5>
                <p class="m-0 pt-1">Nhập đầy đủ thông tin cần thiết</p>
            </div>

            <RouterLink to="/Admin/Video" class="container-fluid p-0" style="width: max-content;">
              <button id="back_btn" class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <form id="add_form" class="container-fluid p-3 mt-4" @submit.prevent="handleUpdate">
            <div class="row w-100 m-0 p-3 d-flex">
                <h3 class="p-0">Tiêu đề:</h3>
                <input v-model="title" type="text" class="form-control" placeholder="Nhập tiêu đề...">
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3 class="w-100">Ảnh (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img v-if="video_png" :src="video_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleImg">
                    <input v-model="video_url" type="url" class="form-control" placeholder="Nhập URL...">
                </div>

                <div class="col-md-6 p-3">
                    <h3 class="w-100">Video (chọn trên máy hoặc nhập link video):</h3>
                    <video v-if="video_preview" :src="video_preview" width="200" class="my-2" control></video>
                    <input type="file" class="form-control mb-3" @change="handleVideo">
                    <input v-model="video_link" type="url" class="form-control" placeholder="Nhập URL...">
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
#title_video {
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