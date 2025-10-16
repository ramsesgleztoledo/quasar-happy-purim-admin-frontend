<template>
  <div class="row q-g-sm">
    <div class="q-pa-sm CreateOrderLegend-container">
      <div class="CreateOrderLegend-square" style="background-color: #9acd32"></div>
      <p>I <b>Sent</b> to Last Year</p>
    </div>

    <div class="q-pa-sm CreateOrderLegend-container" CreateOrderLegend-container>
      <div class="CreateOrderLegend-square" style="background-color: #ffc702"></div>
      <p>I <b>Reciprocated</b> to Last Year</p>
    </div>

    <div class="q-pa-sm CreateOrderLegend-container" CreateOrderLegend-container>
      <div class="CreateOrderLegend-square" style="background-color: #86ceeb"></div>
      <p>I <b>Received</b> from Last Year</p>
    </div>

    <div class="q-pa-sm CreateOrderLegend-container">
      <!-- <div class="CreateOrderLegend-square-red-check"></div> -->
      <q-checkbox disable v-model="paid" label="Orders Already Placed" />
      <!-- <div class="CreateOrderLegend-square" style="background-color: #fa6666"></div>
      <p>Orders Already Placed</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paid = ref(true)
</script>

<style scoped lang="scss">
@import './CreateOrderLegend.scss';
</style>
