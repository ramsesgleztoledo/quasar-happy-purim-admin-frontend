<template>
  <div v-if="isReady" style="height: 100%;">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const { getMemberDataById } = useMember()

const isReady = ref<boolean>(false)

const loadInitialData = async () => {
  try {
    const memberId = $route.params.memberId
    await getMemberDataById(Number(memberId))
    isReady.value = true
  } catch (error) {
    return error
  }
}

const loadData = () => {
  loadInitialData().catch(console.error)
}

onMounted(() => {
  loadData()
})

watch(
  () => $route.params.memberId,
  () =>
    // newVal, oldVal
    {
      isReady.value = false
      loadData()
    },
)
</script>

<style scoped lang="scss">
@import './MemberLayout';
</style>
