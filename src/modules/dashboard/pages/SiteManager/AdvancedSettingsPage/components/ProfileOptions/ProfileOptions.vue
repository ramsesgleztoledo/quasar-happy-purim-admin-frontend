<template>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        v-model="donateBasketFlag"
        title="Enable Donate basket to Charity/Card Only Option"
      >
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <p>
                The responses to the following question will automatically subtract from the basket
                total on the Home Page. It will NOT remove them from the 'Receiving From Report'
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-input v-model="donateValue" outlined lazy-rules :rules="[lazyRules.required()]" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                :disable="!donateValue"
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="save"
                @click="
                  () => {
                    // console.log('editor value', { dateValue, timeValue })
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom v-model="alternateDeliveryFlag" title="Enable Alternate Delivery Address">
        <!--=============================== TODO: what goes here? =============================-->
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <q-input
                label="Question"
                v-model="alternateDeliveryValue"
                outlined
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-12 justify-content-end">
              <q-btn
                :disable="!alternateDeliveryValue"
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () => {
                    // console.log('editor value', { dateValue, timeValue })
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm ProfileOptions-table-content" :class="{ fullscreen: isFullScreen }">
    <div class="col-12">
      <div class="row q-mb-sm justify-content-space-between">
        <p style="margin: 0px">Additional Profile Questions/Options</p>
        <q-btn
          flat
          round
          color="primary"
          :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="isFullScreen = !isFullScreen"
        />
      </div>
      <div class="row">
        <q-btn
          style="background: white; color: var(--happypurim)"
          icon="add"
          label="add new options"
        />
      </div>
      <div class="row q-mt-sm" :style="{ height: isFullScreen ? '85%' : '400px' }">
        <div class="col-12">
          <q-table
            style="height: 100%"
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="name"
            class="table-sticky-header-column-table"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="option" :props="props">
                  {{ props.row.option }}
                </q-td>
                <q-td key="showOnFrontEnd" :props="props">
                  <q-checkbox disable v-model="props.row.showOnFrontEnd" />
                </q-td>
                <q-td key="saveResponses" :props="props">
                  <q-checkbox disable v-model="props.row.saveResponses" />
                </q-td>
                <q-td key="displayOrder" :props="props">
                  <q-badge color="primary">
                    {{ props.row.displayOrder }}
                  </q-badge>
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn
                    flat
                    style="background: var(--happypurim); color: white"
                    label="Edit"
                    @click="() => console.log(props.row.id)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import ExpanCustom from 'src/components/ExpanCustom/ExpanCustom.vue'
import { lazyRules } from 'src/composables'

import { ref } from 'vue'



const donateBasketFlag = ref(false)
const donateValue = ref('')

const alternateDeliveryFlag = ref(false)
const alternateDeliveryValue = ref('')
const isFullScreen = ref<boolean>(false)

const columns = ref<QTableColumn[]>([
  {
    name: 'option',
    required: true,
    label: 'Option',
    align: 'left',
    field: 'option',
    sortable: true,
  },
  {
    name: 'showOnFrontEnd',
    required: true,
    label: 'Show on Front-End',
    align: 'center',
    field: 'showOnFrontEnd',
  },
  {
    name: 'saveResponses',
    required: true,
    label: 'Save Responses from Year to Year',
    align: 'center',
    field: 'saveResponses',
  },
  {
    name: 'displayOrder',
    required: true,
    label: 'Display Order',
    align: 'center',
    field: 'displayOrder',
    sortable: true,
  },
  {
    name: 'edit',
    required: true,
    label: '',
    field: 'id',
  },
])

const rows = ref([
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
  {
    option: 'Frozen Yogurt',
    showOnFrontEnd: true,
    saveResponses: true,
    displayOrder: 2,
    id: 1,
  },
])



</script>

<style scoped lang="scss">
@import './ProfileOptions';
</style>
