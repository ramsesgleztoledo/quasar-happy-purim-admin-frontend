<template>
  <q-header elevated class="dashboard-layout-header">
    <q-toolbar>
      <template v-if="!isSearchMobile">
        <!-- show only if mobile -->
        <q-btn
          color="black"
          v-if="isMobile"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-btn flat round icon="arrow_back" aria-label="back" @click="goBack" />
        <q-btn flat round icon="arrow_forward" aria-label="forward" @click="goForward" />

        <q-toolbar-title
          :class="{ 'dashboard-layout-title-mobile': isMobile }"
          class="dashboard-layout-title"
        >
          <div class="row">
            <div class="col-2 dashboard-happypurim-logo user-select-none">
              <p
                @click="
                  () =>
                    $router.push({
                      name: 'dashboard-DashboardPage',
                    })
                "
              >
                HappyPurim.com
              </p>
            </div>
            <div class="col-3">
              <q-input v-if="!isMobile" color="grey-3" outlined v-model="search" label="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </q-toolbar-title>
        <div>
          <div v-if="!isMobile" class="dashboard-layout-right-info">
            <div class="row">
              <div class="col-12">Demo Synagogue</div>
            </div>
            <div class="row">
              <div class="col-12 dashboard-user-info">JANE COHEN</div>
            </div>
          </div>
          <div v-else class="dashboard-search-icon-mobile">
            <q-icon name="search" @click="isSearchMobile = true" />
          </div>
        </div>
      </template>
      <div v-else class="row search-mobile-container">
        <div class="col-10">
          <q-input
            autofocus
            color="grey-3"
            outlined
            v-model="search"
            label="Search"
            style="height: 80%"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-2">
          <q-icon
            class="dashboard-search-icon-mobile"
            name="close"
            @click="
              () => {
                isSearchMobile = false
                search = ''
              }
            "
          />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { useUIStore } from 'src/modules/UI/store/ui-store'
import { ref } from 'vue'

const $uiStore = useUIStore()

const { isMobile, goBack, goForward } = useUI()

const search = ref<string>('')
const isSearchMobile = ref<boolean>(false)

const toggleLeftDrawer = () => $uiStore.toggleSideMenuValue()
</script>

<style scoped lang="scss">
@import './NavBar.scss';
</style>
