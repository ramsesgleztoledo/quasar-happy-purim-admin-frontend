
import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref } from 'vue';


export const useUIStore = defineStore('ui', () => {

  const sideMenu = ref(false)

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
