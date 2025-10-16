<template>
  <div class="row RowStyle-container" style="height: 100%">
    <div
      v-if="row.iSentLastYear"
      class="col-12 RowStyle-col"
      style="background-color: #9acd32"
    ></div>
    <div
      v-if="row.reciprocal === 'Yes'"
      class="col-12 RowStyle-col"
      style="background-color: #ffc702"
    ></div>
    <div
      v-if="row.sentToMeLastYear"
      class="col-12 RowStyle-col"
      style="background-color: #86ceeb"
    ></div>
    <!-- <div v-if="row.paid" class="col-12 RowStyle-col" style="background-color: #fa6666"></div> -->
  </div>
</template>

<script setup lang="ts">
import type { OrderMemberListInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'

interface RowStylePropsInterface {
  row: OrderMemberListInterface
}

defineProps<RowStylePropsInterface>()
</script>

<style scoped lang="scss">
.RowStyle-container {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}
.RowStyle-col {
  // flex: 1;
  height: 100%;
  width: 6px;
}
</style>
