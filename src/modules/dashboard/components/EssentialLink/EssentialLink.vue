<template>
  <q-item
    v-if="!children"
    :disable="disabled"
    clickable
    class="user-select-none"
    @click="navigateTo({ name, force, LinkParams })"
    :class="{
      'selected-item': isSelected(name, routeClass).value,
      'dropdown-selected-in-route': isInRoute,
    }"
  >
    <q-tooltip v-if="tooltip" anchor="center right" self="center left" :offset="[10, 10]">
      <div v-html="tooltip" />
    </q-tooltip>
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
    :disable="disabled"
    :header-class="{ 'dropdown-selected-in-route': isInRoute }"
    v-model="expanded"
    expand-separator
    :icon="icon ? icon : 'none'"
    :label="title"
    :caption="caption"
  >
    <q-tooltip v-if="tooltip" anchor="center right" self="center left" :offset="[10, 10]">
      <div v-html="tooltip" />
    </q-tooltip>
    <q-item
      v-for="(child, i) in children"
      :key="i"
      :disable="child.disabled"
      clickable
      class="user-select-none q-pl-lg"
      @click="navigateTo({ name: child.name, force: child.force, LinkParams: child.LinkParams })"
      :class="{
        'selected-item': isSelected(child.name, child.routeClass).value,
      }"
    >
      <q-tooltip v-if="child.tooltip" anchor="center right" self="center left" :offset="[10, 10]">
        <div v-html="child.tooltip" />
      </q-tooltip>
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
import type { LocationQueryRaw, RouteLocationAsRelativeGeneric } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import type {
  LinkParamInterface,
  LinksDataInterface,
} from '../BreadCrumbs/composables/breadcrumbs.interfaces'
const $props = defineProps<LinksDataInterface>()

const $router = useRouter()
const $route = useRoute()

const getParams = (LinkParams: LinkParamInterface[]) => {
  const query: LocationQueryRaw = {}
  LinkParams.forEach((element) => {
    query[element.name] = element.value
  })
  return query
}

const navigateTo = (data: {
  name: string
  force?: boolean | undefined
  LinkParams?: LinkParamInterface[] | undefined
}) => {
  if (!data.name) return

  const ro: RouteLocationAsRelativeGeneric = { name: data.name }
  if (data.LinkParams?.length) ro.query = getParams(data.LinkParams)

  if (data.force) {
    const force = `${new Date().getTime()}`

    if (ro.query) ro.query.force = force
    else
      ro.query = {
        force,
      }
    return $router.replace(ro)
  }

  return $router.push(ro)
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
