<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { CreateAdmin } from '@/utils/AuthUtils';
import Loading from '@/components/Loading.vue';
import router from '@/router';

const name = ref()
const email = ref()
const password = ref()
const gender = ref()
const phone = ref()
let isLoading = ref(false);

const handleSubmit = async () => {
    isLoading.value = true;
    if (!name.value || !email.value || !password.value || !gender.value || !phone.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    const res = await CreateAdmin(name.value, gender.value, email.value, phone.value, password.value);
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        router.push('/Admin');
    }
}
</script>

<template>
    <Loading v-if="isLoading"/>
    <main class="container-fluid p-3" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_user" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Thêm tài khoản quản lý</h5>
                <p class="m-0 pt-1">Nhập đầy đủ thông tin cần thiết</p>
            </div>

            <RouterLink to="/Admin/Users" class="container-fluid p-0" style="width: max-content;">
              <button class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <form id="add_form" class="container-fluid p-3 mt-4" @submit.prevent="handleSubmit">
            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3 class="text-truncate">Tên:</h3>
                    <input v-model="name" type="text" class="form-control" placeholder="Nhập tên...">
                </div>

                <div class="col-md-6 p-3">
                    <h3 class="text-truncate">Email:</h3>
                    <input v-model="email" type="text" class="form-control" placeholder="Nhập email...">
                </div>
            </div>

            <div class="row w-100 m-0 p-0 d-flex">
                <div class="col-md-6 p-3">
                    <h3>Số điện thoại:</h3>
                    <input v-model="phone" type="text" class="form-control" placeholder="Nhập số điện thoại...">
                </div>

                <div class="col-md-6 p-3">
                    <h3>Giới tính:</h3>
                    <select v-model="gender" class="form-control">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center">
                <div class="col-6 p-3">
                    <h3>Mật khẩu:</h3>
                    <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu...">
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
#title_user {
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