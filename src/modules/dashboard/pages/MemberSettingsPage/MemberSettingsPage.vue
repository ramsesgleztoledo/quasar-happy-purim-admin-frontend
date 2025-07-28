<template>
  <div class="row justify-content-end q-mb-md">
    <q-btn
      outline
      label="ADD MEMBER"
      class="q-mr-sm"
      :to="{ name: 'MembersSettingsPage-AddMemberPage' }"
    />
    <q-btn
      outline
      label="UPLOAD MEMBER LIST"
      :to="{ name: 'MembersSettingsPage-MemberListLayout' }"
    />
  </div>
  <div :class="{ 'MemberSettingsPage-mobile-btn': isMobile, row: !isMobile }">
    <q-input
      class="q-mr-sm q-mb-sm"
      :class="{ 'w-full': isMobile }"
      outlined
      v-model="filters.search"
      label="Search"
      :debounce="500"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-select
      popup-content-class="q-menu-300"
      :debounce="500"
      class="q-mr-sm q-mb-sm"
      :class="{ 'item-width-300': !isMobile, 'w-full': isMobile }"
      v-model="filters.category"
      outlined
      :options="$dStore.categories"
      label="Filter by categories"
      option-label="categoryName"
      option-value="categoryID"
    />
    <q-btn @click="onClearFilters" class="q-mr-sm q-mb-sm" outline color="primary" icon="close" />
  </div>
  <div class="q-pa-md">
    <div class="row RecentOrders-container" :class="{ fullscreen: isFullScreen }">
      <div class="col-12">
        <div class="row">
          <div class="col-12 justify-content-end white-container">
            <q-btn
              flat
              round
              color="primary"
              :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="isFullScreen = !isFullScreen"
            />
          </div>
        </div>
        <q-table
          title="Member List"
          :style="{ height: isFullScreen ? '800px' : '630px' }"
          class="table-sticky-header-column-table sticky-2-column-table"
          flat
          bordered
          ref="tableRef"
          :rows="memberState.members"
          :columns="columns"
          row-key="m_id"
          styles="height: 360px"
          :pagination="{
            rowsPerPage: 20,
          }"
          @row-click="
            (evt: Event, row: MemberInterface, index: number) => {
              console.log('row ', { row })

              goToMember(row.m_id)
            }
          "
        >
          <template v-slot:body="props">
            <q-tr
              @click="
                () => {
                  goToMember(props.row.m_id)
                }
              "
              :props="props"
            >
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="col.name === 'm_hidden'">
                  <q-icon
                    v-if="props.row.m_hidden"
                    color="primary"
                    size="large"
                    name="visibility_off"
                  />
                  <!-- <q-icon v-else color="primary" size="large" name="visibility" /> -->
                </div>

                <p v-else style="cursor: pointer; overflow: hidden; text-overflow: ellipsis">
                  {{ col.value }}
                  <q-tooltip>
                    {{ col.value }}
                  </q-tooltip>
                </p>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUI } from 'src/modules/UI/composables'
import type { MemberInterface } from '../../interfaces/member-interfaces'
import { useMember } from '../../composables/useMember'
import type { ShulCategoryInterface } from '../../interfaces/category-interfaces'
import { useDashboardStore } from '../../store/dashboardStore/dashboardStore'

const { isMobile } = useUI()
const $router = useRouter()
const $dStore = useDashboardStore()
const { memberState, getMembers_Co } = useMember()

const isFullScreen = ref(false)

const goToMember = (memberId: number) => {
  $router.push({
    name: 'MemberLayout-MemberPage',
    params: {
      memberId,
    },
  })
}

const auxColumns: QTableColumn[] = [
  {
    name: 'm_hidden',
    label: 'Hidden',
    field: 'm_hidden',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    field: 'm_LastName',
  },

  {
    name: 'firstName',
    label: 'First Name',
    field: 'm_FName',
  },
  {
    name: 'spouse',
    field: 'm_SFName',
    label: 'Spouse',
  },
  {
    name: 'title',
    field: 'm_title',
    label: 'Title',
  },
  {
    name: 'address',
    field: 'm_Address1',
    label: 'Address',
  },
  {
    name: 'city',
    field: 'm_City',
    label: 'City',
  },
  {
    name: 'zipCode',
    field: 'm_Zip',
    label: 'Zip Code',
  },
  {
    name: 'phone',
    field: 'm_phone',
    label: 'Phone#',
  },
  {
    name: 'email',
    field: 'm_email',
    label: 'Email',
  },
  {
    name: 'code',
    field: 'm_Code',
    label: 'Code',
  },
  {
    name: 'misc',
    field: 'm_misc',
    label: 'Misc',
  },
  {
    name: 'dateAdded',
    label: 'Date Added',
    field: 'm_added',
    format: (date: string) => convertToUSDate(date),
  },
]

const columns: QTableColumn[] = auxColumns.map((co) => ({
  ...co,
  style: 'max-width: 150px; overflow: hidden; text-overflow: ellipsis',
  headerStyle: 'max-width: 150px; overflow: hidden; text-overflow: ellipsis',
  required: true,
  sortable: true,
  align: 'left',
}))

const filters = ref<{
  category: ShulCategoryInterface | undefined
  search: string
}>({
  category: undefined,
  search: '',
})

const oldValue = ref<{
  category: ShulCategoryInterface | undefined
  search: string
}>({
  category: undefined,
  search: '',
})

const onClearFilters = () => {
  filters.value = {
    category: undefined,
    search: '',
  }
}

onMounted(() => {
  getMembers_Co({
    category: filters.value.category?.categoryID ?? '',
    search: filters.value.search,
  })
})

watch(
  filters,
  (newValue) => {
    const stringNewValue = JSON.stringify(newValue)
    const stringOldValue = JSON.stringify(oldValue.value)

    if (stringNewValue == stringOldValue) return

    oldValue.value = { ...newValue }

    getMembers_Co({
      category: filters.value.category?.categoryID ?? '',
      search: filters.value.search,
    })
  },
  {
    deep: true,
  },
)
</script>

<style scoped lang="scss">
@import './MemberSettingsPage.scss';
</style>
