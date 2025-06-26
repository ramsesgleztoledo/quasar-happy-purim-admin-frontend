<template>
  <div v-if="emailState.selectedCampaign">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Email Campaign Detail</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>
    <div class="row q-mt-md q-mb-md">
      <div class="col-12">
        <q-item class="EmailStatsCampaignPage-item">
          <q-item-section
            ><q-item-label> <b> Campaign ID </b> </q-item-label>
            <q-item-label caption>
              {{ emailState.selectedCampaign.metadata?.campaignID }}
            </q-item-label></q-item-section
          >
          <q-item-section
            ><q-item-label> <b> Date </b> </q-item-label>
            <q-item-label caption>
              {{
                convertToUSDate(
                  new Date(emailState.selectedCampaign.metadata.dateAdded).toISOString(),
                )
              }}
            </q-item-label></q-item-section
          >
          <q-item-section
            ><q-item-label> <b> Subject </b> </q-item-label>
            <q-item-label caption>
              {{ emailState.selectedCampaign.metadata?.subject }}
            </q-item-label></q-item-section
          >
          <q-item-section
            ><q-item-label> <b> From </b> </q-item-label>
            <q-item-label caption>
              {{ emailState.selectedCampaign.metadata?.from }}
            </q-item-label></q-item-section
          >
        </q-item>
      </div>
    </div>
    <div class="row q-mb-sm">
      <div
        :class="{
          'col-6': !isMobile,
          'col-12': isMobile,
        }"
      >
        <q-btn-toggle
          v-model="tableView"
          spread
          no-caps
          :options="tableViewOption"
          style="height: 100%"
        />
      </div>

      <div
        class="justify-content-end"
        :class="{
          'col-6': !isMobile,
          'col-12': isMobile,
          'q-mt-sm': isMobile,
        }"
      >
        <q-input disable outlined v-model="searchText" label="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="row table-white-container" :class="{ fullscreen: isFullScreen }">
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
              title="Emails"
              :style="{ height: isFullScreen ? '800px' : '400px' }"
              class="table-sticky-header-column-table"
              flat
              bordered
              ref="tableRef"
              :rows="tableData"
              :columns="columns"
              row-key="id"
              styles="height: 360px"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    <q-btn
                      v-if="col.name === 'id'"
                      flat
                      color="primary"
                      :label="col.value"
                      @click="() => showEmailContent(props.row.id)"
                    />

                    <q-btn
                      v-else-if="col.name === 'MemberID'"
                      flat
                      color="primary"
                      :label="col.value"
                      :to="{
                        name: 'MemberLayout',
                        params: { memberId: props.row.MemberID },
                      }"
                    />

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
    </div>
  </div>

  <InfoDialog
    v-model="emailContentDialogFlag"
    title="Email Content"
    :innerHTML="emailContent"
    height="auto"
    htmlContainerClasses="html-display-container"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { QTableColumn } from 'quasar'
import { convertToUSDate } from 'src/helpers'
import { useUI } from 'src/modules/UI/composables'
import { useEmail } from 'src/modules/dashboard/composables/useEmail'
import { useRoute } from 'vue-router'
import type { EmailInterface } from 'src/modules/dashboard/interfaces/email-interfaces'
import InfoDialog from 'src/components/InfoDialog/InfoDialog.vue'

const { getCampaignDetailById, emailState, getEmailContentByEmailId } = useEmail()
const $route = useRoute()

onMounted(async () => {
  const campaignId = $route.params.campaignId
  getCampaignDetailById(Number(campaignId))
})

const { isMobile } = useUI()

const searchText = ref('')
const tableView = ref('1')
const isFullScreen = ref<boolean>(false)
const emailContentDialogFlag = ref<boolean>(false)
const emailContent = ref<string>('')

const tableViewOption = computed(() => [
  { label: `Delivered (${emailState.value.selectedCampaign?.delivered?.length || 0})`, value: '1' },
  { label: `Dropped (${emailState.value.selectedCampaign?.dropped?.length || 0})`, value: '2' },
  { label: `Deferred (${emailState.value.selectedCampaign?.deferred?.length || 0})`, value: '3' },
  { label: `Bounced (${emailState.value.selectedCampaign?.bounced?.length || 0})`, value: '4' },
])

const tableData = computed(() => {
  const view = tableView.value
  let data = []
  switch (view) {
    case '1':
      data = emailState.value.selectedCampaign?.delivered || []
      break
    case '2':
      data = emailState.value.selectedCampaign?.dropped || []
      break
    case '3':
      data = emailState.value.selectedCampaign?.deferred || []
      break
    default:
      data = emailState.value.selectedCampaign?.bounced || []
      break
  }
  return data
})

const columns: QTableColumn[] = [
  {
    name: 'id',
    required: true,
    label: 'Email ID',
    align: 'left',
    field: 'id',
    // format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'DateAdded',
    required: true,
    label: 'Date Logged',
    align: 'left',
    field: 'DateAdded',
    format: (date: string) => convertToUSDate(date),
    sortable: true,
  },

  {
    name: 'MemberID',
    required: true,
    label: 'Member',
    align: 'left',
    field: 'MemberID',
    format: (_, row: EmailInterface) => `${row.m_LastName}, ${row.m_FName}`,
    sortable: true,
  },
  {
    name: 'Subject',
    field: 'Subject',
    label: 'Subject',
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'Reason',
    field: 'Reason',
    label: 'Reason',
    align: 'left',
    required: true,
    sortable: true,
  },
]

watch(tableView, () => {
  searchText.value = ''
})

const showEmailContent = async (id: number) => {
  emailContent.value = await getEmailContentByEmailId(id)
  emailContentDialogFlag.value = true
}
</script>

<style scoped lang="scss">
@import './EmailStatsCampaignPage.scss';
</style>
