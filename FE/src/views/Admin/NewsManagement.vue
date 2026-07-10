<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableCore from 'datatables.net-bs5';
import { GetAllNews } from '@/utils/NewUtils';
import { type News } from '@/models/news';

DataTable.use(DataTableCore);

const news = ref<News[]>([]);

const columns = [
    {
        data: 'title',
        title: 'Tiêu đề',
        className: 'col-md-4 col-6',
        render: (data : any) => `<p class="m-2 line-clamp-2">${data}</p>`
    },
    {
        data: 'type',
        title: 'Thể loại',
        className: 'text-center col-3',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'time',
        title: 'Ngày đăng',
        className: 'text-center col-2 d-none d-sm-table-cell',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'author',
        title: 'Tác giả',
        className: 'text-center col-2 d-none d-sm-table-cell',
        render: (data : any) => `<p class="m-2 line-clamp-2">${data}</p>`
    },
    {
        data: null,
        orderable: false,
        className: 'col-md-2 col-3 text-center',
        render: (data : any, type : any, row : any) => {
            return `<a href='News/${row._id}' data-id="${row._id}">Chi tiết</button>`
        }
    }
]

const GetNews = async () => {
    const res = await GetAllNews(null, null, null, null, null, null);

    if (res) {
        news.value = res.data;
    }
}


onMounted(async () => {
    await GetNews();
})
</script>

<template>
    <main class="container-fluid p-3" style="margin-top: 70px;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_news" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý tin tức</h5>
                <p class="m-0 pt-1">Quản lý thông tin tin tức trên hệ thống</p>
            </div>

            <RouterLink to="News/Add" class="container-fluid p-0" style="width: max-content;">
              <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm</button>
            </RouterLink>
        </div>

        <div id="data_table" class="container-fluid p-3 mt-4">
            <DataTable class="table" :data="news" :columns="columns">
            </DataTable>
        </div>
    </main>
</template>

<style scoped>
#title_news {
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
  font-weight: 600;
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