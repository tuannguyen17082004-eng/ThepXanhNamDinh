<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { GetAllNews } from '@/utils/NewUtils';
import { type News } from '@/models/news';
import { DataTable, InputIcon, IconField, InputText, Skeleton, Tag } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Search from '@primeicons/vue/search';


const news = ref<News[]>([]);
const placeholders = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
let loading = ref(false);
const first = ref(0);
const rows = computed(() => (loading.value ? placeholders : news.value));
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const GetNews = async () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllNews(null, null, null, null, null, null);
        if (res) {
            news.value = res.data;
            loading.value = false;
        }
    }, 1000);
}


onMounted(async () => {
    await GetNews();
})
</script>

<template>
    <main class="container-fluid m-0" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center"
            style="background-color: white; border-radius: 10px;">
            <div id="title_news" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý tin tức</h5>
                <p class="m-0 pt-1">Quản lý thông tin tin tức trên hệ thống</p>
            </div>

            <RouterLink to="News/Add" class="container-fluid p-0" style="width: max-content;">
                <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm</button>
            </RouterLink>
        </div>

        <div id="data_table" class="container-fluid p-3 mt-4">
            <IconField class="mb-3">
                <InputIcon>
                    <Search />
                </InputIcon>
                <InputText v-model="filters['global'].value" size="medium" placeholder="Tìm kiếm..." />
            </IconField>

            <DataTable v-model:filters="filters" :value="rows" showGridlines paginator sort-mode="multiple" scrollable
                scroll-height="500px" removable-sort :rows="10" :first="first" filter-display="menu"
                :global-filter-fields="['title', 'author', 'type', 'content']"
                paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} tin tức"
                table-style="background-color: white;">
                <template #empty>
                    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không tìm thấy
                        tin tức nào</div>
                </template>

                <Column field="title" header="Tiêu đề" style="min-width: 280px;" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <div v-else class="container-fluid p-0 d-flex align-items-center">
                            <img v-if="data.img" :src="data.img.link" class="me-3" alt="Logo giải đấu">
                            <p class="m-0">{{ data.title }}</p>
                        </div>
                    </template>
                </Column>

                <Column field="type" header="Thể loại" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center text-truncate">{{ data.type }}</p>
                    </template>
                </Column>

                <Column field="author" header="Tác giả" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-truncate">{{ data.author }}</p>
                    </template>
                </Column>

                <Column field="time" header="Ngày đăng" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-truncate">{{ data.time }}</p>
                    </template>
                </Column>

                <Column>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <RouterLink v-else :to="`News/${data._id}`" class="text-center m-0 text-truncate">Chi tiết</RouterLink>
                    </template>
                </Column>
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
    border-radius: 0 0 10px 10px;
    font-family: 'Barlow', sans-serif;
    overflow-x: scroll;
    scrollbar-width: none;

    img {
        height: 40px;
        aspect-ratio: 16 / 9;
    }
}
</style>