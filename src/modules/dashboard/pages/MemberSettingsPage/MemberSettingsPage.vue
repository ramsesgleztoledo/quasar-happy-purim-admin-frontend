<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Member List</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row justify-content-space-between">
    <div
      :class="{ 'MemberSettingsPage-mobile-btn': isMobile, row: !isMobile, 'full-width': isMobile }"
    >
      <q-input
        class="q-mb-sm"
        :class="{ 'w-full': isMobile, 'q-mr-sm': !isMobile }"
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
        class="q-mb-sm"
        :class="{ 'item-width-300': !isMobile, 'w-full': isMobile, 'q-mr-sm': !isMobile }"
        v-model="filters.category"
        outlined
        multiple
        :options="$dStore.categories"
        label="Filter by categories"
        option-label="categoryName"
        option-value="categoryID"
      />
      <q-btn
        @click="onClearFilters"
        class="q-mb-sm"
        :class="{ 'q-mr-sm': !isMobile }"
        outline
        color="primary"
        icon="close"
      />
    </div>

    <div :class="{ 'justify-content-end': isMobile, 'w-full': isMobile }">
      <q-btn
        outline
        label="ADD MEMBER "
        class="q-mr-sm"
        :to="{ name: 'MembersSettingsPage-AddMemberPage' }"
        style="height: 42px"
      />
      <q-btn
        outline
        label="UPLOAD MEMBER LIST"
        :to="{ name: 'MembersSettingsPage-MemberListLayout' }"
        style="height: 42px"
      />
    </div>
  </div>
  <div class="">
    <div class="row white-container RecentOrders-container" :class="{ fullscreen: isFullScreen }">
      <div class="col-12">
        <div class="row">
          <div class="col-12 justify-content-end white-container">
            <q-btn
              flat
              round
              color="primary"
              :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="isFullScreen = !isFullScreen"
              style="font-size: 12px"
            />
          </div>
        </div>
        <q-table
          @update:pagination="onPaginationUpdate"
          :style="{ height: isFullScreen ? '800px' : '630px' }"
          class="table-sticky-header-column-table sticky-2-column-table-copy"
          flat
          bordered
          ref="tableRef"
          :rows="memberState.members.members"
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
        <div
          v-if="memberState.members.filteredCount != memberState.members.totalCount"
          class="row justify-content-end"
        >
          <span style="font-size: 12px; padding-right: 50px"
            >{{ memberState.members.filteredCount }} members filtered from
            {{ memberState.members.totalCount }} total members
          </span>
        </div>
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

const auxColumns: {
  label: string
  field: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: any
  style?: string
  headerStyle?: string
}[] = [
  {
    label: 'Hidden',
    field: 'm_hidden',
    style: 'width: 30px; overflow: hidden; text-overflow: ellipsis',
    headerStyle: 'width: 30px; overflow: hidden; text-overflow: ellipsis',
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
    style: 'min-width: 150px; overflow: hidden; text-overflow: ellipsis',
    headerStyle: 'min-width: 150px; overflow: hidden; text-overflow: ellipsis',
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
    label: 'Phone',
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
    style: 'min-width: 150px; overflow: hidden; text-overflow: ellipsis',
    headerStyle: 'min-width: 150px; overflow: hidden; text-overflow: ellipsis',
  },
]

const columns: QTableColumn[] = auxColumns.map((co) => ({
  ...co,
  style: co.style ? co.style : 'max-width: 150px; overflow: hidden; text-overflow: ellipsis',
  headerStyle: co.headerStyle
    ? co.headerStyle
    : 'max-width: 150px; overflow: hidden; text-overflow: ellipsis',
  required: true,
  sortable: true,
  align: 'left',
  name: co.field,
}))

const filters = ref<{
  category: ShulCategoryInterface[]
  search: string
}>({
  category: [],
  search: '',
})

const oldValue = ref<{
  category: ShulCategoryInterface[]
  search: string
}>({
  category: [],
  search: '',
})

const onClearFilters = () => {
  filters.value = {
    category: [],
    search: '',
  }
}

const getCategoriesIdAsString = () => {
  let value = ''
  filters.value.category.forEach((category, index) => {
    if (index > 0) value += ','
    value += `${category.categoryID}`
  })
  return value
}

onMounted(() => {
  loadPage()
  // getMembers_Co({
  //   categories: getCategoriesIdAsString(),
  //   search: filters.value.search,
  // })
})

const onPaginationUpdate = (newPagination: QTableProps['pagination']) => {
  if (newPagination?.sortBy) {
    const { sortBy, descending } = newPagination
    if (sortBy) {
      memberState.value.members.members.sort((a, b) => {
        const valA = a[sortBy as keyof MemberInterface]
        const valB = b[sortBy as keyof MemberInterface]

        return compareValues(valA, valB, descending)
      })
    }
    pagination.value = newPagination
  }
}

const goToPage = (categoryId: string | undefined, search: string) => {
  $router.push({
    name: 'MembersSettingsPage-home',
    query: {
      search,
      categoryId,
    },
  })
}

const getCategoriesByCategoryArr = (categories: string[]) => {
  const catArray = $dStore.categories.filter((cat) =>
    categories.includes(cat.categoryID.toString()),
  )
  return catArray
}

const loadPage = () => {
  const { categoryId, search } = $route.query
  const categoryIdAux: string = categoryId as string

  const categories = categoryIdAux ? categoryIdAux.split(',') : []

  filters.value = {
    category: categories.length ? getCategoriesByCategoryArr(categories) : [],
    // ? $dStore.categories.find((c) => c.categoryID == Number(categoryId))
    // : undefined,
    search: search ? `${search}` : '',
  }
  goToPage(getCategoriesIdAsString(), filters.value.search)
}

const filterDebounce = ref<NodeJS.Timeout | undefined>(undefined)

watch(
  filters,
  (newValue) => {
    if (filterDebounce.value) clearTimeout(filterDebounce.value)

    filterDebounce.value = setTimeout(() => {
      // const stringNewValue = JSON.stringify(newValue)
      // const stringOldValue = JSON.stringify(oldValue.value)

      // if (stringNewValue == stringOldValue) return

      oldValue.value = { ...newValue }

      goToPage(getCategoriesIdAsString(), newValue.search)
      getMembers_Co({
        categories: getCategoriesIdAsString().split(',').join(', '),
        search: filters.value.search,
      })
    }, 800)
  },
  {
    deep: true,
    // immediate: true,
  },
)
</script>

<style scoped lang="scss">
@import './MemberSettingsPage.scss';
</style>
