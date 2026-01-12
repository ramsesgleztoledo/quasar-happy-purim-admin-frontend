<template>
  <div v-if="ifReady">
    <div class="row q-mt-sm">
      <p style="margin: 0px; font-size: 20px">Edit Greetings Below:</p>
    </div>
    <div class="row q-mt-sm q-mb-md q-pa-sm">
      <div class="row q-item-bordered-dotted q-pa-sm" style="width: 100%">
        <div
          :class="{
            'col-12': isMobile,
            'ShowGreetingsStep-left-side': !isMobile,
          }"
        >
          <p class="copy-to-all-p">Create standard greeting:</p>
        </div>
        <div
          :class="{
            'col-12': isMobile,
            'ShowGreetingsStep-right-side': !isMobile,
          }"
        >
          <q-input outlined bottom-slots v-model="copyAllText" clearable>
            <template v-slot:after>
              <q-btn
                icon="copy_all"
                style="background-color: var(--happypurim); color: white"
                label="Copy to all"
                @click="copyToAll"
              />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="row q-mt-sm q-pa-sm">
      <div
        v-for="item in $moStore.greetingsRecipients"
        :key="item.rowId"
        class="row q-pl-sm q-pr-sm q-mb-sm"
        style="width: 100%"
      >
        <div
          :class="{
            'col-12': isMobile,
            'ShowGreetingsStep-left-side': !isMobile,
          }"
        >
          <p class="copy-to-all-p">{{ item.recipientName }}:</p>
        </div>
        <div
          :class="{
            'col-12': isMobile,
            'ShowGreetingsStep-right-side': !isMobile,
          }"
        >
          <q-input outlined bottom-slots v-model="item.greeting" clearable>
            <template v-slot:after>
              <q-btn
                icon="delete"
                style="background-color: var(--happypurim); color: white"
                label="Delete"
                @click="deleteRecipient(item.rowId)"
              />
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { useUI } from 'src/modules/UI/composables'
import { onMounted, ref } from 'vue'
const { getGreetingsRecipientsByMemberId, deleteGreetingsRecipientsByMemberId } = useMemberOrder()

const $moStore = useMemberOrderStore()
const { isMobile } = useUI()

const ifReady = ref(false)
const copyAllText = ref('')

onMounted(() => {
  getGreetingsRecipientsByMemberId()
    .catch(console.error)
    .finally(() => (ifReady.value = true))
})
const copyToAll = () => {
  $moStore.$state.greetingsRecipients = $moStore.$state.greetingsRecipients.map((rec) => ({
    ...rec,
    greeting: copyAllText.value,
  }))
}
const deleteRecipient = async (rowId: number | string) => {
  await deleteGreetingsRecipientsByMemberId(rowId)
}
</script>

<style scoped lang="scss" src="./ShowGreetingsStep.scss" />
