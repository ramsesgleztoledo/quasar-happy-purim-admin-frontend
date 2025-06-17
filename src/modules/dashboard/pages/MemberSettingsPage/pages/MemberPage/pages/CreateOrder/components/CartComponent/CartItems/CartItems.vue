<template>
  <div class="row CartItems-headers q-pa-sm q-mb-sm">
    <div class="col-2">
      <b> Qty </b>
    </div>
    <div class="col-5">
      <b> Description </b>
    </div>
    <div class="col-3">
      <b> Description </b>
    </div>

    <div class="col-2"></div>
  </div>
  <div class="CartItems-container">
    <div class="row q-pa-sm" v-for="(item, i) in [1, 1, 1, 1, 1, 1]" :key="i">
      <div class="col-12">
        <div class="row">
          <div class="col-2">
            <div class="CartItems-text">1</div>
          </div>
          <div class="col-5">
            <div class="CartItems-text">Mishloach Manot to Members</div>
          </div>
          <div class="col-3">
            <div class="CartItems-text">
              <b> ${{ convertWithCommas(100) }} </b>
            </div>
          </div>

          <div class="col-2">
            <div class="row">
              <q-icon class="q-mr-md CartItems-icon" name="visibility" style="color: #448aff" />
              <q-icon class="CartItems-icon" name="close" style="color: red" />
            </div>
          </div>
        </div>
        <q-separator />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
</script>

<style scoped lang="scss">
@import './CartItems.scss';
</style>
