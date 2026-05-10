<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { UpdateNews, GetNewsById, DeleteNews } from '@/utils/NewUtils';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const title = ref(null);
const type = ref(null);
const author = ref(null);
const content = ref(null);
const news_url = ref(null);
const news_file = ref();
let news_png = ref();

const handleImg = (e : any) => {
    const file = e.target.files[0];
    if (!file) {
        news_png.value = null;
        return;
    }

    news_file.value = file;
    news_png.value = URL.createObjectURL(file);
}

const FetchNewsByID = async (id: any) => {
    const res = await GetNewsById(id);

    if (!res) {
        toast.error("Lấy dữ liệu thất bại!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    title.value = res.data.title;
    type.value = res.data.type;
    author.value = res.data.author;
    content.value = res.data.content;

    if (res.data.img.startsWith('https')) {
        news_url.value = res.data.img;
    }
    news_png.value = res.data.img;
}

const handleUpdate = async () => {
    if (!title.value || !type.value || !author.value || !content.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if (news_file.value && news_url.value) {
        toast.error("Chỉ được chọn 1 trong 2 phương thức tải ảnh!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    const res = await UpdateNews(id, news_file.value, news_url.value, title.value, type.value, author.value, content.value);
    if (res) {
        toast.success("Chỉnh sửa thành công!", {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push("/Admin/News")
    }
    else {
        toast.error("Có lỗi xảy ra!", {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

const handleDelete = async () => {
    Swal.fire({
        html: `Bạn chắc chắn muốn xóa cầu thủ này chứ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await DeleteNews(id);

            if (res) {
                toast.success("Xóa thành công!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push("/Admin/News");
            }
            else {
                toast.error("Có lỗi xảy ra!", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    });
}
onMounted( async() => {
    FetchNewsByID(id);
})
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px;">
        <div id="title" class="container-fluid p-3">
            <h5>Cập nhật tin tức</h5>
        </div>

        <form id="add_form" class="container-fluid p-3" @submit.prevent="handleUpdate">
            <div class="row w-100 m-0 p-3 d-flex">
                <h3>Tiêu đề:</h3>
                <input v-model="title" type="text" class="form-control" placeholder="Nhập tiêu đề...">
            </div>

            <div class="row w-100 m-0 p-3 d-flex">
                <h3>Nội dung:</h3>
                <textarea v-model="content" class="form-control" placeholder="Nhập tiêu đề..."></textarea>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-sm-6 p-3">
                    <h3>Thể loại:</h3>
                    <select v-model="type" class="form-select">
                        <option value="Highlights">Highlights</option>
                        <option value="CLB">CLB</option>
                        <option value="Fanclub">Fanclub</option>
                        <option value="Đào tạo">Đào tạo</option>
                        <option value="Thông tin trận đấu">Thông tin trận đấu</option>
                    </select>
                </div>

                <div class="col-sm-6 p-3">
                    <h3>Tác giả:</h3>
                    <input v-model="author" type="text" class="form-control" placeholder="Nhập tác giả...">
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex">
                <h3>Ảnh (chọn trên máy hoặc nhập link ảnh):</h3>
                <img :src="news_png" id="selfie_png" width="200" class="my-2"> 
                <input type="file" class="form-control mb-3" @change="handleImg">
                <input v-model="news_url" type="text" class="form-control" placeholder="Nhập URL...">
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="update_btn" type="submit" class="btn btn-lg">Sửa</button>
                <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
                <button id="del_btn" type="button" class="btn btn-lg" v-on:click="handleDelete">Xóa</button>
                <button id="back_btn" type="button" class="btn btn-lg" v-on:click="() => router.push('/Admin/News')">Quay lại</button>
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

    #back_btn {
        width: 100px;
        background-color: goldenrod;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }
}
</style>