<template>
  <q-expansion-item
    icon="shopping_basket"
    label="Gift Baskets to be Shipped (2)"
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
          >
            <div class="row q-pa-sm" style="background-color: #ffdfc3">
              <div class="col-4">Link Nintendo</div>
              <div class="col-5">Regular Coffee Basket ($30)</div>
              <div class="col-3">
                <q-icon class="q-mr-md cursor-pointer" name="edit" style="color: #ff7600" />
                <q-icon class="cursor-pointer" name="close" style="color: red" />
              </div>
            </div>
            <q-separator class="q-mb-sm" />
            <div class="row">
              <div class="col-12">
                <div class="mini-text">Message:</div>
                <div class="mini-text">happy purim all</div>
              </div>
            </div>
            <q-separator class="q-mb-sm" />
            <div class="row">
              <div class="col-12">
                <div class="mini-text">Address:</div>
                <div class="mini-text">4544 Alton Road string,Miami Beach, FL 33140</div>
              </div>
            </div>
            <q-separator class="q-mb-sm" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import './CartBaskets.scss';
</style>
