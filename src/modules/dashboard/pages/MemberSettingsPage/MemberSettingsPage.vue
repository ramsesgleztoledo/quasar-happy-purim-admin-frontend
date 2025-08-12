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
      v-if="$dStore.categories.length"
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
          @update:pagination="onPaginationUpdate"
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
          v-model:pagination="pagination"
          @row-click="
            (evt: Event, row: MemberInterface, index: number) => {
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

                <div v-else style="cursor: pointer; overflow: hidden; text-overflow: ellipsis">
                  {{ col.value }}
                  <q-tooltip>
                    {{ col.value }}
                  </q-tooltip>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn, QTableProps } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUI } from 'src/modules/UI/composables'
import type { MemberInterface } from '../../interfaces/member-interfaces'
import { useMember } from '../../composables/useMember'
import type { ShulCategoryInterface } from '../../interfaces/category-interfaces'
import { useDashboardStore } from '../../store/dashboardStore/dashboardStore'
import { compareValues } from 'src/helpers/compareValues'

const { isMobile } = useUI()
const $router = useRouter()
const $route = useRoute()
const $dStore = useDashboardStore()
const { memberState, getMembers_Co } = useMember()

const isFullScreen = ref(false)

const pagination = ref<QTableProps['pagination']>({
  rowsPerPage: 20,
})

const goToMember = (memberId: number) => {
  $router.push({
    name: 'MemberLayout-MemberPage',
    params: {
      memberId,
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const auxColumns: { label: string; field: string; format?: any }[] = [
  {
    label: 'Hidden',
    field: 'm_hidden',
  },
  {
    label: 'Last Name',
    field: 'm_LastName',
  },

  {
    label: 'First Name',
    field: 'm_FName',
  },
  {
    field: 'm_SFName',
    label: 'Spouse',
  },
  {
    field: 'm_title',
    label: 'Title',
  },
  {
    field: 'm_Address1',
    label: 'Address',
  },
  {
    field: 'm_City',
    label: 'City',
  },
  {
    field: 'm_Zip',
    label: 'Zip Code',
  },
  {
    field: 'm_phone',
    label: 'Phone#',
  },
  {
    field: 'm_email',
    label: 'Email',
  },
  {
    field: 'm_Code',
    label: 'Code',
  },
  {
    field: 'm_misc',
    label: 'Misc',
  },
  {
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
  name: co.field,
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
  loadPage()
  getMembers_Co({
    category: filters.value.category?.categoryID ?? '',
    search: filters.value.search,
  })
})

const onPaginationUpdate = (newPagination: QTableProps['pagination']) => {
  if (newPagination?.sortBy) {
    const { sortBy, descending } = newPagination
    if (sortBy) {
      memberState.value.members.sort((a, b) => {
        const valA = a[sortBy as keyof MemberInterface]
        const valB = b[sortBy as keyof MemberInterface]

        return compareValues(valA, valB, descending)
      })
    }
    pagination.value = newPagination
  }
}

const goToPage = (categoryId: number | undefined, search: string) => {
  $router.push({
    name: 'MembersSettingsPage-home',
    query: {
      search,
      categoryId,
    },
  })
}

const loadPage = () => {
  const { categoryId, search } = $route.query

  filters.value = {
    category: categoryId
      ? $dStore.categories.find((c) => c.categoryID == Number(categoryId))
      : undefined,
    search: search ? `${search}` : '',
  }

  goToPage(filters.value.category?.categoryID, filters.value.search)
}

watch(
  filters,
  (newValue) => {
    const stringNewValue = JSON.stringify(newValue)
    const stringOldValue = JSON.stringify(oldValue.value)

    if (stringNewValue == stringOldValue) return

    oldValue.value = { ...newValue }

    goToPage(filters.value.category?.categoryID, newValue.search)
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
