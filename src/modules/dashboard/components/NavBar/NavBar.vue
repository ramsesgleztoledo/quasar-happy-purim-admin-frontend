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
            <div class="col dashboard-happypurim-logo user-select-none">
              <p
                @click="
                  () =>
                    $router.push({
                      name: 'dashboard-DashboardPage',
                    })
                "
              >
                <!-- HappyPurim.com -->
                HappyRoshHashanah.com
              </p>
            </div>
            <div class="col" v-if="!isMobile">
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
