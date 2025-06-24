import { computed } from "vue";
import { useBasicSettingsService } from "../services/basic-settings.service";
import { useBasicSettingsStore } from "../store/basicSettingsStore/basicSettingsStore";
import type { FundraiserCoordinatorFormInterface, GiftBasketProgramFormInterface, OrganizationInformationFormInterface, OrganizationSettingsInterface } from "../interfaces/basic-settings.interfaces";
import { useQuasar } from "quasar";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";
import { useUI } from "src/modules/UI/composables";


export const useBasicSettings = () => {


  const $bsStore = useBasicSettingsStore()
  const $q = useQuasar()

  const { getSettings, updateOrganizationInformation, updateFundraiserCoordinator, updatePricingSettings, getWelcomePage, updateWelcomePage, getFiles, uploadFile, deleteFile } = useBasicSettingsService()

  const { showToast } = useUI()


  return {
    basicSettingsState: computed(() => $bsStore.$state),

    async getSettings() {

      $q.loading.show({
        message: 'Loading settings...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
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
          message: 'Loading files...'
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
      if (resp.ok) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: 'Organization Information Updated',
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: `something went wrong updating organization information`,
        })
      }

    },
    async updateFundraiserCoordinator(data: FundraiserCoordinatorFormInterface) {
      const resp = await updateFundraiserCoordinator(data, {
        loading: {
          message: 'Updating Fundraiser Coordinator...'
        },
        dontRedirect: true
      })
      if (resp.ok) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: 'Fundraiser Coordinator Updated',
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: `something went wrong updating fundraiser coordinator`,
        })
      }

    },
    async updatePricingSettings(data: GiftBasketProgramFormInterface) {
      const resp = await updatePricingSettings(data, {
        loading: {
          message: 'Updating Gift Basket Program...'
        },
        dontRedirect: true
      })
      if (resp.ok) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: 'Gift Basket Program Updated',
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: `something went wrong updating Gift Basket Program`,
        })
      }

    },
    async updateWelcomePage(html: string) {
      const resp = await updateWelcomePage(html, {
        loading: {
          message: 'Updating welcome page...'
        },
        dontRedirect: true
      })
      if (resp.ok) {
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: 'welcome page Updated',
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: `something went wrong updating the welcome page`,
        })
      }

    },
    async uploadFiles(files: File[]) {

      $q.loading.show({
        message: 'uploading files...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
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
          message: 'All files were uploaded',
        })
      }
      else {
        $q.notify({
          color: 'red',
          textColor: 'black',
          icon: 'error',
          message: `something went wrong uploading the files`,
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
          message: 'deleting file'
        },
        dontRedirect: true
      })
      showToast(resp.ok,
        'filed deleted',
        'something went wrong deleting the file'
      )

      return resp.ok

    }
  }
};
