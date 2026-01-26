import { useQuasar } from 'quasar';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '../store/ui-store';
import type { ColorModeInterface, downloadEndPointType } from './ui-interfaces';
import { generateDownload } from 'src/helpers/generateDownload';
import type { FileType } from 'src/interfaces/ui-interfaces';


export const useUI = () => {

  const $router = useRouter()
  const $uiStore = useUIStore()

  const $q = useQuasar();
  const copyToClipboard = async (text: string) => {
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const success = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (success) {
        $q.notify({
          color: 'positive',
          textColor: 'black',
          icon: 'check',
          message: 'Copied to Clipboard',
          timeout: 500,
        })
      } else {
        throw new Error('Copy failed')
      }
    } catch (error) {
      console.error(error)

      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: 'Failed to Copy Text',
      })
    }
  }


  const isMobile = ref(false);

  const appColorOptions = computed(() => [
    { value: 'pink', label: '#ef6982' },
    { value: 'blue', label: '#3171e0' },
    { value: 'green', label: '#2dd36f' },
    { value: 'yellow', label: '#ffca22' },
    { value: 'purple', label: '#6370ff' },
    { value: 'red', label: '#f31212' },
    { value: 'orange', label: '#fa7900' },
    { value: 'sky', label: '#00ddfa' },
    { value: 'rose', label: '#fa00cc' },
  ])


  const updateIsMobile = () => {

    if (window.innerWidth <= 1400) {
      if (isMobile.value) return
      isMobile.value = true
    }
    else {
      if (!isMobile.value) return
      isMobile.value = false
      $uiStore.setSideMenuValue(false)
      setTimeout(() => {
        $uiStore.setSideMenuValue(true)
      }, 300)
    }
  };


  onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIsMobile);
  });


  // const isMobile = computed<boolean>(() => window.innerWidth <= 1200)
  // console.log('es mobile?', { isMobile: isMobile.value, width: window.innerWidth });

  const isMobileByQuasar = computed<boolean>(() => $q.platform.is.mobile)

  const reloadPage = () => {
    $router.go(0)
  }
  const goBack = () => {

    const from = document.referrer; // The URL form source
    const isSameDomain = from.startsWith(window.location.origin);
    const stateBack = $router.options.history.state.back;

    if ((!from || (from && isSameDomain)) && stateBack) {
      $router.back();
    } else {
      $router.push({ name: 'DashboardLayout' });
    }
  }
  const goForward = () => {
    $router.forward()
  }

  const setQuasarTheme = (value: -1 | 0 | 1) => {
    let darkModeValue: boolean | 'auto' = false;
    switch (value) {
      case -1:
        darkModeValue = true
        break;
      case 0:
        darkModeValue = 'auto'
        break;

      default:
        darkModeValue = false
        break;
    }
    $q.dark.set(darkModeValue)

  };



  const setTheme = (value: -1 | 0 | 1) => {
    const colorTheme: ColorModeInterface = {
      value: 1,
      icon: 'light_mode'
    }
    if (value === -1) {
      colorTheme.icon = 'dark_mode'
      colorTheme.value = -1
    }

    if (value === 0) {
      colorTheme.icon = 'brightness_medium'
      colorTheme.value = 0
    }

    if (value === 1) {
      colorTheme.icon = 'light_mode'
      colorTheme.value = 1
    }

    $uiStore.$state.darkMode = { ...colorTheme }
    setQuasarTheme(value)
    $q.localStorage.setItem('darkMode', value)
  }


  const toggleTheme = () => {
    const value = $uiStore.$state.darkMode.value
    if (value === -1) setTheme(0)
    if (value === 0) setTheme(1)
    if (value === 1) setTheme(-1)
  }


  const setAppColor = (color: string) => {
    const colorFound = appColorOptions.value.find(co => co.value == color) || appColorOptions.value[0]!

    $uiStore.$state.appColor = colorFound
    $q.localStorage.setItem('appColor', colorFound.value)
    document.body.setAttribute('app-color', colorFound.value)
  };



  const setInitialColors = () => {
    let darkModeValue = 1
    const darkMode = $q.localStorage.getItem('darkMode')

    if (darkMode || darkMode == 0)
      darkModeValue = Number(darkMode)

    if ((!darkModeValue && darkModeValue != 0) || darkModeValue < -1 || darkModeValue > 1) darkModeValue = 1

    setTheme(darkModeValue as -1 | 0 | 1)

    const appColor = ($q.localStorage.getItem('appColor') as string) || 'pink'
    setAppColor(appColor)
  }


  const EDITOR_START_IMG_URL = computed(() => process.env.EDITOR_START_IMG_URL || '')

  return {
    EDITOR_START_IMG_URL,
    copyToClipboard,
    isMobile,
    isMobileByQuasar,
    reloadPage,
    goBack,
    goForward,
    toggleTheme,
    setInitialColors,
    appColorOptions,
    setAppColor,
    isDev: computed(() => process.env.NODE_ENV === 'development'
    ),
    version: computed(() => process.env.VERSION || ''),
    async downloadFile(endPoint: downloadEndPointType, data: {
      fileType: FileType,
      fileName?: string,
      extension?: string
    }) {

      const response = await endPoint({
        dontRedirect: true,
        dontShowToast: true,
      })

      if (!response.ok) {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: 'Something went wrong downloading the file, please try again later',
        })
        return undefined
      }

      const file = response.data

      const date = new Date().getTime()
      const name = `${data.fileName ? `${data.fileName + '-'}` : ''}${date}.${data.extension ? data.extension : 'csv'}`

      generateDownload({
        file,
        fileName: name,
        type: data.fileType
      })

      $q.notify({
        color: 'blue',
        textColor: 'black',
        icon: 'error',
        message: 'File Downloaded',
      })

    },

    showToast(ok: boolean, successMsg: string, errorMsg?: string) {
      if (ok) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: successMsg,
        })
      }
      else {
        if (errorMsg)
          $q.notify({
            color: 'red',
            textColor: 'black',
            icon: 'error',
            message: errorMsg,
          })
      }
    },

    goToTop(params?: { element?: HTMLElement | undefined | null, delay?: number, behavior?: ScrollBehavior }) {

      const element = params?.element || document.body

      setTimeout(() => {
        element.scrollIntoView({ behavior: params?.behavior ? params.behavior : 'smooth', block: 'start' })
      }, params?.delay ? params.delay : 0);

    },

    showLoading(text?: string) {
      $q.loading.show({
        message: text ? text : `Loading...`,
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })
    },


    stopLoading() {
      $q.loading.hide()
    },
    scrollToTarget(targetDiv: HTMLElement | null) {
      if (!targetDiv) return
      targetDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

  };
};
