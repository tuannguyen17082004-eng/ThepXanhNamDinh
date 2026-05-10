<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableCore from 'datatables.net-bs5';
import { GetAllPlayers } from '@/utils/PlayerUtils';
import { type Player } from '@/models/player';
import router from '@/router';

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
    data: 'nationality', 
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
    players.value = res?.data;
}

onMounted( async() => {
    await GetPlayers();
})

</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px;">
        <div id="title" class="container-fluid p-0 mb-3">
            <h5>Quản lý cầu thủ</h5>
        </div>

        <RouterLink to="Players/Add" class="container-fluid p-0">
          <button class="btn btn-md m-0">Thêm</button>
        </RouterLink>

        <div id="data_table" class="container-fluid p-3 mt-3">
            <DataTable class="table" :data="players" :columns="columns">
            </DataTable>
        </div>
    </main>
</template>

<style scoped>
#title {
    h5 {
        font-family: 'Barlow', sans-serif;
        font-weight: 600;
        font-size: clamp(20px, 2vw, 25px);
        color: #012970;
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