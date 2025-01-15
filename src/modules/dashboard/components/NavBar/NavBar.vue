<template>
  <q-header elevated class="dashboard-layout-header">
    <q-toolbar>
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

      <q-toolbar-title
        :class="{ 'dashboard-layout-title-mobile': isMobile }"
        class="dashboard-layout-title"
      >
        <div class="row">
          <div class="col-2 dashboard-happypurim-logo user-select-none">
            <p>HappyPurim.com</p>
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
        <div v-else class="dashboard-search-icon-mobile"><q-icon name="search" /></div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const isMobile = $q.platform.is.mobile

const emit = defineEmits<{
  (event: 'onToggle'): void
}>()

const search = ref<string>('')

const toggleLeftDrawer = () => {
  emit('onToggle')
}
</script>

<style scoped lang="scss">
@import './NavBar.scss';
</style>
