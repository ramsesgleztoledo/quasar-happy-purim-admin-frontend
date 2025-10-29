<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <div class="row q-pa-sm justify-content-center">{{ item.description }}</div>
    <div class="row" style="flex: 1; width: 100%; height: 80%">
      <div class="col-12" style="width: 100%; height: 100%">
        <div class="basket-img-container">
          <!-- <i class="fa fa-search" aria-hidden="true"></i> -->

          <img
            v-if="item.shippingOptionsGUID || item.shippingOptionGuid"
            :src="`${imStartUrl + `${item.shippingOptionsGUID ? item.shippingOptionsGUID : item.shippingOptionsGUID}`}`"
            alt="Image not found ..."
          />
          <div v-else class="no-img-basket">No img</div>
        </div>
      </div>
    </div>
  </div>

  <!-- <BasketDetailDialog
      v-if="showPrompt"
      @onClose="showPrompt = false"
      v-model:item="item"
      v-model:img="img"
    ></BasketDetailDialog> -->
</template>

<script setup lang="ts">
import type { CustomShippingOptionInterface } from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { computed } from 'vue'

interface BasketImgInterface {
  item: CustomShippingOptionInterface
}
defineProps<BasketImgInterface>()

const imStartUrl = computed(() => process.env.CUSTOM_SHIPPING_BASKET_URL || '')
</script>

<style scoped lang="scss">
.basket-img-container {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: 2px 2px 5px 2px #8f8c8c9e;
  margin-bottom: 6px;
  position: relative;
  font-size: 25px;
  font-weight: 900;
}
i {
  position: absolute;
  right: 6px;
  top: 3px;
  font-size: 25px;
  color: #ff607f;
  cursor: pointer;
}
img {
  width: 100% !important;
  height: 100% !important;
  border-radius: 3px;
}

.no-img-basket {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: $happypurim;
  background-color: #8080806e;
}
</style>
