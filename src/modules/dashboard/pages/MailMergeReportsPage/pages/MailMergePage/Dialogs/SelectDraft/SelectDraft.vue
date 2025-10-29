<template>
  <q-dialog v-model="show" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Select a Draft</p>
        </div>
      </div>
      <div v-if="!isReady" style="min-height: 300px">
        <q-inner-loading :showing="!isReady" label="Loading ..." />
      </div>
      <div v-if="isReady">
        <div v-if="drafts.length" class="custom-dialog-body-container q-pa-lg">
          <q-item v-for="draft in drafts" :key="draft.draftId" class="q-item-bordered q-mb-sm">
            <q-item-section>
              <q-item-label>{{ draft.documentTitle }}</q-item-label>
              <q-item-label caption lines="2"
                >{{ draft.adminName }} - {{ convertToUSDate(draft.dateAdded,true) }}</q-item-label
              >

              <q-item-label caption lines="2">{{ draft.documentDescription }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row">
                <q-btn
                  class="q-mr-sm"
                  padding="3px"
                  color="primary"
                  icon="delete"
                  @click="onDeleteDraft(draft)"
                />
                <q-btn
                  padding="5px"
                  color="primary"
                  label="Select"
                  @click="() => $emit('onSelectDraft', draft)"
                  v-close-popup
                />
              </div>
            </q-item-section>
          </q-item>
        </div>
        <div v-else class="q-ma-md q-pa-md">No drafts to show</div>
      </div>
      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>
</template>

<script setup lang="ts">
import { convertToUSDate } from 'src/helpers'
import { useDraft } from 'src/modules/dashboard/composables/useDraft'
import type { DraftInterface } from 'src/modules/dashboard/interfaces/draft.interfaces'
import { useUI } from 'src/modules/UI/composables'
import { computed, ref, watch } from 'vue'
interface ScheduleSendPropsInterface {
  modelValue: boolean
}

const { isMobile } = useUI()

const isReady = ref(false)

const $emit = defineEmits(['update:modelValue', 'onSelectDraft'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const { deleteDraft, getDrafts } = useDraft()

const drafts = ref<DraftInterface[]>([])

const onDeleteDraft = async (draft: DraftInterface) => {
  const resp = await deleteDraft(draft)
  if (resp) drafts.value = drafts.value.filter((d) => d.draftId !== draft.draftId)
}

watch(show, (val) => {
  if (!val) return
  getDrafts().then((resp) => {
    drafts.value = resp
    isReady.value = true
  })
})
</script>

<style scoped lang="scss" src="./SelectDraft.scss" />
