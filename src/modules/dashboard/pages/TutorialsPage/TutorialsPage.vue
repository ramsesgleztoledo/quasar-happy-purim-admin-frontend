<template>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Tutorials</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <div class="row justify-content-space-between q-mb-sm">
    <q-input outlined v-model="searchText" label="Search" clearable>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div class="row">
    <div
      class="col-12 col-sm-4 col-md-3 col-lg-3 q-pr-lg q-mb-lg TutorialsPage-col"
      v-for="tutorial in tutorials"
      :key="tutorial.name"
      :style="{ display: showVideo(tutorial.name).value ? '' : 'none' }"
    >
      <div class="TutorialsPage-video-container">
        <div class="row TutorialsPage-title">
          {{ tutorial.name }}
        </div>

        <q-video :src="tutorial.url" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { tutorialVideos } from '../../data/tutorialVideos'

const tutorials = ref(tutorialVideos)
const searchText = ref('')
const showVideo = (name: string) =>
  computed(() => name.toLowerCase().includes((searchText.value || '').toLowerCase()))
</script>

<style scoped lang="scss" src="./TutorialsPage.scss" />
