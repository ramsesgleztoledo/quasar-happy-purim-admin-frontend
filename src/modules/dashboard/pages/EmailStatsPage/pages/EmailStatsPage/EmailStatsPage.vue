<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Email Stats</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>

  <div class="white-100-container" :class="{ fullscreen: isFullScreen }">
    <div class="row q-mb-sm" style="justify-content: space-between">
      <q-input outlined v-model="searchText" label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        flat
        round
        color="primary"
        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="isFullScreen = !isFullScreen"
      />
    </div>
    <TableCustom
      class-name="table-sticky-header-column-table table-cursor-pointer-custom"
      styles="height: 628px"
      :rows
      :columns="columns"
      row-key="id"
      title="Campaigns"
      @onRowClicked="
        ({ row }: any) => {
          $router.push({
            name: 'EmailStatsPage-campaign',
            params: {
              campaignId: row.campaignID,
            },
          })
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers'
import TableCustom from 'src/components/TableCustom/TableCustom.vue'
import { useEmail } from 'src/modules/dashboard/composables/useEmail'

const { getEmails, emailState } = useEmail()

const searchText = ref('')
const isFullScreen = ref(false)

const rows = computed(() =>
  emailState.value.campaigns.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchText.value.toLowerCase()),
  ),
)

onMounted(() => {
  getEmails()
})

const columns: QTableColumn[] = [
  {
    name: 'campaignID',
    required: true,
    label: 'Campaign ID',
    align: 'left',
    field: 'campaignID',
    // format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: 'date',
    format: (date: string) => convertToUSDate(date),
    sortable: true,
  },

  {
    name: 'subject',
    required: true,
    label: 'Subject',
    align: 'left',
    field: 'subject',
    sortable: true,
  },
  {
    name: 'sentFrom',
    field: 'sentFrom',
    label: 'Sent From',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'sent',
    field: 'sent',
    label: '#Sent',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'processed',
    field: 'processed',
    label: '#Processed',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'dropped',
    field: 'dropped',
    label: '#Dropped',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'deferred',
    field: 'deferred',
    label: '#Deferred',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'delivered',
    field: 'delivered',
    label: '#Delivered',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'bounced',
    field: 'bounced',
    label: '#Bounced',
    align: 'left',
    required: true,
    sortable: true,
  },
]
</script>

<style scoped lang="scss">
@import './EmailStatsPage.scss';
</style>
