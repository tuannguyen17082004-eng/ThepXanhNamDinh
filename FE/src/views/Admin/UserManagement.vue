<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { toast } from 'vue3-toastify'
import { GetAllUser } from '@/utils/UserUtils';
import { type User } from '@/models/user';
import { DataTable, InputIcon, IconField, InputText, Skeleton, Tag } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Search from '@primeicons/vue/search';

const users = ref<User[]>([]);
const placeholders = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
let loading = ref(false);
const first = ref(0);
const rows = computed(() => (loading.value ? placeholders : users.value));
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const GetUser = async() => {
    loading.value = true;

    setTimeout(async() => {
        const res = await GetAllUser(null, null);

        if (res) {
            users.value = res.data;
            loading.value = false;
        }
    }, 1000);
}

onMounted(() => {
    GetUser();
});
</script>

<template>
    <main class="container-fluid m-0" style="padding-top: 70px; min-height: 100dvh;">
        <div class="container-fluid px-3 py-4 mt-3 d-flex align-items-center" style="background-color: white; border-radius: 10px;">
            <div id="title_user" class="container-fluid p-0 pe-5 m-0">
                <h5 class="m-0">Quản lý người dùng</h5>
                <p class="m-0 pt-1">Quản lý thông tin người dùng trên hệ thống</p>
            </div>

            <RouterLink to="Users/Add" class="container-fluid p-0" style="width: max-content;">
              <button class="btn btn-md m-0"><span class="bi bi-plus-lg pe-1"></span>Thêm tài khoản admin</button>
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
                :global-filter-fields="['season', 'match', 'scoreboard', 'phone', 'isActived']"
                paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} người dùng"
                table-style="background-color: white;">
                <template #empty>
                    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">Không tìm thấy
                        người dùng nào</div>
                </template>

                <Column field="name" header="Họ tên" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <div v-else class="container-fluid p-0 d-flex align-items-center">
                            <p class="m-0 text-truncate">{{ data.name }}</p>
                        </div>
                    </template>
                </Column>

                <Column field="username" header="Tên người dùng" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0 text-center text-truncate">{{ data.username }}</p>
                    </template>
                </Column>

                <Column field="email" header="Email" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0">{{ data.email }}</p>
                    </template>
                </Column>

                <Column field="phone" header="Số điện thoại" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <p v-else class="m-0">{{ data.phone }}</p>
                    </template>
                </Column>

                <Column field="isActived" header="Trạng thái" sortable>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <div v-else class="container-fluid p-0 d-flex justify-content-center">
                            <i v-if="data.isActived" class="bi bi-check-lg" style="color: yellow;"></i>
                            <i v-else class="bi bi-x" style="color: red;"></i>
                        </div>
                    </template>
                </Column>

                <Column>
                    <template #body="{ data }">
                        <Skeleton v-if="loading" height="30px" border-radius="15px"></Skeleton>
                        <RouterLink v-else :to="`Users/${data._id}`" class="text-center text-truncate m-0">Chi tiết</RouterLink>
                    </template>
                </Column>
            </DataTable>
        </div>
    </main>
</template>

<style scoped>
#title_user {
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
  width: 200px;
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
    scrollbar-width: none;

    :deep(i) {
        font-size: 20px;
        -webkit-text-stroke-width: 1px;
    }
}
</style>