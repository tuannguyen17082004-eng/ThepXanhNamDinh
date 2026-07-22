<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableCore from 'datatables.net-bs5';
import { GetAllPlayers } from '@/utils/PlayerUtils';
import { type Player } from '@/models/player';
import { toast } from 'vue3-toastify';

DataTable.use(DataTableCore);

const players = ref<Player[]>([]);

const columns = [
  { 
    data: 'fullname',
    title: 'Họ và tên',
    className: 'col-md-3 col-6',
    render: (data : any) => `<p class="m-2">${data}</p>`
  },
  { 
    data: 'nationality.link', 
    title: 'Quốc tịch', 
    className: 'text-center col-2 h-100 d-none d-sm-table-cell',
    render: (data : any) => `<img src="${data}" class="m-1" style="height: 35px; width: 55px;"/>`
  },
  {
    data: 'birth',
    title: 'Ngày sinh',
    className: 'text-center col-3 d-none d-sm-table-cell',
    render: (data : any) => `<p class="m-2">${data}</p>`
  },
  {
    data: 'position',
    title: 'Vị trí',
    className: 'text-center col-2 col-md-1',
    render: (data : any) => `<p class="m-2">${data}</p>`
  },
  {
    data: 'number',
    title: 'Số áo',
    className: 'text-center col-2 col-md-1',
    render: (data : any) => `<p class="m-2">${data}</p>`
  },
  {
    data: null,
    orderable: false,
    className: 'col-2 text-center',
    render: (data : any, type : any, row : any) => {
      return `<a href="Players/${row._id}" class="m-2 p-0" data-id="${row._id}">Chi tiết</button>`
    }
  }
];

const GetPlayers = async () => {
    const res = await GetAllPlayers(null);
    if (!res) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }
      
    players.value = res.data;
}

onMounted( async() => {
    await GetPlayers();
})

</script>

<template>
    <main class="container-fluid m-0" style="padding-top: 85px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_player" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý cầu thủ</h5>
                <p class="m-0 pt-1">Quản lý thông tin cầu thủ trên hệ thống</p>
            </div>

            <RouterLink to="Players/Add" class="container-fluid p-0" style="width: max-content;">
              <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm</button>
            </RouterLink>
        </div>

        <div id="data_table" class="container-fluid p-3 mt-4">
            <DataTable class="table" :data="players" :columns="columns">
            </DataTable>
        </div>
    </main>
</template>

<style scoped>
#title_player {
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

    :deep(td) {
      align-content: center;
    }

    :deep(.dt-search) {
            display: flex;
            gap: 10px;
            font-weight: 600;
    }

    :deep(td p) {
        font-weight: 500;
    }

    :deep(th) {
        font-size: 18px;
    }
}
</style>