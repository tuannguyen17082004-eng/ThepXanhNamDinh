<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { GetAllMatch } from '@/utils/MatchUtils';
import { GetAllSeason } from '@/utils/SeasonUtils';
import { type Match } from '@/models/match';
import { type Season } from '@/models/season';
import { DataTable, InputIcon, IconField, InputText, Skeleton, Tag } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Search from '@primeicons/vue/search';

const match = ref<Match[]>([]);
const placeholders = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
const seasonList = ref<Season[]>([]);
const season = ref('2027');
let loading = ref(false);
const first = ref(0);
const rows = computed(() => (loading.value ? placeholders : match.value));
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const FetchMatch = () => {
    loading.value = true;

    setTimeout(async () => {
        const res = await GetAllMatch(season.value);

        if (res) {
            match.value = res.data;
            loading.value = false;
        }
    }, 1000);
}

const FetchSeason = async () => {

    const res = await GetAllSeason();

    if (!res) {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu!", {
            position: toast.POSITION.TOP_CENTER,
        })
        return;
    }

    seasonList.value = res.data;
}

onMounted(async () => {
    await FetchMatch();
    await FetchSeason();
});
</script>

<template>
    <main class="container-fluid m-0" style="height: 100dvh">
        <div class="container-fluid px-3 py-4 d-flex align-items-center"
            style="background-color: white; border-radius: 10px;">
            <div id="title_video" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý trận đấu</h5>
                <p class="m-0 pt-1">Quản lý thông tin trận đấu trên hệ thống</p>
            </div>

            <div class="container-fluid p-0 d-flex flex-column" style="width: max-content;">
                <RouterLink to="Match/Add" class="container-fluid p-0">
                    <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm</button>
                </RouterLink>
            </div>
        </div>

        <div id="season_choose" class="container-fluid p-3 mt-4 d-flex flex-column flex-sm-row align-items-center"
            style="justify-content: space-between;">
            <div class="container p-0 d-flex flex-column flex-sm-row">
                <p class="pe-3 m-0">Mùa giải</p>

                <select v-model="season" v-on:change="async() => await FetchMatch()">
                    <div v-for="season in seasonList" class="form-control p-0">
                        <option :value="season.season">{{ season.season - 1 }}-{{ season.season }}</option>
                    </div>
                </select>
            </div>

            <div class="container p-0 mt-3 mt-sm-0 d-flex justify-content-end">
                <IconField>
                    <InputIcon>
                        <Search />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" size="medium" placeholder="Tìm kiếm..." />
                </IconField>
            </div>
        </div>

        <div id="data_table" class="container-fluid p-3">
            <DataTable v-model:filters="filters" :value="rows" showGridlines paginator sort-mode="multiple" scrollable
                scroll-height="500px" removable-sort :rows="10" :first="first" filter-display="menu"
                :global-filter-fields="['league', 'stadium', 'hometeam', 'awayteam']"
                paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} trận"
                table-style="background-color: white;">
                <template #empty>
                    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không tìm thấy
                        tin tức nào</div>
                </template>

                <Column field="league" header="Giải đấu" style="min-width: 180px;" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <div v-else class="container-fluid p-0 d-flex justify-content-center align-items-center">
                            <img v-if="data.leaguelg" :src="data.leaguelg.link" class="me-3" alt="Logo giải đấu">
                            <p class="m-0">{{ data.league }}</p>
                        </div>
                    </template>
                </Column>

                <Column field="time" header="Ngày thi đấu" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center text-truncate">{{ data.VNtime }}</p>
                    </template>
                </Column>

                <Column field="stadium" header="Sân vận động" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-truncate">{{ data.stadium }}</p>
                    </template>
                </Column>

                <Column field="hometeam" header="Đội nhà" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-truncate">{{ data.hometeam }}</p>
                    </template>
                </Column>

                <Column field="awayteam" header="Đội khách" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-truncate">{{ data.awayteam }}</p>
                    </template>
                </Column>

                <Column header="Kết quả">
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <Tag v-else class="m-0 text-center text-truncate">{{ data.result }}</Tag>
                    </template>
                </Column>

                <Column>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <RouterLink v-else :to="`Match/${data._id}`" class="text-center m-0 text-truncate">Chi tiết</RouterLink>
                    </template>
                </Column>
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

#season_choose {
    background-color: white;
    border-radius: 10px 10px 0 0;
    font-family: 'Barlow', sans-serif;

    p {
        color: #012970;
        font-weight: 600;
    }

    select {
        border: none;
        color: black;
        border-bottom: #012970 3px solid;
        height: 30px;
        background-color: transparent;
    }
}

#season_management {
    font-family: 'Barlow', sans-serif;
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