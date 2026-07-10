<script setup lang="ts">
import { ref, onMounted} from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableCore from 'datatables.net-bs5';
import { toast } from 'vue3-toastify'
import { GetAllUser } from '@/utils/UserUtils';
import { type User } from '@/models/user';

DataTable.use(DataTableCore);
const users = ref<User[]>([]);

const columns = [
    {
        data: 'name',
        title: 'Họ và tên',
        className: 'col-md-3 col-6',
        render: (data : any) => `<p class="m-2 line-clamp-2">${data}</p>`
    },
    {
        data: 'isActived',
        title: 'Trạng thái',
        className: 'col-md-1 col-3 text-center',
        render: (data : any) => {
            if (data) 
                return `<i class="bi bi-check-lg" style="color: yellow;"></i>`;
            else
                return `<i class="bi bi-x" style="color: red;"></i>`;
        }
    },
    {
        data: 'gender',
        title: 'Giới tính',
        className: 'col-md-2 col-3 d-none d-md-table-cell text-center',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'email',
        title: 'Email',
        className: 'col-md-3 col-6 d-none d-md-table-cell text-center',
        render: (data : any) => `<p class="m-2 line-clamp-1">${data}</p>`
    },
    {
        data: 'phone',
        title: 'Số điện thoại',
        className: 'col-md-2 col-3 d-none d-md-table-cell text-center',
        render: (data : any) => `<p class="m-2 line-clamp-1">${data}</p>`
    },
    {
        data: null,
        orderable: false,
        className: 'col-md-2 col-3 text-center',
        render: (data : any, type : any, row : any) => {
            return `<a href="Users/${row._id}" data-id="${row._id}">Chi tiết</a>`
        }
    }
]

const GetUser = async() => {
    const res = await GetAllUser(null, null);

    if (!res) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

    users.value = res.data;
}

onMounted(() => {
    GetUser();
});
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_user" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý người dùng</h5>
                <p class="m-0 pt-1">Quản lý thông tin người dùng trên hệ thống</p>
            </div>

            <RouterLink to="Users/Add" class="container-fluid p-0" style="width: max-content;">
              <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm tài khoản admin</button>
            </RouterLink>
        </div>


        <div id="data_table" class="container-fluid p-3 mt-4">
            <DataTable class="table" :data="users" :columns="columns">
            </DataTable>
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

button {
  width: 200px;
  background-color: rgb(0, 133, 205);
  color: white;
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
}

button:hover {
  background-color: rgb(0, 133, 205);
  color: white;
}

#data_table {
    background-color: white;
    border-radius: 10px;
    font-family: 'Barlow', sans-serif;

    :deep(.dt-search) {
            display: flex;
            gap: 10px;
            font-weight: 600;
    }

    :deep(td) {
        align-content: center;
    }

    :deep(td p) {
        font-weight: 500;
    }

    :deep(i) {
        font-size: 20px;
        -webkit-text-stroke-width: 1px;
    }

    :deep(th) {
        font-size: 18px;
        text-align: center;
    }

    :deep(.line-clamp-2) {
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    :deep(.line-clamp-1) {
        overflow: hidden;
    }
}
</style>