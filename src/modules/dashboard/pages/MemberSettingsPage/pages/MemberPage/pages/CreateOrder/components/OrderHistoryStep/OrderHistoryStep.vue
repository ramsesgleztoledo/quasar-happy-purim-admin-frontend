<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <p class="last-year-p">
          <strong>Last Year's Order History Page: </strong>
        </p>
        <p class="l-y-sub">
          This page shows the people you sent to, received from, and/or reciprocated to last year
        </p>
        <p class="last-year-p r-wrap">
          <span class="review">PLEASE REVIEW CAREFULLY </span>
          <span class="review-1">
            For your convenience, they have all been added to your shopping cart. You can easily
            remove any or all names by un-checking the boxes below.</span
          >
        </p>
      </div>
      <div class="col-xs-12 col-sm-12">
        <p style="text-align: left; font-weight: 600">
          *Please be aware that names on your order history may be part of package deals
        </p>
      </div>
      <!-- /.filters -->

      <!-- /.section__note -->
    </div>
    <div class="row">
      <div class="col-12">
        <CreateOrderLegend />
      </div>
    </div>

    <div class="row q-mt-sm">
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
                    Members ({{ $moStore.$state.membersSelected.length }}/{{
                      $moStore.membersLastYear.length
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
              :rows="$moStore.membersLastYear"
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
                            ;(Object as any)
                              .getOwnPropertyDescriptor(props, 'selected')
                              .set(val, evt)
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
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { convertWithCommas } from 'src/helpers'
import type { OrderMemberListInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed, ref } from 'vue'
import CreateOrderLegend from '../CreateOrderLegend/CreateOrderLegend.vue'
import RowStyle from '../StepOneCreateOrder/components/RowStyle.vue'

const $moStore = useMemberOrderStore()

const isFullScreen = ref(false)
const alreadyPaidModel = ref(true)

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
    format: (amount: number) =>
      `$${convertWithCommas(amount || $moStore.getSPrice, {
        dontAllowZero: true,
      })}`,
    sortable: true,
  },
])

const allSelected = computed({
  get() {
    const totalSelected = $moStore.membersSelected.length
    const totals = $moStore.membersLastYear.filter((item) => !item.paid).length

    if (totalSelected && totalSelected < totals) return ''
    return totalSelected === totals
  },
  set(val: boolean) {
    toggleSelectAll(val)
  },
})
const toggleSelectAll = (selectAll: boolean) => {
  if (selectAll) {
    $moStore.membersSelected = [...$moStore.membersLastYear.filter((item) => !item.paid)]
  } else {
    $moStore.membersSelected = []
  }
}

const onSelectAll = () => {
  setTimeout(() => {
    $moStore.membersSelected = $moStore.membersSelected
      .filter((item) => !item.paid)
      .map((item) => ({ ...item, selected: true }))
  }, 200)
}
</script>

<style scoped lang="scss" src="./OrderHistoryStep.scss" />
