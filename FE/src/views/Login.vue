<script setup lang="ts">
    import router from '@/router';
    import { ref } from 'vue';
    import { Login } from '@/utils/AuthUtils';

    const email = ref<HTMLElement | null>(null);
    const password = ref<HTMLElement | null>(null);

    const handleLogin = async () => {
        if (!email.value || !password.value) {
            alert("Vui lòng nhập đầy đủ thông tin");
        }
        else {
            const res = await Login(email.value, password.value);
        }
    }
    
</script>


<template>
    <main id="auth_background" class="container-fluid p-0 d-flex justify-content-start align-items-start">


        <!--Đăng nhập-->
        <div class="col-md-6 col-12 h-100 m-0 p-0 d-flex justify-content-center align-items-center">
            <form ref="login" id="login_form" class="container w-75 py-md-5 py-4" @submit.prevent="handleLogin">
                <div class="container-fluid py-3 d-flex justify-content-center align-items-center">
                    <img src="/pictures/logo.png">
                    <h2 class="px-3">Đăng nhập</h2>
                </div>
                <div class="container-fluid py-3">
                    <h5 class="pb-2">Email*</h5>
                    <input v-model="email" class="form-control" type="email" placeholder="Email...">
                </div>
                <div class="container-fluid py-3">
                    <h5 class="pb-2">Mật khẩu*</h5>
                    <input v-model="password" class="form-control" type="password" placeholder="Password...">
                </div>
                <div class="container-fluid p-0 d-flex justify-content-center">
                    <RouterLink to="/ForgetPassword" style="width: max-content;">
                        <p class="text-center">Quên mật khẩu?</p>
                    </RouterLink>
                </div>
                <div class="container-fluid p-0 d-flex justify-content-center align-items-center" style="gap: 20px;">
                    <button id="login_btn" class="btn btn-primary" type="submit">Đăng nhập</button>
                    <button id="register_btn" class="btn btn-primary" type="button" v-on:click="router.push('/Register')">Đăng ký</button>
                </div>
            </form>
        </div>
        

    </main>
</template>

<style scoped>
#auth_background {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(../pictures/SVĐ\ Thiên\ Trường.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    overflow: hidden;

    #login_form {
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

        h2 {
            font-size: clamp(25px, 4vw, 35px);
            color: rgb(0, 133, 205);
            font-weight: 700;
        }

        h5 {
            font-size: clamp(14px, 2vw, 18px);
            font-weight: 500;
        }

        #login_btn {
            width: 110px;
            background-color: rgb(0, 133, 205);
            font-weight: 500;
        }

        #register_btn {
            width: 110px;
            background-color: white;
            color: rgb(0, 133, 205);
            border: 2px solid rgb(0, 133, 205);
            font-weight: 500;
        }
    }

}
</style>