import { useQuasar } from 'quasar';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '../store/ui-store';


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
    if (window.innerWidth <= 1200)
      isMobile.value = true
    else {
      isMobile.value = false
      $uiStore.setSideMenuValue(true)
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

  return {
    copyToClipboard,
    isMobile,
    isMobileByQuasar,
    reloadPage,
    goBack,
    goForward,
    isDev: computed(() => process.env.NODE_ENV === 'development'),
    version: computed(() => process.env.VERSION || ''),
  };
};
