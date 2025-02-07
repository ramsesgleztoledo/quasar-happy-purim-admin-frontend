<template>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom v-model="additionalReceiptTextFlag" title="Additional Receipt Text">
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <p>
                The text you insert below will appear at the bottom of the email receipts sent to
                your members:
              </p>
            </div>
          </div>
          <div class="row q-mb-sm">
            <div class="col-12">
              <EditorCustom v-model="editor" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="update"
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
      <ExpanCustom v-model="invoiceTextFlag" title="Invoice Text">
        <template v-slot:body> </template>
      </ExpanCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import ExpanCustom from 'src/components/ExpanCustom/ExpanCustom.vue'
import { ref } from 'vue'

const additionalReceiptTextFlag = ref(false)
const invoiceTextFlag = ref(false)
const editor = ref('')
</script>

<style scoped lang="scss">
@import './AdditionalReceiptText';
</style>
