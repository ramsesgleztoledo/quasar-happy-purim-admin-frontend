<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">User Management</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row">
    <q-input outlined v-model="searchText" label="Search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div class="row table-white-container" :class="{ fullscreen: isFullScreen }">
    <div class="col-12">
      <div class="row q-mb-md q-mt-md">
        <div class="col-12 justify-content-space-between">
          <q-btn
            outline
            icon="add"
            label="add new user"
            @click="createUserAdminComponentFlag = true"
          />
          <q-btn
            flat
            round
            color="primary"
            :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="isFullScreen = !isFullScreen"
          />
        </div>
      </div>
      <div class="row" style="height: fit-content">
        <div class="col-12">
          <q-table
            class="table-sticky-header-column-table table-cursor-pinter-custom"
            style="height: 628px"
            :rows
            :columns
            row-key="uId"
            :pagination="{
              rowsPerPage: 0,
            }"
          >
            <template v-slot:body="props">
              <q-tr
                :props="props"
                @click="
                  () => {
                    userToEdit = props.row
                    createUserAdminComponentFlag = true
                  }
                "
              >
                <q-td v-for="td in columns" :key="td.name" :props="props">
                  <div v-if="td.name === 'isAdmin' || td.name === 'active'">
                    <q-checkbox v-model="props.row[td.name]" disable />
                  </div>
                  <div v-else>{{ props.row[td.name] }}</div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
  <CreateUserAdminComponent :user="userToEdit" v-model="createUserAdminComponentFlag" />
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { useUserAdmin } from 'src/modules/dashboard/composables/useUserAdmin'
import type { AdminUserInterface } from 'src/modules/dashboard/interfaces/admin-user.interface'
import { useUserAdminStore } from 'src/modules/dashboard/store/adminUserStore/adminUserStore'
import { computed, onMounted, ref, watch } from 'vue'
import CreateUserAdminComponent from '../components/CreateUserAdminComponent.vue'

const { getUsers } = useUserAdmin()
const $uaStore = useUserAdminStore()

const userToEdit = ref<AdminUserInterface | undefined>(undefined)

const isFullScreen = ref<boolean>(false)
const createUserAdminComponentFlag = ref<boolean>(false)

const columns: QTableColumn<AdminUserInterface>[] = [
  {
    field: 'lastName',
    name: 'lastName',
    required: true,
    label: 'Las Name',
    align: 'left',
    sortable: true,
  },
  {
    field: 'firstName',
    name: 'firstName',
    required: true,
    label: 'First Name',
    align: 'left',
    sortable: true,
  },
  {
    field: 'login',
    name: 'login',
    required: true,
    label: 'Login',
    align: 'left',
    sortable: true,
  },

  {
    field: 'email',
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    sortable: true,
  },
  {
    field: 'address',
    name: 'address',
    required: true,
    label: 'Address',
    align: 'left',
    sortable: true,
  },
  {
    field: 'city',
    name: 'city',
    label: 'City',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'state',
    name: 'state',
    label: 'State',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'zip',
    name: 'zip',
    label: 'Zip Code',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'phone',
    name: 'phone',
    label: 'Phone',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'active',
    name: 'active',
    label: 'Active',
    required: true,
    align: 'left',
    sortable: true,
  },
  {
    field: 'isAdmin',
    name: 'isAdmin',
    label: 'Is Admin',
    required: true,
    align: 'left',
    sortable: true,
  },
]

const searchText = ref<string>('')

const rows = computed(() =>
  $uaStore.$state.users.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchText.value.toLowerCase()),
  ),
)

onMounted(() => {
  getUsers().catch(console.error)
})

watch(createUserAdminComponentFlag, (val) => {
  if (!val) userToEdit.value = undefined
})
</script>

<style scoped lang="scss"></style>
