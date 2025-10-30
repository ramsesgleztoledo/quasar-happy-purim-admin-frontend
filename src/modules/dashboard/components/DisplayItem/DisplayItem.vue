<template>
  <div :style="{ ...styles }">
    <div class="row" v-for="(item, index) in items" :key="index">
      <div
        class="col-12 DisplayItem-item-container"
        :style="{
          backgroundColor: index % 2 === 0 ? '#F6F6F6' : 'white',
        }"
      >
        <div v-html="item.label" class="displayItemContainer" />

        <p
          @mouseenter="
            () => {
              if (item.hover && !item.showOnHover) menu = true
            }
          "

          @click="() => onItemCLicked(item)"
          :style="{
            color: item.color ? item.color : 'black',
            cursor: item.redirectTo || item.hover ? 'pointer' : '',
            textDecoration: item.redirectTo ? 'underline' : '',
          }"
        >
          {{ item.value }}
          <template v-if="item.hover">
            <q-tooltip
              anchor="bottom middle"
              self="bottom middle"
              persistent
              style="background-color: var(--happypurim); font-size: 16px"
              v-if="item.showOnHover"
              transition-show="flip-right"
              transition-hide="flip-left"
              ><div v-html="item.hover"></div>
            </q-tooltip>
            <q-menu
              v-else

              style="
                background-color: var(--happypurim);
                font-size: 16px;
                color: white;
                padding: 8px;
              "
              v-model="menu"
              anchor="bottom middle"
              self="top middle"
              :cover="false"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              <div v-html="item.hover"></div>
            </q-menu>
          </template>
        </p>
      </div>
    </div>
  </div>
  <div class="row" v-if="countTotal != null">
    <div class="col-12 DisplayItem-item-container">
      <p>
        <b> {{ totalLabel ? totalLabel : 'Total' }} </b>
      </p>
      <p>
        <b> {{ countTotal }} </b>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ItemBasketInterface } from '../../interfaces/item-interfaces'
import { onMounted, ref } from 'vue'
import { backendRoutes } from '../../data/backend-routes-redirection'

interface DisplayItemPropsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: any
  countTotal?: number
  totalLabel?: string
  items: ItemBasketInterface[]
}

const menu = ref(false)
const $router = useRouter()

defineProps<DisplayItemPropsInterface>()

const onItemCLicked = (item: ItemBasketInterface) => {
  if (!item.redirectTo) return
  return $router.push(item.redirectTo)
}

const handleClick = (href: string | null) => {
  if (!href) return

  const to = href.split('.')
  if (!to.length) return
  const link = to[0]!

  const name = backendRoutes[link]
  if (!name) return
  return $router.push({ name })
}

onMounted(() => {
  const divs = document.querySelectorAll<HTMLElement>('div.displayItemContainer')

  divs.forEach((div) => {
    const links = div.querySelectorAll<HTMLAnchorElement>('a')

    links.forEach((link) => {
      const href = link.getAttribute('href')
      link.removeAttribute('href')
      link.style.color = '#3c5ce0'
      link.style.cursor = 'pointer'
      link.addEventListener('click', (event) => {
        event.preventDefault()
        handleClick(href)
      })
    })
  })
})
</script>

<style scoped lang="scss">
@import './DisplayItem.scss';
</style>
