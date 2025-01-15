<template>
  <q-item
    v-if="!children"
    :disable="disabled"
    clickable
    class="user-select-none"
    @click="navigateTo(to)"
    :class="{
      'selected-item': $route.name === to,
    }"
  >
    <q-item-section avatar>
      <q-icon v-if="icon" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <!-- <q-item v-else clickable>
    <q-item-section avatar>
      <q-icon v-if="icon" :name="icon" />
    </q-item-section>
    hehe
  </q-item> -->

  <q-expansion-item
    v-else
    header-class="dropdown-selected-in-route"
    v-model="expanded"
    expand-separator
    :icon="icon ? icon : 'none'"
    :label="title"
    :caption="caption"
  >
    <q-item
      v-for="child in children"
      :key="child.id"
      :disable="disabled"
      clickable
      class="user-select-none"
      @click="navigateTo(child.to)"
      :class="{
        'selected-item': $route.name === child.to,
      }"
    >
      <q-item-section avatar>
        <q-icon v-if="child.icon" :name="child.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ child.title }}</q-item-label>
        <q-item-label caption>{{ child.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { LinksDataInterface } from '../../data/links'
import { onMounted, ref } from 'vue'
const $props = defineProps<LinksDataInterface>()

const $router = useRouter()
const $route = useRoute()

const navigateTo = (to: string) => {
  console.log('navigating to ==> ', to)

  $router.push({
    name: to,
  })
}

const expanded = ref<boolean>(false)

const isInRoute = () => {
  return !!$route.matched.find((ro) => ro.name === $props.to)
}

const checkExpanded = () => {
  expanded.value = isInRoute()
}

onMounted(() => {
  checkExpanded()
})
</script>
<style lang="scss" scoped>
@import './EssentialLink.scss';
</style>
