<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableCore from 'datatables.net-bs5';
import { toast } from 'vue3-toastify';
import { GetAllMatch } from '@/utils/MatchUtils';
import { type Match } from '@/models/match';

DataTable.use(DataTableCore);

const match = ref<Match[]>([]);

const columns = [
    {
        data: 'league',
        title: 'Giải đấu',
        className: 'col-2',
        render: (data : any) => `<p class="m-2 line-clamp-2">${data}</p>`,
    },
    {
        data: 'time',
        title: 'Ngày thi đấu',
        className: 'text-center col-2',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'stadium',
        title: 'Sân vận động',
        className: 'text-center col-2',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'hometeam',
        title: 'Đội nhà',
        className: 'text-center col-2',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'awayteam',
        title: 'Đội khách',
        className: 'text-center col-2',
        render: (data : any) => `<p class="m-2">${data}</p>`
    },
    {
        data: 'result',
        title: 'Kết quả',
        className: 'text-center col-1',
        render: (data : any) => {
            if (data)
                return `<p class="m-2">${data}</p>`
            else
                return `<p class="m-2"></p>`
        }
    },
    {
        data: null,
        orderable: false,
        className: 'col-1 text-center',
        render: (data : any, type : any, row : any) => {
            return `<a href='Match/${row._id}' data-id="${row._id}">Chi tiết</button>`
        }
    }
]

const FetchMatch = async() => {
    const res = await GetAllMatch();
    
    if (!res) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

    match.value = res.data;
}

onMounted(() => {
    FetchMatch();
});
</script>

<template>
    <main class="container-fluid m-0" style="padding-top: 85px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_video" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý trận đấu</h5>
                <p class="m-0 pt-1">Quản lý thông tin trận đấu trên hệ thống</p>
            </div>

            <RouterLink to="Match/Add" class="container-fluid p-0" style="width: max-content;">
              <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm</button>
            </RouterLink>
        </div>

        <div id="data_table" class="container-fluid p-3 mt-4">
            <DataTable class="table" :data="match" :columns="columns" style="width: 100%; min-width: 800px !important;">
            </DataTable>
        </div>
    </main>
</template>

<style scoped>
#title_video {
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
    overflow-x: scroll;

    :deep(.dt-search) {
            display: flex;
            gap: 10px;
            font-weight: 600;
    }
    
    :deep(td) {
        align-content: center;
        width: max-content;
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