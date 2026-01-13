
import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref } from 'vue';
import type { AppColorInterface, ColorModeInterface } from '../composables/ui-interfaces';



export const useUIStore = defineStore('uiStore', () => {



  const sideMenu = ref(false)
  const darkMode = ref<ColorModeInterface>({
    icon: 'light_mode',
    value: 1
  })
  const appColor = ref<AppColorInterface>(
    { value: 'pink', label: '#ef6982' }
  )

  const sideMenuValue = computed({
    get: () => sideMenu.value,
    set: (value: boolean) => {
      sideMenu.value = value;
    }
  })

  const setSideMenuValue = (value: boolean) => sideMenu.value = value
  const toggleSideMenuValue = () => sideMenu.value = !sideMenu.value



  return {
    //state
    sideMenu,
    darkMode,
    appColor,
    //getters
    sideMenuValue,
    //actions
    setSideMenuValue,
    toggleSideMenuValue,

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
