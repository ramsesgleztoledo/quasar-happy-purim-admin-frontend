<template>
  <q-expansion-item
    icon="person"
    label="View Individual Selections (1)"
    default-opened
    header-class="CartBaskets-headers-container"
  >
    <q-card>
      <q-card-section>
        <div class="CartBaskets-baskets-container">
          <div
            v-for="(item, i) in [1, 1, 1, 1, 1]"
            :key="i"
            class="CartBaskets-basket-container q-mb-md"
            style="font-size: 12px"
          >
            <div class="row">
              <div class="col-9">
                <div class="mini-text">Cohen Max</div>
                <b> ${{ convertWithCommas(100) }} </b>
              </div>
              <div class="col-3">
                <q-icon class="cursor-pointer" name="close" style="color: red" />
              </div>
            </div>
            <q-separator class="q-mb-sm" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
</script>

<style scoped lang="scss">
@import './CartIndividualSelection.scss';
</style>
