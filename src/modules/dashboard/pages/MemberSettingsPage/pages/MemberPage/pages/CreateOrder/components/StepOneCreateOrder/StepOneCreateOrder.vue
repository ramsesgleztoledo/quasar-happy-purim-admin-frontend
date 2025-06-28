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

        <!-- <div class="row">
          <q-checkbox  v-model="reciprocity" label="Reciprocity" />
        </div> -->
        <div class="row">
          <q-checkbox
            @update:model-value="onHidePaidOrdersUpdated"
            v-model="hidePaidOrders"
            label="Hide Paid Orders"
          />
        </div>
      </div>
      <div class="CreateOrderPage-send-to" v-if="memberOrderState.orgSettings?.displayPromotions">
        <label>
          <b>Promotions</b>
        </label>
        <div v-for="item in promotions" :key="item.id" class="row">
          <q-checkbox
            :disable="checkDisabledPromotion(item)"
            @update:model-value="(value) => onAddOrRemovePromotion(value, item)"
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
        :rows="rows"
        :columns="columns"
        row-key="id"
        selection="multiple"
        v-model:selected="$moStore.membersSelected"
        :tableRowStyleFn="tableRowStyleFn"
        @selection="onSelectAll"
        :pagination="{
          rowsPerPage: 0,
        }"
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
            v-if="!scope.row.paid"
            :disable="scope.row.paid"
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
import type {
  OrderMemberListInterface,
  OrderPromotionInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import type { StepOneCreateOrderInterface } from '../../interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { getMembersByPromotion } from 'src/modules/dashboard/helpers/getMembersByPromotion'

const { isMobile } = useUI()
const {
  memberOrderState,
  // addOrRemovePromotion
} = useMemberOrder()
const $moStore = useMemberOrderStore()

const search = ref('')
const types = ref({ value: 0, label: 'Show All' })
const typesOptions = ref([{ value: 0, label: 'Show All' }])

// const reciprocity = ref(false)
const hidePaidOrders = ref(false)

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

const rows = ref<OrderMemberListInterface[]>([])
// const selected = ref<OrderMemberListInterface[]>([])

const promotions = ref<OrderPromotionInterface[]>([])

watch(
  () => memberOrderState.value.memberList,
  () => {
    rows.value = memberOrderState.value.memberList.map((member) => ({ ...member }))
    $moStore.membersSelected = rows.value.filter((member) => member.selected && !member.paid)
  },
  {
    immediate: true,
  },
)
watch(
  () => memberOrderState.value.promotions,
  () => {
    promotions.value = memberOrderState.value.promotions.map((promotion) => ({ ...promotion }))
  },
  {
    immediate: true,
  },
)

const tableRowStyleFn = (row: OrderMemberListInterface) => {
  let color = ''

  if (row.iSentLastYear) color = '#9acd32'
  if (row.reciprocal === 'Yes') color = '#ffc702'
  if (row.sentToMeLastYear) color = '#86ceeb'
  if (row.paid) color = '#fa6666'

  return `background-color: ${color}`
}

const onSelectAll = () => {
  setTimeout(() => {
    $moStore.membersSelected = $moStore.membersSelected
      .filter((item) => !item.paid)
      .map((item) => ({ ...item, selected: true }))
  }, 200)
}

const onAddOrRemovePromotion = (value: boolean, item: OrderPromotionInterface) => {
  const list = getMembersByPromotion(item.categories, rows.value)

  const selectedId = new Set($moStore.membersSelected.map((member) => member.id))

  if (value) {
    for (const item of list) {
      if (!selectedId.has(item.id)) {
        $moStore.membersSelected.push(item)
        selectedId.add(item.id)
      }
    }
  } else
    $moStore.membersSelected = getMembersByPromotion(
      item.categories,
      $moStore.membersSelected,
      true,
    )
}

const onHidePaidOrdersUpdated = (value: boolean) => {
  rows.value = [
    ...memberOrderState.value.memberList.filter((member) => (value ? !member.paid : true)),
  ]
}

const getPromotionChanges = () => {
  const promotionChanges: OrderPromotionInterface[] = []
  const promotionState = memberOrderState.value.promotions
  for (let i = 0; i < promotionState.length; i++) {
    if (promotionState[i]?.selected !== promotions.value[i]?.selected) {
      promotionChanges.push(promotions.value[i]!)
    }
  }
  return promotionChanges
}

// const getMembers = () => {
//   const membersState = memberOrderState.value.memberList.filter((member) => !member.paid)

//   const membersAdd: OrderMemberListInterface[] = []
//   const membersDelete: OrderMemberListInterface[] = []

//   for (let i = 0; i < membersState.length; i++) {
//     const found = !!$moStore.membersSelected.find((member) => member.id === membersState[i]!.id)

//     if (membersState[i]!.selected) if (!found) membersDelete.push(membersState[i]!)

//     if (!membersState[i]!.selected) if (found) membersAdd.push(membersState[i]!)
//   }
//   return { membersAdd, membersDelete }
// }

const saveChanges = () => {
  const promotions = getPromotionChanges()
  return {
    promotions,
    membersAdd: $moStore.membersSelected,
  }
}

const checkDisabledPromotion = (promotion: OrderPromotionInterface) => {
  const found = promotions.value.find((pro) => {
    const same = pro.id !== promotion.id && !!pro.selected

    const proCat = pro.categories.split(',') || []
    const promotionCat = promotion.categories.split(',') || []
    const include = promotionCat.some((item) => proCat.includes(item))
    return same && !include
  })

  return !!found
}

defineExpose<StepOneCreateOrderInterface>({
  saveChanges,
})
</script>

<style scoped lang="scss"></style>
