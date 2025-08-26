<template>
  <div class="row q-mb-sm">
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
            :pagination="{
              rowsPerPage: 0,
            }"
            title="Scheduled Emails"
            class="table-sticky-header-column-table"
            flat
            bordered
            ref="tableRef"
            :rows="emails"
            :columns
            row-key="campaignId"
            styles="height: 360px"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'id'">
                    <div class="row">
                      <q-btn
                        class="q-mr-sm"
                        style="background-color: var(--happypurim); color: white"
                        label="view"
                        flat
                        icon="visibility"
                        @click="
                          () => {
                            openEmailContent(col.value)
                          }
                        "
                      >
                        <q-tooltip>
                          <div>View Email Content</div>
                        </q-tooltip>
                      </q-btn>
                    </div>
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

  <!--=============================== email content dialog =============================-->

  <q-dialog v-model="show" persistent>
    <q-card :style="{ minWidth: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Email Content</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg">
        <div v-html="emailContent"></div>
      </div>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { EmailToBeSentInterface } from '../../interfaces/schedule-email.interfaces'
import { useEmailScheduler } from '../../composables/useEmailScheduler'
import { useUI } from 'src/modules/UI/composables'
const $route = useRoute()
const { isMobile } = useUI()
const { getEmailsByCampaignId, getScheduledEmailContent } = useEmailScheduler()

const emails = ref<EmailToBeSentInterface[]>([])
const isFullScreen = ref(false)
const show = ref(false)
const emailContent = ref('')

const columns: QTableColumn<EmailToBeSentInterface>[] = [
  {
    name: 'id',
    required: true,
    label: 'Options',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'toAddress',
    required: true,
    label: 'To Address',
    align: 'left',
    field: 'toAddress',
    sortable: true,
  },
  {
    name: 'fromAddress',
    required: true,
    label: 'From Address',
    align: 'left',
    field: 'fromAddress',
    sortable: true,
  },
  {
    name: 'fromDisplayName',
    required: true,
    label: 'From Display Name',
    align: 'left',
    field: 'fromDisplayName',
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
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true,
  },

  // {
  //   name: 'dateSent',
  //   required: true,
  //   label: 'Date Added',
  //   align: 'left',
  //   field: 'dateSent',
  //   sortable: true,
  //   format: (date: string) => (date ? date : 'N/A'),
  // },
]

const openEmailContent = async (id: number | string) => {
  if (!id) return
  emailContent.value = await getScheduledEmailContent(id)
  show.value = true
}

watch(
  () => $route.params.scheduledEmailId,
  () => {
    const id = $route.params.scheduledEmailId as string
    if (!id) return
    getEmailsByCampaignId(id).then((resp) => {
      emails.value = resp
    })
  },
  {
    immediate: true,
  },
)
</script>

<style scoped lang="scss"></style>
