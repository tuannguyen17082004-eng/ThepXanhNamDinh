<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { GetUserInformation, DisableUser, DeleteUser } from '@/utils/UserUtils';
import { type User } from '@/models/user';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const user = ref<User>();

const FetchUserByID = async (id: any) => {
    const res = await GetUserInformation(id);

    if (res) {
        user.value = res.data;
    }
}

const handleDisable = async () => {
    if (!user.value) {
        toast.error("Không tìm thấy tài khoản!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    if (user.value.isActived) {
        Swal.fire({
            title: "Bạn chắc chắn muôn vô hiệu hóa tài khoản này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0085CD',
            cancelButtonColor: '#FF0000',
            confirmButtonText: "Chắc chắn rồi",
            cancelButtonText: "Chưa chắc lắm?"
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                const res = await DisableUser(id);

                if (res) {
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    router.push('/Admin/Users')
                }
            }
        })

    } else {
        Swal.fire({
            title: "Bạn chắc chắn muôn bỏ vô hiệu hóa tài khoản này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0085CD',
            cancelButtonColor: '#FF0000',
            confirmButtonText: "Chắc chắn rồi",
            cancelButtonText: "Chưa chắc lắm?"
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                const res = await DisableUser(id);

                if (res) {
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    router.push('/Admin/Users')
                }
            }
        })
    }
}

const handleDelete = async () => {
    Swal.fire({
        title: "Bạn chắc chắn muôn xóa tài khoản này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    })
    .then(async(result) => {
        if (result.isConfirmed) {
            const res = await DeleteUser(id);

            if (res) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_CENTER,
                })
                router.push('/Admin');
            }
        }
    })
}

onMounted(() => {
    FetchUserByID(id);
})
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_user" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Thông tin người dùng</h5>
                <p class="m-0 pt-1">Hiển thị thông tin chi tiết người dùng</p>
            </div>

            <RouterLink to="/Admin/Users" class="container-fluid p-0" style="width: max-content;">
              <button id="back_btn" class="btn btn-md m-0"><span class="bi bi-arrow-left pe-1"></span>Quay lại</button>
            </RouterLink>
        </div>

        <div v-if="user" class="container-fluid p-3 mt-4" id="user_info">
            <div class="container-fluid p-0 py-4 d-flex">
                <div class="container p-0 d-flex justify-content-center align-items-center" style="height: 60px; width: 60px; min-height:60px; min-width: 60px;">
                    <img :src="user.avatar.link" class="h-100 w-100 object-fit-cover" style="border-radius: 50%;">
                </div>
                <div class="container p-0 mx-3 d-flex flex-column justify-content-center" style="min-width: 0;">
                    <h5>{{ user.name }}</h5>
                    <p class="m-0">{{ user.email }}</p>
                </div>
            </div>

            <div class="container-fluid p-0">
                <ul class="py-3 px-md-3 m-0 p-0 w-100" style="list-style: none;">
                    <li>
                        <h4>Giới tính:</h4>
                        <p>{{ user.gender }}</p>
                    </li>
                    <li>
                        <h4>Thành phố:</h4>
                        <p>{{ user.city }}</p>
                    </li>
                    <li>
                        <h4>Quốc gia:</h4>
                        <p>{{ user.country }}</p>
                    </li>
                    <li>
                        <h4>Email:</h4>
                        <p>{{ user.email }}</p>
                    </li>
                    <li>
                        <h4>SĐT:</h4>
                        <p>{{ user.phone }}</p>
                    </li>
                </ul>
            </div>

            <div class="row w-100 m-0 p-3 d-flex justify-content-center" style="gap: 20px;">
                <button id="disable_btn" type="button" v-on:click="handleDisable" class="btn btn-lg">Vô hiệu hóa</button>
                <button id="delete_btn" type="button" v-on:click="handleDelete" class="btn btn-lg">Xóa</button>
            </div>
        </div>
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

#back_btn {
    width: 100px;
    color: #012970;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
}

#back_btn:hover {
    background-color: rgb(0, 133, 205);
    color: white;
}

#user_info {
    background-color: white;
    font-family: 'Barlow', sans-serif;

    h5 {
        font-size: clamp(18px, 2vw, 22px);
        font-weight: 600;
        margin: 0;
    }

    p {
        font-size: clamp(15px, 2vw, 17px);
        font-weight: 400;
        height: max-content;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

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

    #disable_btn {
        width: 150px;
        background-color: rgb(0, 133, 205);
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }

    #delete_btn {
        width: 150px;
        background-color: red;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: large;
        font-weight: 500;
    }
}
</style>