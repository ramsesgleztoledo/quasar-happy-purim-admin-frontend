<template>
  <div>
    <div class="row q-mb-sm">
      <p><b>Email: </b> {{ recipient.Email }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Alternate Email: </b> {{ recipient['Alternate Email'] }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Categories: </b> {{ recipient.Categories }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Login Code: </b> {{ recipient['Login Code'] }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Misc: </b> {{ recipient.Misc }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Route: </b> {{ recipient.Route }}</p>
    </div>
    <div class="row q-mb-sm" style="max-width: 100px">
      <p><b>Sending To: </b> {{ recipient['Sending To'] }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Total Sending: </b> {{ recipient['Total Sending'] }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Receiving From Count: </b> {{ recipient['Receiving From Count'] }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Reciprocity: </b> {{ recipient.Reciprocity }}</p>
    </div>
    <div class="row q-mb-sm">
      <p><b>Sign On Link: </b> {{ recipient['Sign On Link'] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipientMemberInterface } from 'src/modules/dashboard/interfaces/report.interface'

interface InnerViewRowPropsInterface {
  recipient: RecipientMemberInterface
}

defineProps<InnerViewRowPropsInterface>()
</script>

<style scoped lang="scss">
p {
  margin: 0px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}
</style>
