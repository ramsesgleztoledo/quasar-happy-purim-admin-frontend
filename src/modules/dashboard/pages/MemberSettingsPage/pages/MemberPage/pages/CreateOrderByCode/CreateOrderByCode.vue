<template>
  <div class="row">
    <div class="col-12 top-title-col">
      <p class="CreateOrderPage-new-order">New Order by Code</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 top-title-col">
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <q-icon name="person" size="large" class="q-mr-sm" />
      <p class="CreateOrderPage-title-3">
        {{ memberState.selectedMember?.lastName }}, {{ memberState.selectedMember?.firstName }}
        {{
          `${memberState.selectedMember?.spouseFirstName ? `& ${memberState.selectedMember?.spouseFirstName}` : ''}`
        }}
        -
        <b>{{ rows.length }} baskets</b>
      </p>
    </div>
  </div>

  <div style="display: flex; flex-direction: column; height: 90%">
    <div style="flex: 1">
      <div class="row q-mt-md">
        <q-input v-model="code" outlined label="Code Number" />
        <q-btn
          :disable="!code"
          class="q-ml-sm"
          style="background: var(--happypurim); color: white"
          label="add order"
          @click="onAdd"
        />
      </div>

      <div class="row">
        <div class="col-12 q-pa-lg" style="height: 460px">
          <q-table
            :pagination="{
              rowsPerPage: 0,
            }"
            style="height: 100%"
            class="table-sticky-header-column-table"
            flat
            bordered
            ref="tableRef"
            :rows="rows"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top="props">
              <div class="q-table__title" style="padding: 2px">Orders</div>

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

            <template v-slot:body-cell-delete="props">
              <q-td style="display: flex; justify-content: flex-end">
                <q-btn
                  color="red"
                  icon="delete"
                  flat
                  dense
                  @click="
                    () => {
                      id = props.row.id
                      deleteOrderDialogFlag = true
                    }
                  "
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <div class="row q-mt-lg cancel-save-btn-container">
      <div class="col-12">
        <q-btn
          outline
          label="CANCEL"
          class="q-mr-sm"
          style="color: #990000; border-color: #990000"
          @click="cancelOrderDialogFlag = true"
        />

        <q-btn
          class="q-mr-sm"
          style="background: var(--happypurim); color: white"
          label="Continue"
          :to="{
            name: 'MemberLayout-CreateOrderPage',
            params: {
              memberId,
            },
          }"
        />
      </div>
    </div>
  </div>
  <!--=============================== Dialogs =============================-->
  <!--* confirm delete --->
  <DialogAlert
    @on-finish="
      async (value) => {
        if (value) {
          await onDeleteOrdersByCode()
        }
        id = undefined
      }
    "
    msg="Are you sure you want to delete this row?"
    v-model="deleteOrderDialogFlag"
  />
  <!--* confirm cancel --->
  <DialogAlert
    @on-finish="
      (value) => {
        if (value)
          $router.push({
            name: 'MemberLayout-MemberPage',
          })
      }
    "
    msg="Are you sure you want to go back?"
    v-model="cancelOrderDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
// import { convertWithCommas } from 'src/helpers/convertWithCommas'
import { computed, onMounted, ref } from 'vue'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { useCreateOrderByCode } from 'src/modules/dashboard/composables/useCreateOrderByCode'
import type { ReceiverBasketsInCartInterface } from 'src/modules/dashboard/interfaces/create-order-by-code.interface'
import { useMemberStore } from 'src/modules/dashboard/store/memberStore/memberStore'

const { memberState } = useMember()
const { getOrdersByCode, addOrdersByCode, deleteOrdersByCode } = useCreateOrderByCode()
const $mStore = useMemberStore()

const memberId = computed(() => $mStore.selectedMember?.memberId || 0)

const code = ref('')
const id = ref<number | undefined>(undefined)

const deleteOrderDialogFlag = ref(false)
const cancelOrderDialogFlag = ref(false)

const columns = ref<QTableColumn[]>([
  {
    name: 'fullName',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: 'fullName',
    sortable: true,
  },
  // {
  //   name: 'amount',
  //   required: true,
  //   label: 'Amount',
  //   align: 'left',
  //   field: 'amount',
  //   format: (amount: number) => `$${convertWithCommas(amount)}`,
  //   sortable: true,
  // },
  {
    name: 'delete',
    required: true,
    label: '',
    align: 'left',
    field: 'id',
  },
])
const rows = ref<ReceiverBasketsInCartInterface[]>([])
// const selected = ref([])

const onAdd = async () => {
  const resp = await addOrdersByCode(code.value)
  if (!resp) return
  code.value = ''
  await getInitialData()
}

const getInitialData = async () => {
  const resp = await getOrdersByCode()
  rows.value = resp ? resp : []
}

const onDeleteOrdersByCode = async () => {
  const resp = await deleteOrdersByCode(id.value!)
  if (!resp) return
  rows.value = rows.value.filter((row) => row.id !== id.value)
}

onMounted(() => {
  getInitialData().catch(console.error)
})
</script>

<style scoped lang="scss" src="./CreateOrderByCode.scss" />
