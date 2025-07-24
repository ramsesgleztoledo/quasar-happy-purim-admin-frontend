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
        'item-width-300': !isMobile,
      }"
    >
      <q-select
        :class="{ 'item-width-300': !isMobile }"
        v-model="types"
        outlined
        multiple
        :options="$dStore.categories"
        label="Filter by categories"
        option-label="categoryName"
        option-value="categoryID"
        clearable
      />
    </div>
    <div
      class="q-mr-md q-mb-md"
      :class="{
        'col-12': isMobile,
        'item-width-300': !isMobile,
      }"
    >
      <q-select
        v-model="orderHistory"
        outlined
        multiple
        :options="ordersHistory"
        label="Filter by order history"
        option-label="label"
        option-value="value"
        clearable
      />
    </div>
    <div
      :class="{
        'col-12': isMobile,
        'item-width-300': !isMobile,
      }"
    >
      <q-input v-model="search" outlined label="Search" clearable>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="row q-mb-sm q-mt-sm">
    <div class="col-12">
      <div class="CreateOrderPage-options">
        <label><b> Options </b> </label>

        <!-- <div class="row">
          <q-checkbox  v-model="reciprocity" label="Reciprocity" />
        </div> -->
        <div class="row q-mb-sm q-mt-sm">
          <q-checkbox
            @update:model-value="onHidePaidOrdersUpdated"
            v-model="hidePaidOrders"
            label="Hide Paid Orders"
          />
        </div>
      </div>
      <div
        class="CreateOrderPage-send-to"
        v-if="memberOrderState.orgSettings?.displayPromotions && promotions.length"
      >
        <label>
          <b>Promotions</b>
        </label>
        <div v-for="item in promotions" :key="item.id" class="row">
          <q-checkbox
            :disable="checkDisabled(item).value"
            @update:model-value="(value) => onAddOrRemovePromotion(value, item)"
            v-model="item.selected"
            :label="item.displayText"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <CreateOrderLegend />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="row table-white-container" :class="{ fullscreen: isFullScreen }">
        <div class="col-12">
          <div
            class="row"
            style="position: sticky; top: 0px; z-index: 1000; background-color: white"
          >
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
              <div class="row q-pa-sm" style="background-color: var(--happypurim)">
                <q-checkbox v-model="allSelected" />
                <h6 style="margin: 0px; align-items: center; display: flex">
                  Members ({{ memberOrderState.membersSelected.length }}/{{
                    memberOrderState.memberList.original.length
                  }})
                </h6>
              </div>
            </div>
          </div>
          <q-table
            card-class="bg-primary text-white"
            grid
            style="background-color: white"
            :style="{ maxHeight: isFullScreen ? '' : '800px' }"
            class="table-sticky-header-column-table"
            flat
            bordered
            ref="tableRef"
            :rows
            :columns="columns"
            row-key="id"
            selection="multiple"
            v-model:selected="$moStore.membersSelected"
            @selection="onSelectAll"
            :pagination="{
              rowsPerPage: 0,
            }"
          >
            <template v-slot:item="props">
              <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4">
                <q-card bordered>
                  <q-card-section
                    class="text-center"
                    style="min-height: 70px; padding: 0px; display: flex"
                  >
                    <RowStyle :row="props.row" />
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div class="row" style="align-items: center">
                      <q-checkbox
                        class="q-mr-sm"
                        v-if="!props.row.paid"
                        :disable="props.row.paid"
                        :model-value="props.selected"
                        @update:model-value="
                          (val, evt) => {
                            ;(Object as any)
                              .getOwnPropertyDescriptor(props, 'selected')
                              .set(val, evt)
                          }
                        "
                      />
                      <div class="text-overflow-ellipsis">
                        <b>
                          <q-tooltip>
                            {{
                              `${props.row.lastName}, ${props.row.firstName} ${props.row.sFirstName ? `& ${props.row.sFirstName}` : ''}`
                            }}
                          </q-tooltip>
                          {{
                            `${props.row.lastName}, ${props.row.firstName} ${props.row.sFirstName ? `& ${props.row.sFirstName}` : ''}`
                          }}
                        </b>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex justify-content-end">
                    <div>
                      <b> ${{ convertWithCommas(props.row.price || $moStore.getSPrice) }} </b>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertWithCommas } from 'src/helpers'
import { useUI } from 'src/modules/UI/composables'
import { computed, ref, watch } from 'vue'
import CreateOrderLegend from '../CreateOrderLegend/CreateOrderLegend.vue'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type {
  OrderMemberListInterface,
  OrderPromotionInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import type { StepOneCreateOrderInterface } from '../../interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { getMembersByPromotion } from 'src/modules/dashboard/helpers/getMembersByPromotion'
import { checkDisabledPromotionHelper } from '../../helpers/member-order-helpers'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import type { ShulCategoryInterface } from 'src/modules/dashboard/interfaces/category-interfaces'
import RowStyle from './components/RowStyle.vue'

const { isMobile } = useUI()
const {
  memberOrderState,
  setMemberListCopy,
  // addOrRemovePromotion
} = useMemberOrder()
const $moStore = useMemberOrderStore()
const $dStore = useDashboardStore()

const isFullScreen = ref(false)

const search = ref('')
const types = ref<ShulCategoryInterface[]>([])

const orderHistory = ref<{ value: number; label: string }[]>([])
const ordersHistory = ref([
  { value: 1, label: 'People I sent to last year' },
  { value: 2, label: 'People I reciprocated to last year' },
  { value: 3, label: 'People I received from last year' },
])

// const reciprocity = ref(false)
const hidePaidOrders = ref(false)

const columns = ref<QTableColumn<OrderMemberListInterface>[]>([
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'firstName',
    sortable: true,
    format: (name: string, row) =>
      `${row.lastName}, ${row.firstName} ${row.sLastName ? `& ${row.sLastName}, ${row.sFirstName}` : ''}`,
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: 'price',
    format: (amount: number) => `$${convertWithCommas(amount || $moStore.getSPrice)}`,
    sortable: true,
  },
])

const allSelected = computed({
  get() {
    const totalSelected = $moStore.membersSelected.length
    const totals = rows.value.filter((item) => !item.paid).length

    if (totalSelected && totalSelected < totals) return ''
    return totalSelected === totals
  },
  set(val: boolean) {
    toggleSelectAll(val)
  },
})

const toggleSelectAll = (selectAll: boolean) => {
  if (selectAll) {
    $moStore.membersSelected = [...rows.value.filter((item) => !item.paid)]
  } else {
    $moStore.membersSelected = []
  }
}

const rows = computed(() =>
  memberOrderState.value.memberList.copy.filter((item) => {
    const se = JSON.stringify(item)
      ?.toLowerCase()
      .includes((search.value || '').toLowerCase())
    if (!se) return false

    const orderHArray = orderHistory.value || []

    for (let i = 0; i < orderHArray.length; i++) {
      const key = orderHArray[i]!.value
      let valid = true
      switch (key) {
        case 1:
          if (!item.iSentLastYear) valid = false
          break
        case 2:
          if (item.reciprocal == 'No') valid = false
          break

        default:
          if (!item.sentToMeLastYear) valid = false
          break
      }
      if (!valid) return false
    }

    const typesArray = types.value || []

    for (let i = 0; i < typesArray.length; i++) {
      const cat = typesArray[i]!.categoryID
      if (!item.memberCategories.includes(`${cat}`)) return false
    }

    return true
  }),
)

// const rows = ref<OrderMemberListInterface[]>([])
// const selected = ref<OrderMemberListInterface[]>([])

const promotions = ref<OrderPromotionInterface[]>([])

watch(
  () => memberOrderState.value.memberList,
  () => {
    $moStore.membersSelected = memberOrderState.value.memberList.copy.filter(
      (member) => member.selected && !member.paid,
    )
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

// const tableRowStyleFn = (row: OrderMemberListInterface) => {
//   let color = ''

//   if (row.iSentLastYear) color = '#9acd32'
//   if (row.reciprocal === 'Yes') color = '#ffc702'
//   if (row.sentToMeLastYear) color = '#86ceeb'
//   if (row.paid) color = '#fa6666'

//   return `background-color: ${color}`
// }

const onSelectAll = () => {
  setTimeout(() => {
    $moStore.membersSelected = $moStore.membersSelected
      .filter((item) => !item.paid)
      .map((item) => ({ ...item, selected: true }))
  }, 200)
}

const onAddOrRemovePromotion = (value: boolean, item: OrderPromotionInterface) => {
  const list = getMembersByPromotion(item.joinCategories, memberOrderState.value.memberList.copy)

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
      item.joinCategories,
      $moStore.membersSelected,
      true,
    )
}

const onHidePaidOrdersUpdated = (value: boolean) => {
  setMemberListCopy([
    ...memberOrderState.value.memberList.original.filter((member) => (value ? !member.paid : true)),
  ])
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

const checkDisabled = (promotion: OrderPromotionInterface) =>
  computed(() => checkDisabledPromotionHelper(promotion, promotions.value))

defineExpose<StepOneCreateOrderInterface>({
  saveChanges,
})
</script>

<style scoped lang="scss"></style>
