<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { GetAllPlayers } from '@/utils/PlayerUtils';
import { type Player } from '@/models/player';
import { DataTable, InputIcon, IconField, InputText, Skeleton, Tag } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Search from '@primeicons/vue/search';

const players = ref<Player[]>([]);
const placeholders = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
let loading = ref(false);
const first = ref(0);
const rows = computed(() => (loading.value ? placeholders : players.value));
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


const GetPlayers = async () => {
  loading.value = true;

  setTimeout(async() => {
    const res = await GetAllPlayers(null);

    if (res) {
      players.value = res.data;
      loading.value = false;
    }
  }, 1000);     
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
            <IconField class="mb-3">
                <InputIcon>
                    <Search />
                </InputIcon>
                <InputText v-model="filters['global'].value" size="medium" placeholder="Tìm kiếm..." />
            </IconField>

            <DataTable v-model:filters="filters" :value="rows" showGridlines paginator sort-mode="multiple" scrollable
                scroll-height="500px" removable-sort :rows="10" :first="first" filter-display="menu"
                :global-filter-fields="['fullname', 'placeBirth', 'position', 'number', 'birth']"
                paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} cầu thủ"
                table-style="background-color: white;">
                <template #empty>
                    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không tìm thấy
                        cầu thủ nào</div>
                </template>

                <Column field="fullname" header="Họ tên" style="min-width: 180px;" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0">{{ data.fullname }}</p>
                    </template>
                </Column>

                <Column field="placeBirth" header="Nơi sinh" style="min-width: 200px;" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <div v-else class="container-fluid p-0 d-flex align-items-center">
                            <img v-if="data.nationality" :src="data.nationality.link" class="me-3" alt="Quốc tịch">
                            <p v-if="data.bio" class="m-0">{{ data.bio.placeBirth }}</p>
                        </div>
                    </template>
                </Column>

                <Column field="birth" header="Ngày sinh" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center">{{ data.birth }}</p>
                    </template>
                </Column>

                <Column field="number" header="Số áo" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center">{{ data.number }}</p>
                    </template>
                </Column>

                <Column field="position" header="Vị trí" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center">{{ data.position }}</p>
                    </template>
                </Column>

                <Column style="min-width: 100px;">
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <RouterLink v-else :to="`Players/${data._id}`" class="text-center m-0">Chi tiết</RouterLink>
                    </template>
                </Column>
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
    border-radius: 0 0 10px 10px;
    font-family: 'Barlow', sans-serif;
    overflow-x: scroll;
    scrollbar-width: none;

    img {
        height: 20px;
        aspect-ratio: 14 / 9;
    }
}
</style>