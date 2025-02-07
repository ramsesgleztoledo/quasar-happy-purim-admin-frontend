<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Print & Labels</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p>In this section, you can <b> download </b> reports for printing.</p>
    </div>
  </div>
  <div class="separator-bottom q-mb-md"></div>
  <div class="row q-mb-sm" v-for="(item, index) in labels" :key="index">
    <div class="col-12">
      <q-item class="PrintLabelsPage-item">
        <q-item-section avatar>
          <b> {{ index + 1 }} </b>
        </q-item-section>
        <q-item-section
          ><q-item-label>{{ item.title }} </q-item-label>
          <q-item-label caption> {{ item.caption }} </q-item-label></q-item-section
        >
        <q-item-section side>
          <q-btn color="primary" flat icon="download" label="download" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const labels = ref([
  {
    title: 'Order Sheet',
    caption: 'Printable order sheet document',
  },
  {
    title: 'Order Sheet (by Category)',
    caption: 'Printable order sheet document',
  },
  {
    title: 'Print Mailing Labels',
    caption: 'Compatible with Avery 5160',
  },
])
</script>

<style scoped lang="scss">
@import './PrintLabelsPage';
</style>
