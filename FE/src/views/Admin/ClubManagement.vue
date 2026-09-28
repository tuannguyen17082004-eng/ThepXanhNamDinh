<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { GetAllClub } from '@/utils/ClubUtils';
import { GetAllTourament } from '@/utils/TouramentUtils';
import { type Club } from '@/models/club';
import { type Tourament } from '@/models/tourament';
import { DataTable, InputIcon, IconField, InputText, Skeleton } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Search from '@primeicons/vue/search';

const clubList = ref<Club[]>([]);
const touramentList = ref<Tourament[]>([]);
const placeholders = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
let loading = ref(false);
const first = ref(0);
const rows = computed(() => (loading.value ? placeholders : clubList.value));
const touramentrows = computed(() => (loading.value ? placeholders : touramentList.value));
const filtersClub = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const filtersTourament = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const FetchClub = () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllClub();

        if (res) {
            clubList.value = res.data;
            loading.value = false;
        }
    }, 1000);
}

const FetchTourament = () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllTourament();

        if (res) {
            touramentList.value = res.data;
            loading.value = false;
        }
    }, 1000);
}

onMounted(async () => {
    await FetchClub();
    await FetchTourament();
});
</script>

<template>
    <main class="container-fluid m-0" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center"
            style="background-color: white; border-radius: 10px;">
            <div id="title_club" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý dữ liệu CLB</h5>
                <p class="m-0 pt-1">Quản lý thông tin các CLB trên hệ thống</p>
            </div>

            <div class="container-fluid p-0 d-flex flex-column" style="width: max-content;">
                <RouterLink to="Club/Add" class="container-fluid p-0 mb-2">
                    <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm CLB</button>
                </RouterLink>

                <RouterLink to="Tourament/Add" class="container-fluid p-0 mt-2">
                    <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm giải đấu</button>
                </RouterLink>
            </div>
        </div>

        <section class="row w-100 m-0 p-0">
            <div class="col-xxl-6 p-0 pe-xxl-2">
                <div id="data_table" class="container-fluid p-3 mt-4">
                    <div class="container-fluid p-0 d-flex align-items-center" style="justify-content: space-between;">
                        <h3 class="m-0">Dữ liệu CLB</h3>

                        <IconField class="mb-3">
                            <InputIcon>
                                <Search />
                            </InputIcon>
                            <InputText v-model="filtersClub['global'].value" size="medium" placeholder="Tìm kiếm..." />
                        </IconField>
                    </div>

                    <DataTable v-model:filters="filtersClub" :value="rows" showGridlines paginator sort-mode="multiple"
                        scrollable scroll-height="500px" removable-sort :rows="10" :first="first" filter-display="menu"
                        :global-filter-fields="['name', 'shortname']"
                        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                        :rowsPerPageOptions="[10, 25, 50]"
                        currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} CLB"
                        table-style="background-color: white;">
                        <template #empty>
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không
                                tìm thấy
                                CLB nào</div>
                        </template>

                        <Column field="name" header="Tên CLB" style="min-width: 280px;" sortable>
                            <template #body="{ data }">
                                <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                                <div v-else class="container-fluid p-0 d-flex align-items-center">
                                    <img v-if="data.logo" :src="data.logo.link" class="me-3" alt="Logo CLB">
                                    <p class="m-0">{{ data.name }}</p>
                                </div>
                            </template>
                        </Column>

                        <Column field="shortname" header="Tên viết tắt" sortable>
                            <template #body="{ data }">
                                <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                                <p v-else class="m-0 text-center text-truncate">{{ data.shortname }}</p>
                            </template>
                        </Column>

                        <Column>
                            <template #body="{ data }">
                                <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                                <RouterLink v-else :to="`Club/${data._id}`" class="text-center m-0 text-truncate">Chi
                                    tiết
                                </RouterLink>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <div class="col-xxl-6 p-0 ps-xxl-2">
                <div id="data_table" class="container-fluid p-3 mt-4">
                    <div class="container-fluid p-0 d-flex align-items-center" style="justify-content: space-between;">
                        <h3 class="m-0">Dữ liệu giải đấu</h3>

                        <IconField class="mb-3">
                            <InputIcon>
                                <Search />
                            </InputIcon>
                            <InputText v-model="filtersTourament['global'].value" size="medium"
                                placeholder="Tìm kiếm..." />
                        </IconField>
                    </div>

                    <DataTable v-model:filters="filtersTourament" :value="touramentrows" showGridlines paginator
                        sort-mode="multiple" scrollable scroll-height="500px" removable-sort :rows="10" :first="first"
                        filter-display="menu" :global-filter-fields="['name']"
                        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                        :rowsPerPageOptions="[10, 25, 50]"
                        currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} giải đấu"
                        table-style="background-color: white;">
                        <template #empty>
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không
                                tìm thấy giải đấu nào</div>
                        </template>

                        <Column field="name" header="Tên giải đấu" style="min-width: 280px;" sortable>
                            <template #body="{ data }">
                                <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                                <div v-else class="container-fluid p-0 d-flex align-items-center">
                                    <img v-if="data.logo" :src="data.logo.link" class="me-3" alt="Logo CLB">
                                    <p class="m-0">{{ data.name }}</p>
                                </div>
                            </template>
                        </Column>

                        <Column>
                            <template #body="{ data }">
                                <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                                <div v-else class="container-fluid p-0 d-flex justify-content-center">
                                    <RouterLink :to="`Tourament/${data._id}`" class="text-center m-0 text-truncate">Chi
                                        tiết
                                    </RouterLink>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
#title_club {
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

h3 {
    font-family: 'Barlow', sans-serif;
    color: #012970;
    font-weight: 700;
    font-size: clamp(15px, 2vw, 20px);
}

button {
    width: 150px;
    background-color: rgb(0, 133, 205);
    color: white;
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
}


#data_table {
    background-color: white;
    border-radius: 0 0 10px 10px;
    font-family: 'Barlow', sans-serif;
    overflow-x: scroll;
    scrollbar-width: none;

    img {
        height: 40px;
    }
}
</style>