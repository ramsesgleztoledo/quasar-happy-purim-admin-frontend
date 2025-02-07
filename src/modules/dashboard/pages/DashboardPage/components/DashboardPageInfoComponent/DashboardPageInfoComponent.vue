<template>
  <div class="row">
    <div class="col-12" v-for="(info, index) in infos" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label>
            <b> {{ info.text }} </b>
          </q-item-label>
          <q-item-label caption>{{ info.caption }}</q-item-label>
        </q-item-section>
        <q-item-section class="DashboardPageInfoComponent-number">
          <q-item-label>
            <p :style="{ color: info.color }">{{ info.number }}</p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
const infos = [
  {
    text: 'Total Funds Raised',
    caption: 'Global',
    number: '$84,138.33',
    color: 'var(--c-color1)',
  },
  {
    text: 'Charitable Contributions',
    caption: 'Global',
    number: '$35,037.75',
    color: 'var(--c-color2)',
  },
  {
    text: 'Total Reciprocity',
    caption: 'Global',
    number: ' $120.00',
    color: 'var(--c-color3)',
  },
]
</script>

<style scoped lang="scss">
@import './DashboardPageInfoComponent.scss';
</style>
