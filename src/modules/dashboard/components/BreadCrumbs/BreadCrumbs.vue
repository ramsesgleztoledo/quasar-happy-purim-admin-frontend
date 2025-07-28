<template>
  <div class="q-pa-md q-gutter-sm breadcrumbs-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="mr in breadCrumbRoutes"
        :key="mr.name"
        :icon="mr.icon"
        :to="{
          name: mr.name,
          params: mr.params,
        }"
        :label="mr.label"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { routeParamInterface } from './composables/breadcrumbs.interfaces'
import { useBreadcrumb } from './composables/useBreadcrumb'

const { routeInfo } = useBreadcrumb()

interface BreadCrumbRoutesInterface {
  name: string
  params: routeParamInterface | undefined
  icon: string
  label: string
}

const $route = useRoute()

const breadCrumbRoutes = computed<BreadCrumbRoutesInterface[]>(() => {
  const matchedRoutes = $route.matched || []
  const breadCrumbRoutes: BreadCrumbRoutesInterface[] = []

  for (let i = 0; i < matchedRoutes.length; i++) {
    const found = routeInfo.find((mr) => mr.name === matchedRoutes[i]!.name)
    if (!found || !!found.dontShow) continue
    const params = getParams(found.params)

    breadCrumbRoutes.push({
      icon: found.icon,
      name: found.name,
      params,
      label: found.titleParam ? found.titleParam(params) : found.title,
    })
  }

  return breadCrumbRoutes
})

const getParams = (params?: string[]) => {
  if (!params) return undefined
  const routeParams = $route.params
  const finalParams: routeParamInterface = {}
  params.forEach((param: string) => {
    finalParams[param] = routeParams[param]
  })

  return finalParams
}
</script>

<style scoped lang="scss">
@import './BreadCrumbs.scss';
</style>
