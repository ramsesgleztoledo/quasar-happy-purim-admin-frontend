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
  <div :class="{ row: !isMobile }">
    <q-input class="q-mr-sm q-mb-sm" outlined v-model="searchText" label="Search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-select
      :class="{ 'item-width-300': !isMobile }"
      v-model="categories"
      outlined
      multiple
      :options="$dStore.categories"
      label="Filter by categories"
      option-label="categoryName"
      option-value="categoryID"
    />
  </div>
  <div class="q-pa-md">
    <div class="row RecentOrders-container" :class="{ fullscreen: isFullScreen }">
      <div class="col-12">
        <div class="row">
          <div class="col-12 justify-content-end">
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
          class="table-sticky-header-column-table"
          flat
          bordered
          ref="tableRef"
          :rows
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

                <p v-else>
                  {{ col.value }}
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUI } from 'src/modules/UI/composables'
import type { MemberInterface } from '../../interfaces/member-interfaces'
import { useMember } from '../../composables/useMember'
import type { ShulCategoryInterface } from '../../interfaces/category-interfaces'
import { useDashboardStore } from '../../store/dashboardStore/dashboardStore'

const { isMobile } = useUI()
const $router = useRouter()
const $dStore = useDashboardStore()
const { memberState } = useMember()

const categories = ref<ShulCategoryInterface[]>([])

const rows = computed(() =>
  memberState.value.members
    .filter((item) => JSON.stringify(item).toLowerCase().includes(searchText.value.toLowerCase()))
    .filter((member) => {
      const categoriesArray = categories.value || []

      for (let i = 0; i < categoriesArray.length; i++) {
        const cat = categoriesArray[i]!.categoryName
        if (!member.m_category.includes(cat)) return false
      }
      return true
    }),
)
const isFullScreen = ref(false)

const goToMember = (memberId: number) => {
  $router.push({
    name: 'MemberLayout-MemberPage',
    params: {
      memberId,
    },
  })
}

const columns: QTableColumn<MemberInterface>[] = [
  {
    name: 'm_hidden',
    required: true,
    label: '',
    align: 'left',
    field: 'm_hidden',
    sortable: true,
  },
  {
    name: 'lastName',
    required: true,
    label: 'Last Name',
    align: 'left',
    field: 'm_LastName',
    sortable: true,
  },

  {
    name: 'firstName',
    required: true,
    label: 'First Name',
    align: 'left',
    field: 'm_FName',
    sortable: true,
  },
  {
    name: 'spouse',
    field: 'm_SFName',
    label: 'Spouse',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'title',
    field: 'm_title',
    label: 'Title',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'address',
    field: 'm_Address1',
    label: 'Address',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'city',
    field: 'm_City',
    label: 'City',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'zipCode',
    field: 'm_Zip',
    label: 'Zip Code',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'phone',
    field: 'm_phone',
    label: 'Phone#',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'email',
    field: 'm_email',
    label: 'Email',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'code',
    field: 'm_Code',
    label: 'Code',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'misc',
    field: 'm_misc',
    label: 'Misc',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'dateAdded',
    required: true,
    label: 'Date Added',
    align: 'left',
    field: 'm_added',
    format: (date: string) => convertToUSDate(date),
    sortable: true,
  },
]

const searchText = ref<string>('')
</script>

<style scoped lang="scss">
@import './MemberSettingsPage.scss';
</style>
