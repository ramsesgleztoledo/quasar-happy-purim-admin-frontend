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
      v-for="tutorial in filteredTutorials"
      :key="tutorial.name"
    >
      <div class="TutorialsPage-video-container">
        <div class="row TutorialsPage-title">
          {{ tutorial.name }}
        </div>
        <div style="position: relative; height: 100%">
          <video
            :src="tutorial.url"
            controls
            preload="metadata"
            style="width: 100%; height: 100%; position: relative; z-index: 1"
          ></video>
          <q-inner-loading :showing="true" style="position: absolute">
            <q-spinner size="50px" />
          </q-inner-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTutorialService } from '../../services/tutorials.service'
import type { TutorialInterface } from '../../interfaces/tutorials.interface'
const tutorialService = useTutorialService()
const tutorials = ref<TutorialInterface[]>([])
const searchText = ref('')

const filteredTutorials = computed<TutorialInterface[]>(() =>
  tutorials.value.filter((tutorial) =>
    tutorial.name.toLowerCase().includes((searchText.value || '').toLowerCase()),
  ),
)

onMounted(async () => {
  try {
    const resp = await tutorialService.getTutorials({
      loading: {
        message: 'Loading...',
      },
      dontRedirect: true,
      dontShowToast: true,
      useCache: true,
    })
    if (!resp.ok) return
    tutorials.value = resp.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss" src="./TutorialsPage.scss" />
