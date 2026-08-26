<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';
import { GetAllSeason, GetSeasonByID, CreateSeason, DeleteSeason } from '@/utils/SeasonUtils';
import { type Season } from '@/models/season';
import { DataTable, InputIcon, IconField, InputText, Skeleton, Button } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Search from '@primeicons/vue/search';
import Loading from '@/components/Loading.vue';

const seasonList = ref<Season[]>([]);
const season = ref();
const placeholders = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
let loading = ref(false);
const first = ref(0);
const rows = computed(() => (loading.value ? placeholders : seasonList.value));
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
let isLoading = ref(false);

const FetchSeason = async () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllSeason();

        if (res) {
            seasonList.value = res.data;
            loading.value = false;
        }
    }, 1000);
}

const AddSeason = async (season : any) => {
    isLoading.value = true;
    const res = await CreateSeason(season);

    if (res) {
        toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
        })
        await FetchSeason();
        isLoading.value = false;
    }
}

const DelSeason = async (id: any) => {
    isLoading.value = true;
    const res = await GetSeasonByID(id);

    if (!res) {
        toast.error('Không tìm thấy thông tin mùa giải này!', {
            position: toast.POSITION.TOP_CENTER,
        })
        isLoading.value = false;
        return;
    }

    Swal.fire({
        html: `Bạn chắc chắn muốn xóa thông tin giải đấu này chứ? Giải đấu này đang bao gồm thông tin của ${res.data.matchList.length} trận đấu.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0085CD',
        cancelButtonColor: '#FF0000',
        confirmButtonText: "Chắc chắn rồi",
        cancelButtonText: "Chưa chắc lắm?"
    }).then(async (result) => {
        isLoading.value = true;
        if (result.isConfirmed) {
            const res = await DeleteSeason(id);

            if (res) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
                await FetchSeason();
                isLoading.value = false;
            }
        }
    });
}

onMounted(async() => {
    await FetchSeason();
})
</script>

<template>
    <Loading v-if="isLoading"/>
    <main class="container-fluid m-0" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center"
            style="background-color: white; border-radius: 10px;">
            <div id="title_season" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý mùa giải</h5>
                <p class="m-0 mt-1">Quản lý thông tin mùa giải trên hệ thống</p>
            </div>
        </div>

        <div id="season_add" class="container-fluid px-3 py-4 mt-4"
            style="background-color: white; border-radius: 10px;">
            <h5 class="m-0">Thêm mùa giải</h5>

            <div class="container-fluid mt-2 p-0 d-flex align-items-center justify-content-center">
                <input class="w-max form-control me-2" v-model="season" placeholder="Nhập mùa giải...">
                <button class="btn btn-md d-flex" v-on:click="AddSeason(season)"><span class="bi bi-plus-lg pe-1"></span>Thêm</button>
            </div>
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
                :global-filter-fields="['season', 'match', 'scoreboard']"
                paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} mùa giải"
                table-style="background-color: white;">
                <template #empty>
                    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không tìm thấy
                        mùa giải nào</div>
                </template>

                <Column field="season" header="Mùa giải" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center text-truncate" style="max-width: 40vw;">{{ data.season - 1 }}-{{ data.season }}</p>
                    </template>
                </Column>

                <Column field="match" header="Số trận" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center">{{ data.matchList.length }} trận</p>
                    </template>
                </Column>

                <Column field="scoreboard" header="Bảng xếp hạng" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <div v-else class="container-fluid p-0 d-flex justify-content-center">
                            <i v-if="data.scoreboard" class="bi bi-check-lg" style="color: yellow;"></i>
                            <i v-else class="bi bi-x" style="color: red;"></i>
                        </div>
                    </template>
                </Column>

                <Column>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <Button v-else v-on:click="DelSeason(data._id)">Xóa</Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </main>
</template>

<style scoped>
#title_season {
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

#season_add {
    font-family: 'Barlow', sans-serif;

    h5 {
        font-weight: 700;
        font-size: clamp(20px, 2vw, 25px);
        color: #012970;
    }
}

#data_table {
    background-color: white;
    border-radius: 0 0 10px 10px;
    font-family: 'Barlow', sans-serif;
    overflow-x: scroll;
    scrollbar-width: none;

    :deep(i) {
        font-size: 20px;
        -webkit-text-stroke-width: 1px;
    }
}
</style>