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
        :rows="memberState.members"
        :columns="columns"
        row-key="id"
        title="Members List"
        @on-row-click="
          (data) => {
            goToMember(data.row.m_id)
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
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useRouter } from 'vue-router'
import { useUI } from 'src/modules/UI/composables'
import type { MemberInterface } from '../../interfaces/member-interfaces'
import { useMember } from '../../composables/useMember'

const { isMobile } = useUI()
const $router = useRouter()
const { memberState } = useMember()

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
