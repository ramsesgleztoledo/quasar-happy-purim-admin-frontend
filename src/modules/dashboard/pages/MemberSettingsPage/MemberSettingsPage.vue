<template>
  <div class="row">
    <div
    class="q-mb-sm"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input outlined v-model="searchText" label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div
      class="MemberSettingsPage-desktop-btns"
      :class="{
        'col-8': !isMobile,
        'col-12': isMobile,
      }"
    >
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
  </div>

  <div class="row q-mt-md" style="height: 100%">
    <div class="col-12">
      <TableCustom
        class-name="table-sticky-header-column-table table-cursor-pinter-custom"
        styles="height: 628px"
        :rows="membersMock"
        :columns="columns"
        row-key="id"
        title="Recent Orders"
        @on-row-click="
          (data) => {
            goToMember(data.row.id)
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers/convertToUSDate'
import { ref } from 'vue'
import { members } from './mockups/mockups'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useRouter } from 'vue-router'
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()
const $router = useRouter()

const goToMember = (memberId: number) => {
  $router.push({
    name: 'MemberLayout-MemberPage',
    params: {
      memberId,
    },
  })
}

const membersMock = members

const columns: QTableColumn[] = [
  {
    name: 'lastName',
    required: true,
    label: 'Last Name',
    align: 'left',
    field: 'lastName',
    // format: (val: any) => `${val}`,
    sortable: true,
  },

  {
    name: 'firstName',
    required: true,
    label: 'First Name',
    align: 'left',
    field: 'firstName',
    sortable: true,
  },
  {
    name: 'spouse',
    field: 'spouse',
    label: 'Spouse',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'title',
    field: 'title',
    label: 'Title',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'address',
    field: 'address',
    label: 'Address',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'city',
    field: 'city',
    label: 'City',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'zipCode',
    field: 'zipCode',
    label: 'Zip Code',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'phone',
    field: 'phone',
    label: 'Phone#',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'code',
    field: 'code',
    label: 'Code',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'misc',
    field: 'misc',
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
    field: 'dateAdded',
    format: (processed: string) => convertToUSDate(processed),
    sortable: true,
  },
]

const searchText = ref<string>('')
</script>

<style scoped lang="scss">
@import './MemberSettingsPage.scss';
</style>
