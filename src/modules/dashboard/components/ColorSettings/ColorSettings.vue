<template>
  <div>
    <q-btn-dropdown
      class="glossy"
      style="background-color: var(--happypurim); color: white"
      icon="settings"
      :menu-offset="[220, 8]"
      :menu-props="{
        'no-parent-event': true,
        teleport: 'body',
        fit: true,
      }"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column" style="min-width: 150px">
          <div class="text-h6 q-mb-md">Settings</div>
          <div class="row">
            <div class="col-12">
              <q-btn
                label="app theme"
                flat
                color="primary"
                :icon="$uiStore.$state.darkMode.icon"
                @click="toggleTheme()"
              >
                <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                  Toggle Dark Mode
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-12">
              <q-select
                filled
                v-model="$uiStore.$state.appColor"
                :options="appColorOptions"
                label="APP COLOR"
                v-on:update:model-value="
                  (value) => {
                    setAppColor(value.value)
                  }
                "
              >
                <template v-slot:selected-item="scope">
                  <div
                    style="width: 100%; height: 100%; margin-top: 2px"
                    :style="{
                      backgroundColor: scope.opt.label,
                    }"
                  ></div>
                </template>

                <template v-slot:option="scope">
                  <div style="height: 30px">
                    <q-item
                      v-bind="scope.itemProps"
                      :style="{
                        backgroundColor: scope.label,
                      }"
                    >
                    </q-item>
                  </div>
                </template>
              </q-select>
            </div>
          </div>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center" style="min-width: 150px">
          <!-- <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar> -->

          <div class="text-subtitle1 q-mt-md q-mb-xs">
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
          </div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
            icon="logout"
            @click="logOut()"
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useAuth } from 'src/modules/auth/composables/useAuth'
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import { useUI } from 'src/modules/UI/composables'
import { useUIStore } from 'src/modules/UI/store/ui-store'

const $uiStore = useUIStore()
const $aStore = useAuthStore()
const { logOut } = useAuth()
const { toggleTheme, appColorOptions, setAppColor } = useUI()
</script>

<style scoped lang="scss"></style>
