<script setup lang="ts">
import { ref, onMounted, onUnmounted, render } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableCore from 'datatables.net-bs5';
import router from '@/router';
import { GetAllVideos } from '@/utils/VideoUtils';
import { type Video } from '@/models/video';

DataTable.use(DataTableCore);

const video = ref<Video[]>([]);

const columns = [
    {
        data: 'title',
        title: 'Tiêu đề',
        className: 'col-6',
        render: (data : any) => `<p class="m-2 line-clamp-2">${data}</p>`
    },
    {
        data: 'time',
        title: 'Ngày đăng',
        className: 'text-center col-4',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: null,
        orderable: false,
        className: 'col-2 text-center',
        render: (data : any, type : any, row : any) => {
            return `<a href='Video/${row._id}' data-id="${row._id}">Chi tiết</button>`
        }
    }
]

const GetVideo = async() => {
    const res = await GetAllVideos(null, null, null, null);
    video.value = res?.data;
}

onMounted(async() => {
    await GetVideo();
})
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px;">
        <div id="title" class="container-fluid p-0 mb-3">
            <h5>Quản lý video</h5>
        </div>

        <RouterLink to="Players/Add" class="container-fluid p-0">
          <button class="btn btn-md m-0">Thêm</button>
        </RouterLink>

        <div id="data_table" class="container-fluid p-3 mt-3">
            <DataTable class="table" :data="video" :columns="columns">
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
        text-align: center;
    }

    :deep(.line-clamp-2) {
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>