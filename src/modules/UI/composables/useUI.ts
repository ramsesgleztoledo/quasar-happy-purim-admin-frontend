import { useQuasar } from 'quasar';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '../store/ui-store';
import type { downloadEndPointType } from './ui-interfaces';
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
          message: 'Copied to clipboard',
          timeout: 500,
        })
      } else {
        throw new Error('Copy failed')
      }
    } catch (error) {
      console.error(error)

      $q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'error',
        message: 'Failed to copy text',
      })
    }
  }


  const isMobile = ref(false);


  const updateIsMobile = () => {

    if (window.innerWidth <= 1200) {
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
    if ($router.options.history.state.back) {
      $router.back();
    } else {
      $router.push('/');
    }
  }
  const goForward = () => {
    $router.forward()
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
    isDev: computed(() => true
      //  process.env.NODE_ENV === 'development'
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
          textColor: 'white',
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
        message: '“File Downloaded”',
      })

    },

    showToast(ok: boolean, successMsg: string, errorMsg: string) {
      if (ok) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: successMsg,
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: errorMsg,
        })
      }
    },

    goToTop(element: HTMLElement | undefined | null, behavior?: ScrollBehavior) {
      if (!element) return
      element.scrollIntoView({ behavior: behavior ? behavior : 'smooth', block: 'start' })
    },

    showLoading(text?: string) {
      $q.loading.show({
        message: text ? text : `loading ...`,
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })
    },
    stopLoading() {
      $q.loading.hide()
    }

  };
};
