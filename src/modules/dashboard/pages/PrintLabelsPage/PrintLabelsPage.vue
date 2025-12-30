<template>
  <div v-if="isReady">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Print & Labels</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
        <p>Download Order Sheets and Mailing Labels.</p>
      </div>
    </div>

    <div class="row q-mb-sm" v-for="item in labels" :key="item.id">
      <div class="col-12">
        <q-item class="PrintLabelsPage-item">
          <q-item-section
            ><q-item-label>{{ item.name }} </q-item-label>
            <q-item-label caption> {{ item.description }} </q-item-label></q-item-section
          >
          <q-item-section side>
            <q-btn
              @click="downloadNameLabels(item.id)"
              color="primary"
              flat
              icon="download"
              padding="none"
            />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { LabelOptionInterface } from '../../interfaces/label-ordersheet.interface'
import { useLabelsAndOrdersheet } from '../../composables/useLabelsAndOrdersheet'

const { getLabelOption, downloadNameLabels } = useLabelsAndOrdersheet()

const labels = ref<LabelOptionInterface[]>([])
const isReady = ref<boolean>(false)

onMounted(() => {
  getLabelOption().then((resp) => {
    labels.value = resp
    isReady.value = true
  })
})
</script>

<style scoped lang="scss">
@import './PrintLabelsPage';
</style>
