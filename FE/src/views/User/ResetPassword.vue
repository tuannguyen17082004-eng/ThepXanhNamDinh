<script setup lang="ts">
import router from '@/router';
import { ResetPassword, ForgetPassword } from '@/utils/AuthUtils';
import { useEmailStore } from '@/stores/emailStore';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const otp = ref();
const newPassword = ref();
const confirmPassword = ref();
const emailStore = useEmailStore();

const handleResetPassword = async() => {
    if (!newPassword.value || !confirmPassword.value) {
         toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
                position: toast.POSITION.TOP_CENTER,
            })
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        toast.error("Mật khẩu mới không trùng khớp!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if (!otp.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
                position: toast.POSITION.TOP_CENTER,    
            })   
        return;
    } 

    const res = await ResetPassword(emailStore.content, newPassword.value, otp.value);

    if (res) {
        toast.success("Đặt lại mật khẩu thành công!", {
            position: toast.POSITION.TOP_CENTER,
        })
        router.push("/Login");
    }

}

const resendOTP = async() => {
    const res = await ForgetPassword(emailStore.content);
    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

</script>

<template>
    <main id="fpe_background" class="container-fluid p-0 px-3 d-flex justify-content-center align-items-center">
        <form id="email_form" class="container-fluid pt-md-5 py-4" @submit.prevent="handleResetPassword">
            <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
                <img src="/pictures/logo.png">
            </div>

            <div class="container-fluid p-3">
                <h4>Tạo mật khẩu mới</h4>
                <p>Điền mật khẩu mới cho tài khoản của bạn</p>
            </div>

            <div id="fpe_content" class="container-fluid p-0">
                <div class="container-fluid pb-3">
                    <h5>Mật khẩu mới</h5>
                    <input v-model="newPassword" class="form-control" type="password" placeholder="Mật khẩu mới...">
                </div>

                <div class="container-fluid pb-3">
                    <h5>Xác nhận mật khẩu mới</h5>
                    <input v-model="confirmPassword" class="form-control" type="password" placeholder="Xác nhận mật khẩu mới...">
                </div>

                <div class="container-fluid pb-3">
                    <h5>Mã OTP</h5>
                    <input v-model="otp" class="form-control" type="text" placeholder="Nhập mã OTP...">
                    <p class="text-center text-primary pt-3 m-0" v-on:click="resendOTP" style="cursor: pointer;">Gửi lại mã xác nhận</p>
                </div>
            </div>

            <div class="container-fluid p-0 py-3 d-flex justify-content-center align-items-center" style="gap: 20px;">
                <button id="continue_btn" class="btn btn-primary" type="submit">Tiếp tục</button>
                <button id="back_btn" class="btn btn-primary" type="button" v-on:click="() => router.push('/Login')">Quay lại</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
#fpe_background {
    min-height: 100dvh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(/pictures/SVĐ\ Thiên\ Trường.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;

    #email_form {
        max-width: 500px;
        min-width: 280px;
        font-family: 'Barlow', sans-serif;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 20px;

        #fpe_content {
            height: 240px;
            overflow-y: auto;
        }

        img {
            width: 100%;
            max-width: 80px;
            min-width: 60px;
        }

        h4 {
            font-size: clamp(25px, 4vw, 30px);
            color: rgb(0, 133, 205);
            font-weight: 700;
        }

        p {
            font-weight: 500;
        }

        h5 {
            font-size: clamp(14px, 2vw, 18px);
            font-weight: 500;
        }

        #continue_btn {
            width: 110px;
            background-color: rgb(0, 133, 205);
            font-weight: 500;
        }

        #back_btn {
            width: 110px;
            background-color: goldenrod;
            border: none;
            font-weight: 500;
        }
    }
}
</style>