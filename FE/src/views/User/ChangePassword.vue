<script setup lang="ts">
    import router from '@/router';
    import { ref } from 'vue';
    import { ChangePassword } from '@/utils/AuthUtils';

    const currentPassword = ref<HTMLElement | null>(null);
    const newPassword = ref<HTMLElement | null>(null);
    const confirmPassword = ref<HTMLElement | null>(null);

    const handleChangePassword = async () => {
        if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            alert('Mật khẩu mới và xác nhận mật khẩu mới không khớp.');
            return;
        }

        const res = await ChangePassword(currentPassword.value, newPassword.value);
        alert(res?.data);
    }

</script>

<template>
    <main id="main_background" class="container-fluid p-0 d-flex justify-content-center align-items-center">
        <form ref="changePassword" id="change_password_form" class="container-fluid py-md-5 py-4" @submit.prevent="handleChangePassword">
            <div class="container-fluid p-0 py-2 d-flex flex-column justify-content-center align-items-center">
                <h3>Thay đổi mật khẩu</h3>
                <p class="px-3">Chúng tôi đặc biệt khuyến nghị sử dụng trình quản lý mật khẩu để tạo một mật khẩu duy nhất dùng một lần.</p>
            </div>

            <div class="container-fluid py-2">
                <h5 class="pb-1">Mật khẩu hiện tại</h5>
                <input v-model="currentPassword" class="form-control" type="password" placeholder="Mật khẩu hiện tại...">
            </div>

            <div class="container-fluid py-2">
                <h5 class="pb-1">Mật khẩu mới</h5>
                <input v-model="newPassword" class="form-control" type="password" placeholder="Mật khẩu mới...">
            </div>

            <div class="container-fluid py-2">
                <h5 class="pb-1">Xác nhận mật khẩu mới</h5>
                <input v-model="confirmPassword" class="form-control" type="password" placeholder="Xác nhận mật khẩu mới...">
            </div>

            <div class="container-fluid pt-3 d-flex justify-content-center align-items-center" style="gap: 20px;">
                    <button id="submit_btn" class="btn btn-primary" type="submit">Thay đổi</button>
                    <button id="back_btn" class="btn btn-primary" type="button" v-on:click="router.push('/Profile')">Quay lại</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
#main_background {
    height: 100dvh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../pictures/SVĐ\ Thiên\ Trường.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    #change_password_form {
        max-width: 500px;
        min-width: 280px;
        font-family: 'Barlow', sans-serif;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 20px;

        h3 {
            font-weight: 700;
            font-size: 30px;
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

        #back_btn {
            width: 110px;
            background-color: white;
            color: rgb(0, 133, 205);
            border: 2px solid rgb(0, 133, 205);
            font-weight: 500;
        }
    }
}
</style>