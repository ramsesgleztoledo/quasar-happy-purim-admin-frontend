<template>
  <div class="q-pa-md q-gutter-sm breadcrumbs-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="(mr, i) in matchedRoutes"
        :key="i"
        :icon="matched((mr.name as string) || '').value?.icon"
        :to="{
          name: mr.name,
          params: params(matched((mr.name as string) || '').value?.params).value,
        }"
        :label="showLabel(matched((mr.name as string) || '').value).value"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { routeDataInterface, routeParamInterface } from '../../data/links'
import { routeInfo } from '../../data/links'

const $route = useRoute()

const matchedRoutes = computed<RouteLocationMatched[]>(() => $route.matched || [])

const matched = (name: string) =>
  computed<routeDataInterface | undefined>(() => routeInfo.find((mr) => mr.name === name))

const params = (params?: string[]) =>
  computed<routeParamInterface | undefined>(() => {
    if (!params) return undefined

    const routeParams = $route.params

    const finalParams: routeParamInterface = {}
    params.forEach((param: string) => {
      finalParams[param] = routeParams[param]
    })

    return finalParams
  })
const showLabel = (matchedRoute?: routeDataInterface) =>
  computed<string>(() => {
    if (matchedRoute) {
      if (matchedRoute.titleParam) return matchedRoute.titleParam(params(matchedRoute.params).value)
      return matchedRoute.title
    }

    return 'non-label'
  })
</script>

<style scoped lang="scss">
@import './BreadCrumbs.scss';
</style>
