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
        <div v-if="isMobile">
          <q-btn flat round icon="arrow_back" aria-label="back" @click="goBack" />
          <q-btn flat round icon="arrow_forward" aria-label="forward" @click="goForward" />
        </div>

        <q-toolbar-title
          :class="{ 'dashboard-layout-title-mobile': isMobile }"
          class="dashboard-layout-title"
        >
          <div class="row">
            <div
              @click="
                () =>
                  $router.push({
                    name: 'dashboard-DashboardPage',
                  })
              "
              class="col dashboard-happypurim-logo user-select-none"
              style="max-width: 300px"
            >
              <div
                class="row"
                :style="{
                  marginLeft: isMobile ? '12px' : '8px',
                }"
              >
                <p>
                  HappyPurim.com
                  <!-- HappyRoshHashanah.com -->
                </p>
              </div>
              <div class="row">
                <p
                  style="
                    color: #919191;
                    font-size: 15px;
                    margin-left: 62px;
                    font-family: 'Open Sans', sans-serif;
                  "
                  :style="{
                    marginLeft: isMobile ? '78px' : '72px',
                    fontSize: isMobile ? '9px' : '15px',
                    marginTop: isMobile ? '-8px' : '-11px',
                  }"
                >
                  Gift giving just got easier
                  <!-- HappyRoshHashanah.com -->
                </p>
              </div>
            </div>
            <div class="col" v-if="!isMobile" style="display: flex; justify-content: flex-end">
              <SearchComponent />
            </div>
          </div>
        </q-toolbar-title>
        <div>
          <div v-if="!isMobile" class="dashboard-layout-right-info">
            <div class="q-mr-sm">
              <div class="row">
                <div class="col-12">{{ $aStore.$state.shul?.shulName }}</div>
              </div>
              <div class="row">
                <div class="col-12 dashboard-user-info">
                  {{ $aStore.$state.user?.firstName }} {{ $aStore.$state.user?.lastName }}
                </div>
              </div>
            </div>
            <q-btn flat round color="primary" icon="logout" @click="logOut(true)" />
          </div>

          <div v-else class="dashboard-search-icon-mobile">
            <q-icon name="search" @click="isSearchMobile = true" />
          </div>
        </div>
      </template>
      <div v-else class="row search-mobile-container">
        <div class="col-10">
          <SearchComponent v-if="isMobile && isSearchMobile" />
          <!-- <q-input
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
          </q-input> -->
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
import { useAuth } from 'src/modules/auth/composables/useAuth'
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import { useUI } from 'src/modules/UI/composables'
import { useUIStore } from 'src/modules/UI/store/ui-store'
import { ref } from 'vue'
import SearchComponent from './components/SearchComponent.vue'

const $uiStore = useUIStore()
const $aStore = useAuthStore()

const { isMobile, goBack, goForward } = useUI()
const { logOut } = useAuth()

const search = ref<string>('')
const isSearchMobile = ref<boolean>(false)

const toggleLeftDrawer = () => $uiStore.toggleSideMenuValue()
</script>

<style scoped lang="scss">
@import './NavBar.scss';
</style>
