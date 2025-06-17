<template>
  <div style="width: 100%; height: 100%">
    <div class="basket-img-container">
      <i class="fa fa-search" aria-hidden="true"></i>

      <img
        :src="`https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0`"
        alt="this basket does not have image"
      />
    </div>

    <!-- <BasketDetailDialog
      v-if="showPrompt"
      @onClose="showPrompt = false"
      v-model:item="item"
      v-model:img="img"
    ></BasketDetailDialog> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.basket-img-container {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: 2px 2px 5px 2px #8f8c8c9e;
  margin-bottom: 6px;
  position: relative;
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
</style>
