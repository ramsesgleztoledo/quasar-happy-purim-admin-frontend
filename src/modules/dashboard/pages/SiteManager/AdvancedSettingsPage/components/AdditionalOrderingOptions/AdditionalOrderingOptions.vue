<template>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom v-model="solicitDotationFlag" title="Solicit Donations for Charity">
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <p>Text to display</p>
            </div>
          </div>
          <EditorCustom v-model="solicitDotationText" />
          <div class="row q-mt-sm">
            <div class="col-12 justify-content-end">
              <q-btn
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () => {
                    // console.log('editor value', { dateValue, timeValue })
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom v-model="sellGiftFlag" title="Sell Gift Baskets for Personal Use">
        <template v-slot:body></template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        v-model="allowMembersFlag"
        title="Allow Members to Send to Others Outside the List"
      >
        <template v-slot:body></template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom v-model="sellAdditionalFlag" title="Sell Additional Items">
        <template v-slot:body></template>
      </ExpanCustom>
    </div>
  </div>
  <div class="separator-bottom q-mb-sm"></div>
  <InfoAlert
    v-if="isMobile"
    type="info"
    :text="infoAlertText"
    icon="fullscreen"
    icon-color="#ef6982"
  />
  <div
    class="row q-pa-sm q-mb-sm AdditionalOrderingOptions-additional-profile"
    :class="{ fullscreen: isFullScreen }"
    :style="{ height: isFullScreen ? '100%' : '400px' }"
  >
    <div class="col-12">
      <div class="row AdditionalOrderingOptions-additional-profile-desc-row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-space-between">
              <p>Additional Profile Questions/Options</p>
              <q-btn
                flat
                round
                color="primary"
                :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="isFullScreen = !isFullScreen"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-5 q-pa-sm d-flex">
              <b class="q-pa-sm"> # </b>
              <div class="row" style="width: 100%">
                <div class="col-12">
                  <q-input v-model="description" outlined disable />
                </div>
              </div>
            </div>
            <div class="col-2 q-pa-sm">
              <q-input v-model="price" outlined disable />
            </div>
            <div class="col-2 q-pa-sm">
              <q-input v-model="sortOrder" outlined disable />
            </div>
            <div class="col-3 q-pa-sm justify-content-center">
              <q-btn
                style="background: var(--happypurim); color: white"
                icon="add"
                label="Add new item"
                @click="
                  () => {
                    // console.log('editor value', { dateValue, timeValue })
                  }
                "
              />
            </div>
          </div>
        </div>
        <div class="separator-bottom q-mb-sm"></div>
      </div>
      <!--=============================== here =============================-->

      <div
        class="row"
        v-for="(item, i) in [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]"
        :key="i"
      >
        <div class="col-5 q-pa-sm d-flex">
          <b class="q-pa-sm"> {{ i + 1 }} </b>
          <div class="row" style="width: 100%">
            <div class="col-12">
              <q-input v-model="description2" outlined />
            </div>
          </div>
        </div>
        <div class="col-2 q-pa-sm">
          <q-input v-model="price2" outlined type="number" prefix="$" />
        </div>
        <div class="col-2 q-pa-sm">
          <q-input v-model="sortOrder2" outlined type="number" />
        </div>
        <div class="col-3 q-pa-sm justify-content-center">
          <q-btn
            icon="delete"
            @click="
              () => {
                // console.log('editor value', { dateValue, timeValue })
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
  <div class="separator-bottom q-mb-sm"></div>
</template>

<script setup lang="ts">
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import ExpanCustom from 'src/components/ExpanCustom/ExpanCustom.vue'
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'

const { isMobile } = useUI()
const infoAlertText = `To handle "Additional Profile Questions/Options" we strongly recommend to use yor phone or tablet in landscape and the fullscreen mode`
const sellAdditionalFlag = ref(false)
const allowMembersFlag = ref(false)
const sellGiftFlag = ref(false)
const solicitDotationFlag = ref(false)
const solicitDotationText = ref('')

/**============================================
 *               Additional Profile Questions/Options
 *=============================================**/
const isFullScreen = ref<boolean>(false)
const description = ref('Description')
const price = ref('Price')
const sortOrder = ref('Sort Order')

//exp TODO:
const description2 = ref('12 Hamantaschen')
const price2 = ref(24)
const sortOrder2 = ref(1)
</script>

<style scoped lang="scss">
@import './AdditionalOrderingOptions';
</style>
