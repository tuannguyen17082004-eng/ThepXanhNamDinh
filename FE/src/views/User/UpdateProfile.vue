<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { toast } from 'vue3-toastify';
    import { GetUserInformation, UpdateUser, DeleteUser } from '@/utils/UserUtils';
    import router from '@/router';
    import Swal from 'sweetalert2';

    const id = localStorage.getItem("bruh");
    const name = ref();
    const email = ref();
    const phone = ref();
    const gender = ref();
    const city = ref();
    const country = ref();
    let user_png = ref();
    const user_file = ref();

    const handleImg = (e : any) => {
        const file = e.target.files[0];
        if (!file) {
            user_png.value = null;
            user_file.value = null;
            return;
        }

        user_file.value = file;
        user_png.value = URL.createObjectURL(file);
    }

    const GetUserById = async() => {
        const res = await GetUserInformation(id);

        if (res) {
            name.value = res.data.name;
            email.value = res.data.email;
            phone.value = res.data.phone;
            gender.value = res.data.gender;
            city.value = res.data.city;
            country.value = res.data.country;
            user_png.value = res.data.avatar.link;
        }
    }

    const handleUpdate = async () => {
        if (!name.value || !email.value || !phone.value || !gender.value || !city.value || !country.value || !user_png.value) {
            toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

        const res = await UpdateUser(id, name.value, gender.value, email.value, phone.value, city.value, country.value, user_file.value);
        if (res) {
            toast.success(res.data, {
                position: toast.POSITION.TOP_CENTER,
            });
            router.push("/Profile");
        }
    }

    const handleDelete = async () => {
        Swal.fire({
            html: `Bạn chắc chắn muốn xóa tài khoản chứ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0085CD',
            cancelButtonColor: '#FF0000',
            confirmButtonText: "Chắc chắn rồi",
            cancelButtonText: "Chưa chắc lắm?"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await DeleteUser(id);

                if (res) {
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    router.push("/");
                }
            }
        });
    }

    onMounted(async () => {
        await GetUserById();
    });
</script>

<template>
    <main class="container-fluid p-0" style="background-color: rgb(242, 246, 253);">
        <section id="update_profile_bg" class="container-fluid m-0 p-0 d-flex justify-content-start align-items-end">
        </section>

        <section id="update_content_bg" class="container-fluid m-0 p-3">
            <form id="add_form" class="container-fluid p-3" @submit.prevent="handleUpdate">
                <div class="row w-100 m-0 p-3 d-flex justify-content-center align-items-center">
                    <img class="p-0" src="/pictures/logo.png" style="width: 100px; height: 100px;">
                </div>
                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Họ và tên:</h3>
                    <input v-model="name" type="text" class="form-control" placeholder="Nhập họ và tên...">
                </div>

                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Email:</h3>
                    <input v-model="email" type="email" class="form-control" placeholder="Nhập email...">
                </div>

                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Số điện thoại:</h3>
                    <input v-model="phone" type="tel" class="form-control" placeholder="Nhập số điện thoại...">
                </div>

                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Giới tính:</h3>
                    <select v-model="gender" class="form-select">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Thành phố:</h3>
                    <input v-model="city" type="text" class="form-control" placeholder="Nhập thành phố...">
                </div>

                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Quốc gia:</h3>
                    <input v-model="country" type="text" class="form-control" placeholder="Nhập quốc gia...">
                </div>

                <div class="row w-100 m-0 p-3 d-flex">
                    <h3>Ảnh (chọn trên máy hoặc nhập link ảnh):</h3>
                    <img v-if="user_png" :src="user_png" id="selfie_png" width="200" class="my-2"> 
                    <input type="file" class="form-control mb-3" @change="handleImg">
                </div>

                <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                    <button id="update_btn" type="submit" class="btn btn-lg">Sửa</button>
                    <button id="reset_btn" type="reset" class="btn btn-lg">Reset</button>
                    <button id="del_btn" type="button" class="btn btn-lg" v-on:click="handleDelete">Xóa</button>
                    <button id="back_btn" type="button" class="btn btn-lg" v-on:click="() => router.push('/Profile')">Quay lại</button>
                </div>
            </form>
        </section>
    </main>
</template>

<style scoped>
#update_profile_bg {
    position: relative;
    height: 600px;
    background-image: url(/pictures/Ảnh\ nền.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

#add_form {
    max-width: 1000px;
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

@media screen and (max-width: 720px) {
    #update_profile_bg {
        height: 400px;
    }
}
</style>