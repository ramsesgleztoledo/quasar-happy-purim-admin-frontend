<template>
  <div class="row q-mt-sm q-mb-sm">
    <div class="col-12">
      <p>
        <b>Note:</b> Your own name will not appear on this list because you can not send to
        yourself.
      </p>
    </div>
  </div>
  <div class="row">
    <div
      class="q-mr-md q-mb-md"
      :class="{
        'col-12': isMobile,
        'item-width-200': !isMobile,
      }"
    >
      <q-select
        v-model="types"
        outlined
        :options="typesOptions"
        label="Show"
        option-label="label"
        option-value="value"
      />
    </div>
    <div
      :class="{
        'col-12': isMobile,
        'item-width-200': !isMobile,
      }"
    >
      <q-input disable v-model="search" outlined label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="row">
    <div
      class="q-pa-lg"
      :class="{
        'col-3': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="CreateOrderPage-options">
        <label><b> Options </b> </label>
        <div v-for="(item, index) in options" :key="index" class="row">
          <q-checkbox v-model="item.value" :label="item.label" />
        </div>
      </div>
      <div class="CreateOrderPage-send-to">
        <label>
          <b>Promotions</b>
        </label>
        <div v-for="item in memberOrderState.promotions" :key="item.id" class="row">
          <q-checkbox
            @update:model-value="(value) => addOrRemovePromotion(value, item)"
            v-model="item.selected"
            :label="item.displayText"
          />
        </div>
      </div>
    </div>
    <div
      class="q-pa-lg"
      :class="{
        'col-3': !isMobile,
        'col-12': isMobile,
      }"
    >
      <CreateOrderLegend />
    </div>
    <div
      class="q-pa-lg"
      style="height: 460px"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-table
        style="height: 100%"
        class="table-sticky-header-column-table"
        flat
        bordered
        ref="tableRef"
        :rows="memberOrderState.memberList"
        :columns="columns"
        row-key="id"
        selection="multiple"
        v-model:selected="selected"
        :table-row-style-fn="rowStyleFn"
      >
        <template v-slot:top="props">
          <div class="q-table__title" style="padding: 2px">People</div>

          <q-space />

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
        <template v-slot:header-selection="scope">
          <q-checkbox v-model="scope.selected" />
        </template>

        <template v-slot:body-selection="scope">
          <q-checkbox
            :model-value="scope.selected"
            @update:model-value="
              (val, evt) => {
                ;(Object as any).getOwnPropertyDescriptor(scope, 'selected').set(val, evt)
              }
            "
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertWithCommas } from 'src/helpers'
import { useUI } from 'src/modules/UI/composables'
import { ref, watch } from 'vue'
import CreateOrderLegend from '../CreateOrderLegend/CreateOrderLegend.vue'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type { OrderMemberListInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'

const { isMobile } = useUI()
const { memberOrderState, addOrRemovePromotion } = useMemberOrder()

const search = ref('')
const types = ref({ value: 0, label: 'Show All' })
const typesOptions = ref([{ value: 0, label: 'Show All' }])

const options = ref([
  { value: false, label: 'Reciprocity' },
  { value: false, label: 'Hide Paid Orders' },
])

const columns = ref<QTableColumn[]>([
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'firstName',
    sortable: true,
    format: (name: string, row) => `${row?.lastName}, ${name}`,
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: 'price',
    format: (amount: number) => `$${convertWithCommas(amount)}`,
    sortable: true,
  },
])

const selected = ref<OrderMemberListInterface[]>([])

watch(
  memberOrderState.value.memberList,
  () => {
    selected.value = memberOrderState.value.memberList.filter((member) => member.selected)
  },
  {
    immediate: true,
  },
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowStyleFn = (row: any) => {
  console.log('aplying styles')

  return row.calories % 2 === 0 ? 'color:#ccc' : 'color:#fff'
}
</script>

<style scoped lang="scss"></style>
