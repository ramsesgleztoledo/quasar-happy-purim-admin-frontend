<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Email Queue - Currently Pending</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row q-mb-sm">
    <div class="col-12">
      <div class="row table-white-container" :class="{ fullscreen: isFullScreenEmailQueue }">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                flat
                round
                color="primary"
                :icon="isFullScreenEmailQueue ? 'fullscreen_exit' : 'fullscreen'"
                @click="isFullScreenEmailQueue = !isFullScreenEmailQueue"
              />
            </div>
          </div>
          <q-table
            :pagination="{
              rowsPerPage: 0,
            }"
            no-data-label="No Scheduled Emails"
            class="table-sticky-header-column-table"
            flat
            bordered
            ref="tableRef"
            :rows
            :columns="columnsQueue"
            row-key="campaignId"
            styles="height: 360px"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'campaignId'">
                    <div class="row" style="min-width: 250px">
                      <q-btn
                        class="q-mr-sm q-mt-sm"
                        style="background-color: var(--happypurim); color: white; font-size: 12px"
                        label="view"
                        icon="visibility"
                        padding="5px"
                        size="sm"
                        flat
                        @click="
                          () => {
                            $router.push({
                              name: 'MailMergeReportsPage-ScheduleEmailDetails',
                              params: {
                                scheduledEmailId: col.value,
                              },
                            })
                          }
                        "
                      >
                        <q-tooltip>
                          <div>View Campaign</div>
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        class="q-mr-sm q-mt-sm"
                        style="background-color: var(--happypurim); color: white; font-size: 12px"
                        label="cancel"
                        icon="close"
                        padding="5px"
                        size="sm"
                        flat
                        @click="
                          () => {
                            emailToCancel = col.value
                            cancelDialogFlag = true
                          }
                        "
                      >
                        <q-tooltip>
                          <div>Cancel Scheduled Email</div>
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>

                  <div v-else-if="col.name === 'regenerate'">
                    <!-- <q-checkbox v-model="col.value" disable /> -->
                    <q-icon v-if="col.value" name="check" color="green" size="20px" />
                  </div>

                  <div v-else>
                    {{ col.value }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row q-mb-sm">
    <div class="col-12">
      <div class="row table-white-container" :class="{ fullscreen: isFullScreenEmailSent }">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                flat
                round
                color="primary"
                :icon="isFullScreenEmailSent ? 'fullscreen_exit' : 'fullscreen'"
                @click="isFullScreenEmailSent = !isFullScreenEmailSent"
              />
            </div>
          </div>
          <q-table
            :pagination="{
              rowsPerPage: 0,
            }"
            title="Email Sent"
            :style="{ height: isFullScreenEmailSent ? '800px' : '400px' }"
            class="table-sticky-header-column-table"
            flat
            bordered
            ref="tableRef"
            :rows="[]"
            :columns="columnsSent"
            row-key="id"
            styles="height: 360px"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <q-btn v-if="col.name === 'id'" flat color="primary" :label="col.value" />

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

                  <div v-else>
                    {{ col.value }}
                  </div>
                </q-td>

              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div> -->

  <!--* confirm cancel --->
  <DialogAlert
    @on-finish="
      (value) => {
        if (value) onDelete()
      }
    "
    msg="Are you sure you want to cancel this scheduled email?"
    v-model="cancelDialogFlag"
  />
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'

import { onMounted, ref } from 'vue'
import type { ScheduleEmailInterface } from '../../interfaces/schedule-email.interfaces'
import { useEmailScheduler } from '../../composables/useEmailScheduler'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import { getDateByTimeZone } from 'src/helpers/getDateByTimeZone'

const { getEmailScheduler, cancelCampaign } = useEmailScheduler()

const isFullScreenEmailQueue = ref<boolean>(false)
const cancelDialogFlag = ref<boolean>(false)
const emailToCancel = ref<number | undefined>(undefined)
// const isFullScreenEmailSent = ref<boolean>(false)

const columnsQueue: QTableColumn<ScheduleEmailInterface>[] = [
  {
    name: 'campaignId',
    required: true,
    label: 'Options',
    align: 'left',
    field: 'campaignId',
    sortable: true,
  },
  {
    name: 'id',
    required: true,
    label: 'Campaign ID',
    align: 'left',
    field: 'campaignId',
    sortable: true,
  },
  {
    name: 'emailCount',
    required: true,
    label: 'Number Of Emails Pending',
    align: 'left',
    field: 'emailCount',
    sortable: true,
  },
  {
    name: 'adminName',
    required: true,
    label: 'Submitted By',
    align: 'left',
    field: 'adminName',
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
    name: 'formattedSendingDate',
    required: true,
    label: 'Sending Date',
    align: 'left',
    field: 'formattedSendingDate',
    sortable: true,
    format: (date: string, row: ScheduleEmailInterface) =>
      `${getDateByTimeZone(date + '.000Z', row.timeZone)}`,
  },
  {
    name: 'timeZone',
    required: true,
    label: 'Time Zone',
    align: 'left',
    field: 'timeZone',
    sortable: true,
    format: (timeZone: string) => timeZone.replace('_', ' '),
  },
  {
    name: 'regenerate',
    required: true,
    label: 'Regenerate',
    align: 'center',
    field: 'regenerate',
    sortable: true,
  },
]
// const columnsSent: QTableColumn[] = [
//   {
//     name: '# Sent',
//     required: true,
//     label: '# Sent',
//     align: 'left',
//     field: 'id',
//     sortable: true,
//   },
//   {
//     name: 'Submitted By',
//     required: true,
//     label: 'Submitted By',
//     align: 'left',
//     field: 'id',
//     sortable: true,
//   },
//   {
//     name: 'Organization',
//     required: true,
//     label: 'Organization',
//     align: 'left',
//     field: 'id',
//     sortable: true,
//   },
//   {
//     name: 'Date Added',
//     required: true,
//     label: 'Date Added',
//     align: 'left',
//     field: 'id',
//     sortable: true,
//     format: (date: string) => convertToUSDate(date),
//   },
// ]

const rows = ref<ScheduleEmailInterface[]>([])

const onDelete = async () => {
  if (!emailToCancel.value) return
  const resp = await cancelCampaign(emailToCancel.value)
  if (!resp) return
  rows.value = rows.value.filter((row) => row.campaignId != emailToCancel.value)
  emailToCancel.value = undefined
}

onMounted(() => {
  getEmailScheduler().then((resp) => {
    rows.value = resp
  })
})
</script>

<style scoped lang="scss"></style>
