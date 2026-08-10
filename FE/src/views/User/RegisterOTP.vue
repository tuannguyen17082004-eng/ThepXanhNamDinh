<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userRegisterStore';
import { toast } from 'vue3-toastify';
import { Register, VerifyUser } from '@/utils/AuthUtils';

const userStore = useUserStore();
const password = ref();
const confirmPassword = ref();
const otp = ref();

const handleRegister = async () => {
    if (!password.value || !confirmPassword.value || !otp.value) {
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

    const res = await Register(userStore.name, userStore.gender, userStore.email, userStore.phone, password.value, otp.value);

    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        userStore.clearUser();
        router.push('/Login');
    }
}

const resendOTP = async() => {
    const res = await VerifyUser(userStore.email);
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

</script>

<template>
    <main id="auth_background" class="container-fluid p-0 d-flex justify-content-start align-items-start">


        <!--Đăng ký-->
        <div class="col-md-6 col-12 h-100 m-0 p-0 d-flex justify-content-center align-items-center">
            <form ref="register" id="register_form" class="container w-75 py-md-5 py-4" @submit.prevent="handleRegister">
                <div class="container-fluid p-0">
                    <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
                        <img src="/pictures/logo.png">
                        <h2 class="px-3">Xác nhận</h2>
                    </div>
                    <p class="px-3 py-2">Chúng tôi đã gửi mã xác nhận đến email của bạn. Vui lòng nhập mã xác nhận và mật khẩu để hoàn tất quá trình đăng ký.</p>
                </div>
                <div id="register_content" class="container-fluid p-0">
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Mã xác nhận*</h5>
                        <input v-model="otp" class="form-control" type="number" placeholder="Mã xác nhận...">
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Mật khẩu*</h5>
                        <input v-model="password" class="form-control" type="password" placeholder="Password...">
                    </div>
                    <div class="container-fluid py-3">
                        <h5 class="pb-2">Xác nhận mật khẩu*</h5>
                        <input v-model="confirmPassword" class="form-control" type="password" placeholder="Password...">
                        <p class="text-center text-primary pt-3 m-0" v-on:click="resendOTP" style="cursor: pointer;">Gửi lại mã xác nhận</p>
                    </div>
                </div>
                <div class="container-fluid pt-3 d-flex justify-content-center align-items-center" style="gap: 20px;">
                    <button id="submit_btn" class="btn btn-primary" type="submit">Xác nhận</button>
                    <button id="login_btn" class="btn btn-primary" type="button" v-on:click="router.push('/Register')">Quay lại</button>
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