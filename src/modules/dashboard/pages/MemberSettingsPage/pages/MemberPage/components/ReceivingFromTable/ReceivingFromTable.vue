<template>
  <div class="row">
    <h5 style="margin: 0px">
      <b> Receiving From: </b>
    </h5>
  </div>
  <div v-if="memberState.memberReceivingFrom.length">
    <div class="row RecentOrders-container white-container" :class="{ fullscreen: isFullScreen }">
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
          :style="{ height: isFullScreen ? '800px' : '628px' }"
          class="table-sticky-header-column-table"
          flat
          bordered
          ref="tableRef"
          :rows="memberState.memberReceivingFrom"
          :columns="columns"
          row-key="m_id"
          styles="height: 360px"
          :pagination="{
            rowsPerPage: 0,
          }"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <q-btn
                  v-if="col.name === 'tranId'"
                  flat
                  color="primary"
                  :label="col.value"
                  :to="{
                    name: 'dashboard-transactionDetailsPage',
                    params: { transactionID: col.value },
                  }"
                />

                <q-btn
                  v-else-if="col.name === 'sendEmail'"
                  size="sm"
                  color="primary"
                  label="send email "
                  @click="
                    () => {
                      onSendEmailFlag = true
                      colValue = col.value
                    }
                  "
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

  <div v-else class="row">
    <h6>No data to show</h6>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'

import { useMember } from 'src/modules/dashboard/composables/useMember'
import { ref } from 'vue'
import type { ReceivingFromDataInterface } from 'src/modules/dashboard/interfaces/member-interfaces'

const { memberState } = useMember()
const isFullScreen = ref(false)
const onSendEmailFlag = ref(false)

const colValue = ref<number | undefined>(undefined)

console.log({ memberState: memberState.value })

const columns: QTableColumn<ReceivingFromDataInterface>[] = [
  {
    field: 'm_FName',
    name: 'm_FName',
    label: 'First Name',
    required: true,
    align: 'left',
  },
  {
    field: 'm_LastName',
    name: 'm_LastName',
    label: 'Last Name',
    required: true,
    align: 'left',
  },
  {
    field: 'm_SFName',
    name: 'm_SFName',
    label: 'Spouse First Name',
    required: true,
    align: 'left',
  },
  {
    field: 'm_displayname',
    name: 'm_displayname',
    label: 'Display Name',
    required: true,
    align: 'left',
  },
]
</script>

<style lang="scss">
@import './ReceivingFromTable.scss';
</style>
