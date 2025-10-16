<template>
  <q-item
    v-if="!children"
    :disable="disabled"
    clickable
    class="user-select-none"
    @click="navigateTo(name, force)"
    :class="{
      'selected-item': isSelected(name, routeClass).value,
      'dropdown-selected-in-route': isInRoute,
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
    :header-class="{ 'dropdown-selected-in-route': isInRoute }"
    v-model="expanded"
    expand-separator
    :icon="icon ? icon : 'none'"
    :label="title"
    :caption="caption"
  >
    <q-item
      v-for="(child, i) in children"
      :key="i"
      :disable="disabled"
      clickable
      class="user-select-none q-pl-lg"
      @click="navigateTo(child.name, child.force)"
      :class="{
        'selected-item': isSelected(child.name, child.routeClass).value,
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
import { computed, onMounted, ref } from 'vue'
import type { LinksDataInterface } from '../BreadCrumbs/composables/breadcrumbs.interfaces'
const $props = defineProps<LinksDataInterface>()

const $router = useRouter()
const $route = useRoute()

const navigateTo = (name: string, force?: boolean) => {
  if (!name) return

  if (force) return $router.replace({ name, query: { force: `${new Date().getTime()}` } })

  return $router.push({ name })
}

const expanded = ref<boolean>(false)

const isSelected = (name: string, routeClass?: string[]) =>
  computed(() => {
    if (routeClass) return routeClass.includes($route.name as string)
    return $route.name === name
  })

const isInRoute = computed<boolean>(() => !!$route.matched.find((ro) => ro.name === $props.name))

const checkExpanded = () => {
  if ($props.children) expanded.value = isInRoute.value
}

onMounted(() => {
  checkExpanded()
})
</script>
<style lang="scss" scoped>
@import './EssentialLink.scss';
</style>
