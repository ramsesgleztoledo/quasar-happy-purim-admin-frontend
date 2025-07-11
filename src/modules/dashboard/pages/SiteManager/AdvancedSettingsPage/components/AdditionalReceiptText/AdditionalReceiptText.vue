<template>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <q-expansion-item
        v-model="additionalReceiptTextFlag"
        label="Additional Receipt Text:"
        class="ExpanCustom-exp-container"
      >
        <q-card>
          <q-card-section>
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
                <EditorCustom v-model="additionalReceiptTextValue" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 justify-content-end">
                <q-btn
                  style="background: white; color: var(--happypurim)"
                  icon="save"
                  label="save"
                  @click="
                    () => {
                      updateTab4AdditionalReceiptText(additionalReceiptTextValue)
                    }
                  "
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <q-expansion-item
        v-model="invoiceTextFlag"
        label="Invoice Text:"
        class="ExpanCustom-exp-container"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <p>
                  The text you insert below will appear at the bottom of the invoices you send to
                  your members:
                </p>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-12">
                <EditorCustom v-model="invoiceTextValue" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 justify-content-end">
                <q-btn
                  style="background: white; color: var(--happypurim)"
                  icon="save"
                  label="save"
                  @click="
                    () => {
                      updateTab4InvoiceText(invoiceTextValue)
                    }
                  "
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import { useAdvancedSettings } from 'src/modules/dashboard/composables/useAdvancedSettings'
import { onMounted, ref } from 'vue'
const { advancedSettingsState, updateTab4AdditionalReceiptText, updateTab4InvoiceText } =
  useAdvancedSettings()

const additionalReceiptTextFlag = ref(true)
const additionalReceiptTextValue = ref('')

const invoiceTextFlag = ref(true)
const invoiceTextValue = ref('')

const resetData = () => {
  additionalReceiptTextValue.value = advancedSettingsState.value.receiptText
  invoiceTextValue.value = advancedSettingsState.value.invoiceText
}

onMounted(() => {
  resetData()
})
</script>

<style scoped lang="scss">
@import './AdditionalReceiptText';
</style>
