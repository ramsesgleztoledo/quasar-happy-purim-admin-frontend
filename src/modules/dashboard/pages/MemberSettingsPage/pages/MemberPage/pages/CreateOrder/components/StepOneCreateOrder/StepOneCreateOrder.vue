<template>
  <div class="row q-mt-sm q-mb-sm">
    <div class="col-12">
      <p>
        <b>Note:</b> Your own name will not appear on this list because you cannot send to yourself.
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
      <q-input v-model="search" outlined label="Search" clearable>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div
      class="q-mr-md q-mb-md"
      :class="{
        'col-12': isMobile,
        'item-width-300': !isMobile,
      }"
    >
      <q-select
        popup-content-class="q-menu-300"
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
      v-if="$dStore.categories.length"
      class="q-mr-md q-mb-md"
      :class="{
        'col-12': isMobile,
        'item-width-300': !isMobile,
      }"
    >
      <q-select
        popup-content-class="q-menu-300"
        :class="{ 'item-width-300': !isMobile }"
        v-model="types"
        outlined
        :options="$dStore.categories"
        label="Filter by categories"
        option-label="categoryName"
        option-value="categoryID"
        clearable
        menu-anchor="bottom left"
        menu-self="top left"
        :use-input="false"
        key="categoryID"
      />
    </div>
  </div>

  <div class="row q-mb-sm q-mt-sm">
    <div class="col-12">
      <div class="CreateOrderPage-options">
        <label><b> Options: </b> </label>

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
        <div class="row">
          <label>
            <b>Promotions: </b>
          </label>
        </div>
        <div class="row">
          <q-btn
            class="q-mr-sm q-mt-sm"
            style="background: var(--happypurim); color: white"
            label="Promotions"
            @click="promotionsDialogFlag = true"
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
              <div
                class="row q-pa-sm justify-content-space-between"
                style="background-color: var(--happypurim)"
              >
                <q-checkbox v-model="allSelected" label="Check/Uncheck All" />
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
              <div class="q-pa-sm col-xs-12 col-sm-4 col-md-2">
                <div class="card-person-container">
                  <div class="row row-member-container">
                    <div style="width: 19px; height: 48px">
                      <RowStyle :row="props.row" />
                    </div>
                    <q-checkbox
                      v-if="!props.row.paid"
                      class="q-mr-sm checkbox-member-container"
                      v-model="props.selected"
                      @update:model-value="
                        (val, evt) => {
                          ;(Object as any).getOwnPropertyDescriptor(props, 'selected').set(val, evt)
                        }
                      "
                    >
                      <b class="text-overflow-ellipsis b-member-container">
                        <q-tooltip>
                          {{
                            `${props.row.lastName} ${props.row.firstName ? `, ${props.row.firstName}` : ``} ${props.row.sFirstName ? `& ${props.row.sFirstName}` : ''}`
                          }}
                        </q-tooltip>
                        {{
                          `${props.row.lastName} ${props.row.firstName ? `, ${props.row.firstName}` : ``} ${props.row.sFirstName ? `& ${props.row.sFirstName}` : ''}`
                        }}
                      </b>
                    </q-checkbox>
                    <q-checkbox
                      v-else
                      class="q-mr-sm checkbox-member-container"
                      disable
                      v-model="alreadyPaidModel"
                    >
                      <b class="text-overflow-ellipsis b-member-container">
                        <q-tooltip>
                          {{
                            `${props.row.lastName} ${props.row.firstName ? `, ${props.row.firstName}` : ``} ${props.row.sFirstName ? `& ${props.row.sFirstName}` : ''}`
                          }}
                        </q-tooltip>
                        {{
                          `${props.row.lastName} ${props.row.firstName ? `, ${props.row.firstName}` : ``} ${props.row.sFirstName ? `& ${props.row.sFirstName}` : ''}`
                        }}
                      </b>
                    </q-checkbox>
                  </div>
                </div>
              </div>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>

  <!--=============================== promotions dialog =============================-->

  <q-dialog v-model="promotionsDialogFlag">
    <q-card :style="{ minWidth: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Promotions</p>
        </div>
      </div>
      <q-card-section class="row items-center">
        <div style="max-height: 500px; overflow-y: auto; width: 100%">
          <div v-for="item in promotions" :key="item.id" class="row">
            <q-checkbox
              :disable="checkDisabled(item).value"
              @update:model-value="(value) => onAddOrRemovePromotion(value, item)"
              v-model="item.selected"
              :label="item.displayText"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--=========================== END OF SECTION ===========================-->
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

const { isMobile, showLoading, stopLoading } = useUI()
const {
  memberOrderState,
  setMemberListCopy,
  // addOrRemovePromotion
} = useMemberOrder()
const $moStore = useMemberOrderStore()
const $dStore = useDashboardStore()

const promotionsDialogFlag = ref(false)
const isFullScreen = ref(false)
const alreadyPaidModel = ref(true)

const search = ref('')
const types = ref<ShulCategoryInterface | undefined>(undefined)

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
    const se =
      `${item.lastName}, ${item.firstName} ${item.sFirstName ? `& ${item.sFirstName}` : ''}`.toLowerCase()

    if (!se.includes((search.value || '').toLowerCase())) return false

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

    const typeArray = types.value || undefined

    if (!typeArray) return true

    if (!item.memberCategories.includes(`${typeArray?.categoryID}`)) return false

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
  showLoading()
  const isAll = item.categories.toLowerCase().includes('all')

  if (isAll)
    promotions.value = promotions.value.map((pro) => {
      if (pro.id == item.id) return pro

      return {
        ...pro,
        selected: false,
      }
    })

  const members = memberOrderState.value.memberList.copy

  const list = getMembersByPromotion(item, members, promotions.value)

  const selectedId = new Set($moStore.membersSelected.map((member) => member.id))

  if (value) {
    for (const item of list) {
      if (!selectedId.has(item.id)) {
        $moStore.membersSelected.push(item)
        selectedId.add(item.id)
      }
    }
  } else {
    $moStore.membersSelected = getMembersByPromotion(
      item,
      $moStore.membersSelected,
      promotions.value,
      true,
    )
  }
  stopLoading()
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

// const memberPriceToShow = (price: number, sPrice: number) => computed(() => price || sPrice || 0)
</script>

<style scoped lang="scss" src="./StepOneCreateOrder.scss" />
