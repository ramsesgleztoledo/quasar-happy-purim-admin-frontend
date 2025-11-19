import { computed } from "vue";
import { useBasicSettingsService } from "../services/basic-settings.service";
import { useBasicSettingsStore } from "../store/basicSettingsStore/basicSettingsStore";
import type { FundraiserCoordinatorFormInterface, GiftBasketProgramFormInterface, OrganizationInformationFormInterface, OrganizationSettingsInterface } from "../interfaces/basic-settings.interfaces";
import { useQuasar } from "quasar";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";
import { useUI } from "src/modules/UI/composables";
import { useDashboardService } from "../services/dashboard.service";
import { useDashboardStore } from "../store/dashboardStore/dashboardStore";


export const useBasicSettings = () => {


  const $bsStore = useBasicSettingsStore()
  const $dStore = useDashboardStore()
  const { getFundraiserStatus } = useDashboardService()
  const $q = useQuasar()

  const { getSettings, updateOrganizationInformation, updateFundraiserCoordinator, updatePricingSettings, getWelcomePage, updateWelcomePage, getFiles, uploadFile, deleteFile } = useBasicSettingsService()

  const { showToast } = useUI()


  return {
    basicSettingsState: computed(() => $bsStore.$state),

    async getSettings() {

      $q.loading.show({
        message: 'Loading...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })


      const [
        settings,
        welcomePage,
      ]:
        [
          ApiCallResponseInterface<OrganizationSettingsInterface>,
          ApiCallResponseInterface<{ html: string }>,
        ]
        = await Promise.all([
          getSettings(),
          getWelcomePage(),

        ])
      $bsStore.setSettings(settings.ok ? settings.data : undefined)
      $bsStore.setWelcomePage(welcomePage.data?.html || "")
      $q.loading.hide()
    },
    async getFiles() {
      const files = await getFiles({
        loading: {
          message: 'Loading...'
        }
      })
      return files.ok ? files.data : []

    },
    async updateOrganizationInformation(data: OrganizationInformationFormInterface) {
      const resp = await updateOrganizationInformation(data, {
        loading: {
          message: 'Updating Organization Information...'
        },
        dontRedirect: true
      })

      showToast(resp.ok, 'Organization Information Updated', `Something went wrong updating organization information`)

    },
    async updateFundraiserCoordinator(data: FundraiserCoordinatorFormInterface) {
      const resp = await updateFundraiserCoordinator(data, {
        loading: {
          message: 'Loading...'
        },
        dontRedirect: true
      })

      showToast(resp.ok, 'Fundraiser Coordinator Information Updated', `Something went wrong updating the fundraiser coordinator information`)


    },
    async updatePricingSettings(data: GiftBasketProgramFormInterface) {
      const resp = await updatePricingSettings(data, {
        loading: {
          message: 'Loading...'
        },
        dontRedirect: true
      })

      showToast(resp.ok, 'Gift Basket Program Settings Updated', `Something went wrong updating the gift basket program settings`)

      if (!resp.ok) return

      const status = await getFundraiserStatus()
      if (status.ok)
        $dStore.setFundraiserStatus(status.data)
    },
    async updateWelcomePage(html: string) {
      const resp = await updateWelcomePage(html, {
        loading: {
          message: 'Loading...'
        },
        dontRedirect: true
      })


      showToast(resp.ok, 'Welcome Page Updated', `Something went wrong updating the welcome page`)
    },
    async uploadFiles(files: File[]) {

      $q.loading.show({
        message: 'Loading...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })

      const promises = await Promise.all(files.map(file => uploadFile(file, {
        dontRedirect: true
      })))

      let failed = false
      promises.forEach((resp => {
        if (!resp.ok)
          failed = true
      }))
      if (!failed) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: files.length === 1 ? 'File Uploaded' : 'Files Uploaded',
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: `Something went wrong uploading the files`,
        })
      }

      $q.loading.hide();
      return promises.filter(resp => resp.ok).map(resp => resp.data.url)


    },
    async deleteFile(file: string) {

      const splitted = file.split('/')
      const name = splitted[splitted.length - 1] || ""

      const resp = await deleteFile(name, {
        loading: {
          message: 'Loading...'
        },
        dontRedirect: true
      })
      showToast(resp.ok,
        'File Deleted',
        'Something went wrong deleting the file'
      )

      return resp.ok

    }
  }
};
