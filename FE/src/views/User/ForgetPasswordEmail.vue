<script setup lang="ts">
import router from '@/router';
import { ForgetPassword } from '@/utils/AuthUtils';
import { useEmailStore } from '@/stores/emailStore';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const email = ref();
const emailStore = useEmailStore();

const handleForgetPassword = async() => {
    if (!email.value) {
        toast.error("Hãy nhập đầy đủ thông tin cần thiết", {
                position: toast.POSITION.TOP_CENTER,    
            })   
        return;
    } 

    const res = await ForgetPassword(email.value);
    if (res) {
        emailStore.setEmail(email.value);
        router.push("/ResetPassword");

        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

</script>

<template>
    <main id="fpe_background" class="container-fluid p-0 px-3 d-flex justify-content-center align-items-center">
        <form id="email_form" class="container-fluid pt-md-5 py-4" @submit.prevent="handleForgetPassword">
            <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
                <img src="/pictures/logo.png">
            </div>

            <div class="container-fluid p-3">
                <h4>Quên mật khẩu?</h4>
                <p>Điền email gắn với tài khoản của bạn để nhận đường dẫn đặt lại mật khẩu</p>
            </div>

            <div class="container-fluid pb-3">
                <h5>Email</h5>
                <input v-model="email" class="form-control" type="email" placeholder="Email...">
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