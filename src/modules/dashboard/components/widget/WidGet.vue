<template>
  <div class="widget-container-main">
    <div class="widget-container" :style="{ backgroundColor }">
      <div class="row">
        <div
          class=" widget-icon-container-col"
          :class="{
            'col-4': !isMobile,
            'col-12': isMobile,
          }"
        >
          <div class="widget-icon-container" :style="{ backgroundColor: iconColor }">
            <q-icon :name="icon" />
          </div>
        </div>
        <div  :class="{
            'col-8': !isMobile,
            'col-12': isMobile,
          }">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()
interface WidGetPropsInterface {
  icon: string
  firstP?: string
  secondP?: string
  thirdP?: string
  iconColor?: string
  backgroundColor?: string
}

withDefaults(defineProps<WidGetPropsInterface>(), {
  icon: 'discount',
  backgroundColor: '#dcfce7',
  iconColor: '#3cd856',
})
</script>

<style scoped lang="scss">
@import './WidGet.scss';
</style>
