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
    <div class="q-pa-lg col-12">
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
                <div class="col-12"></div>
                <h6 style="margin: 0px">
                  Members ({{ memberOrderState.membersSelected.length }}/{{
                    memberOrderState.memberList.copy.length
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
            :rows="memberOrderState.memberList.copy"
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
            <!-- <template v-slot:top="props">
          <div class="q-table__title" style="padding: 2px">
            <b> Members: </b>
          </div>

          <q-space />

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template> -->

            <!-- <template v-slot:header-selection="scope">
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
        </template> -->
            <template v-slot:item="props">
              <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4">
                <q-card flat bordered>
                  <q-card-section
                    class="text-center"
                    style="min-height: 70px"
                    :style="tableRowStyleFn(props.row)"
                  >
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
                      <div>
                        <b>
                          {{
                            `${props.row.lastName}, ${props.row.firstName} ${props.row.sLastName ? `& ${props.row.sLastName}, ${props.row.sFirstName}` : ''}`
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

const { isMobile } = useUI()
const {
  memberOrderState,
  setMemberListCopy,
  // addOrRemovePromotion
} = useMemberOrder()
const $moStore = useMemberOrderStore()

const isFullScreen = ref(false)

const search = ref('')
const types = ref({ value: 0, label: 'Show All' })
const typesOptions = ref([{ value: 0, label: 'Show All' }])

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
