<template>
  <div class="widget-container-main">
    <div class="widget-container" :style="{ backgroundColor }">
      <div class="row">
        <div class="col-12">
          <div class="widget-icon-container" :style="{ backgroundColor: iconColor }">
            <q-icon :name="icon" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="widget-first-p">{{ firstP }}</p>
        </div>
        <div class="col-12">
          <p class="widget-second-p">{{ secondP }}</p>
        </div>
        <div class="col-12">
          <p class="widget-third-p">{{ thirdP }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WidGetPropsInterface {
  icon: string
  firstP?: string
  secondP?: string
  thirdP?: string
  iconColor?: string
  backgroundColor?: string
}

defineProps<WidGetPropsInterface>()
</script>

<style scoped lang="scss">
@import './WidGet.scss';
</style>
