<script setup lang="ts">
    import router from '@/router';
    import { ref } from 'vue';
    import { Register } from '@/utils/AuthUtils';
    import { toast } from 'vue3-toastify';


    const name = ref();
    const gender = ref();
    const email = ref();
    const phone = ref();
    const password = ref();
    const confirmPassword = ref();

    const handleRegister = async () => {
        if (!name.value || !gender.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
            toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

        if (password.value !== confirmPassword.value) {
            toast.error("Mật khẩu không trùng khớp!", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }
        
        const res = await Register(name.value, gender.value, email.value, phone.value, password.value);
        if (res) {
            toast.success(res.data, {
                position: toast.POSITION.TOP_CENTER,
            })
            router.push('/Login');
        }
    }

</script>

<template>
    <main id="auth_background" class="container-fluid p-0 d-flex justify-content-start align-items-start">


        <!--Đăng ký-->
        <div class="col-md-6 col-12 h-100 m-0 p-0 d-flex justify-content-center align-items-center">
            <form ref="register" id="register_form" class="container w-75 py-md-5 py-4" @submit.prevent="handleRegister">
                <div class="container-fluid py-3 d-flex justify-content-center align-items-center">
                    <img src="/pictures/logo.png">
                    <h2 class="px-3">Đăng ký</h2>
                </div>
                <div id="register_content" class="container-fluid p-0">
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Email*</h5>
                        <input v-model="email" class="form-control" type="email" placeholder="Email...">
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Họ tên*</h5>
                        <input v-model="name" class="form-control" type="text" placeholder="Họ tên...">
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Giới tính*</h5>
                        <select v-model="gender" class="form-select">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                    </select>
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">SĐT*</h5>
                        <input v-model="phone" class="form-control" type="text" placeholder="SĐT...">
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Mật khẩu*</h5>
                        <input v-model="password" class="form-control" type="password" placeholder="Password...">
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Xác nhận mật khẩu*</h5>
                        <input v-model="confirmPassword" class="form-control" type="password" placeholder="Password...">
                    </div>
                </div>
                <div class="container-fluid pt-3 d-flex justify-content-center align-items-center" style="gap: 20px;">
                    <button id="submit_btn" class="btn btn-primary" type="submit">Submit</button>
                    <button id="login_btn" class="btn btn-primary" type="button" v-on:click="router.push('/Login')">Đăng nhập</button>
                </div>
            </form>
        </div>

    </main>
</template>

<style scoped>
#auth_background {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(/pictures/SVĐ\ Thiên\ Trường.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    overflow: hidden;

    #register_form {
        max-width: 500px;
        min-width: 280px;
        font-family: 'Barlow', sans-serif;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 20px;

        #register_content {
            height: 300px;
            overflow-y: auto;
        }

        img {
            width: 100%;
            max-width: 80px;
            min-width: 60px;
        }

        h2 {
            font-size: clamp(25px, 4vw, 35px);
            color: rgb(0, 133, 205);
            font-weight: 700;
        }

        h5 {
            font-size: clamp(14px, 2vw, 18px);
            font-weight: 500;
        }

        #submit_btn {
            width: 110px;
            background-color: rgb(0, 133, 205);
            font-weight: 500;
        }

        #login_btn {
            width: 110px;
            background-color: white;
            color: rgb(0, 133, 205);
            border: 2px solid rgb(0, 133, 205);
            font-weight: 500;
        }
    }
}
</style>