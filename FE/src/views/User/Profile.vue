<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Logout } from '@/utils/AuthUtils';
import { GetUserInformation } from '@/utils/UserUtils';
import { type User } from '@/models/user';
import router from '@/router';

const u = ref<User>();

const GetUser = async () => {
    const id = localStorage.getItem("bruh");
    const res = await GetUserInformation(id);

    if (res)
        u.value = res?.data;
    else
        router.push("/Login");
}

onMounted(async () => {
    await GetUser();
})

</script>

<template>
    <main id="profile_background" class="row w-100 p-0 pt-5 pt-md-0 m-0 d-flex justify-content-start align-items-end">
        <img src="/pictures/Ảnh nền.jpg" class="p-0 w-100 d-none d-md-block" style="mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);">
        <section class="col-md-5 px-2">
            <div id="profile_menu" class="container-fluid my-2 px-4 d-flex flex-column" style="justify-content: space-evenly;">
                <div class="container-fluid p-0 py-4 d-flex">
                    <div class="container p-0 d-flex justify-content-center align-items-center" style="width: max-content;">
                        <img :src="u?.avatar" style="border-radius: 50%;">
                    </div>
                    <div class="container p-0 px-3 d-flex flex-column justify-content-center">
                        <h5>{{ u?.name }}</h5>
                        <p class="m-0">{{ u?.email }}</p>
                    </div>
                </div>

                <div class="container-fluid p-0 pb-1">
                    <ul class="p-0">
                        <li>Chỉnh sửa thông tin</li>
                        <li v-on:click="() => router.push('/ChangePassword')">Đổi mật khẩu</li>
                        <li v-on:click="async () => await Logout()">Đăng xuất</li>
                        <li v-if="u?.role == 'admin'">
                            <RouterLink to="/Admin" class="text-decoration-none" style="color: #012970;">Trang quản trị</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="col-md-7 px-2">
            <div id="profile_information" class="container-fluid my-2 px-4 d-flex flex-column justify-content-center align-items-center">
                <ul class="py-3 px-md-3 m-0 p-0 w-100" style="list-style: none;">
                    <li>
                        <h4>Họ và tên:</h4>
                        <p>{{ u?.name }}</p>
                    </li>
                    <li>
                        <h4>Tên người dùng:</h4>
                        <p>{{ u?.username }}</p>
                    </li>
                    <li>
                        <h4>Email:</h4>
                        <p>{{ u?.email }}</p>
                    </li>
                    <li>
                        <h4>SĐT:</h4>
                        <p>{{ u?.phone }}</p>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
#profile_background {
    background-color: rgb(0, 133, 205);
    border-bottom: 1px white solid;


    #profile_menu {
        min-width: 290px;
        height: 280px;
        border-radius: 20px;
        background-color: white;
        font-family: 'Barlow', sans-serif;

        img {
            aspect-ratio: 1 / 1;
            min-width: 60px;
            max-width: 60px;
        }

        ul {
            list-style: none;
        }

        ul li {
            height: 40px;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: clamp(15px, 2vw, 18px);
            color: #012970;
        }

        ul li:hover {
            transform: translateY(-3px);
            transition: 0.3s ease-in-out;
            cursor: pointer;
        }
    }

    #profile_information {
        background-color: white;
        height: 280px;
        border-radius: 20px;
        font-family: 'Barlow', sans-serif;

        ul li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;


            h4 {
                font-size: clamp(20px, 2vw, 23px);
                font-weight: 600;
                height: max-content;
                margin: 0;
                color: #012970;
            }

            p {
                font-size: clamp(15px, 2vw, 17px);
                font-weight: 400;
                height: max-content;
                margin: 0;
            }
        }
    }
}
</style>