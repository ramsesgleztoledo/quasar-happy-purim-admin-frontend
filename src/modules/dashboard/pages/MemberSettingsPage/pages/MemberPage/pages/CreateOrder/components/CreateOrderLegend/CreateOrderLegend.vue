<template>
  <div class="row q-g-sm ">
    <div class="q-pa-sm" style="display: flex">
      <div class="CreateOrderLegend-square" style="background-color: #9acd32"></div>
      <p>I <b>Sent</b> to Last Year</p>
    </div>

    <div class="q-pa-sm" style="display: flex">
      <div class="CreateOrderLegend-square" style="background-color: #ffc702"></div>
      <p>I <b>Reciprocated</b> to Last Year</p>
    </div>

    <div class="q-pa-sm" style="display: flex">
      <div class="CreateOrderLegend-square" style="background-color: #86ceeb"></div>
      <p>I <b>Received</b> from Last Year</p>
    </div>

    <div class="q-pa-sm" style="display: flex">
      <!-- <div class="CreateOrderLegend-square-red-check"></div> -->
      <div class="CreateOrderLegend-square" style="background-color: #fa6666"></div>
      <p>Orders Already Placed</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import './CreateOrderLegend.scss';
</style>
