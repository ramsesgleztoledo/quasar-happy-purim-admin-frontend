import { useQuasar } from "quasar";
import { useMailMergeService } from "../services/mailMerge.service";
import { useReportStore } from "../store/ReportStore/reportStore";
import { computed } from 'vue';
import type { MergedContentPrintInterface, MergedResultInterface, QueueBulkEmailsFormInterface } from "../interfaces/mail-merge.interface";
import { useUI } from "src/modules/UI/composables";
import { useAuthStore } from "src/modules/auth/store/auth.store";




export const useMailMerge = () => {

  const $q = useQuasar()
  const {
    // downloadFile,
    showToast } = useUI()
  const $aStore = useAuthStore()

  const { getFormFields, getTemplates, getMergedContentByReportId, generatePDF, queueBulkEmails, addUnmergedEmailJobToTable, getImages, getMergedContentPrintByReportId } = useMailMergeService()

  const $rStore = useReportStore()

  const reportId = computed(() => $rStore.$state.reportId)
  const userId = computed(() => $aStore.$state.user?.id)

  const getMergedContent = async (data: { content: string, memberIds: number[], emailOption: 'Primary' | 'primary_alternate' }) => {
    const merged = await getMergedContentByReportId({
      reportId: reportId.value,
      emailOption: data.emailOption,
      data: {
        template: data.content,
        memberIds: data.memberIds
      }
    }, {
      dontRedirect: true,
      useRespAsError: true,
      loading: {
        message: 'Getting Merged Content'
      }

    })
    return merged.ok ? merged.data.results : []
  };


  return {
    async getData() {

      $q.loading.show({
        message: 'Loading...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })

      const resp = await Promise.all([
        getFormFields({
          dontRedirect: true,
          dontShowToast: true,
        }),
        getTemplates({
          dontRedirect: true,
          dontShowToast: true,
        }),
        getImages({
          dontRedirect: true,
          dontShowToast: true,
        })
      ])

      $q.loading.hide()

      $rStore.setImages(resp[2].ok ? resp[2].data : [])

      return {
        form: {
          fullName: resp[0].ok ? resp[0].data.fullName : '',
          email: resp[0].ok ? resp[0].data.email : '',
        },
        templates: resp[1].ok ? resp[1].data : [],
      }


    },

    async getMergedContentByReportAndMember(memberId: number, content: string, emailOption: 'Primary' | 'primary_alternate') {

      const resp = await getMergedContentByReportId({
        reportId: reportId.value,
        emailOption,
        data: {
          template: content,
          memberIds: [memberId]
        }
      }, {
        dontRedirect: true,
        useRespAsError: true,
        loading: {
          message: 'loading'
        }

      })

      return resp.ok && resp.data?.results?.length ? resp.data.results[0] : undefined

    },
    async getMergedContentPrintByReportAndMember(memberId: number, content: string) {

      const resp = await getMergedContentPrintByReportId({
        reportId: reportId.value,
        data: {
          template: content,
          memberIds: [memberId]
        }
      }, {
        dontRedirect: true,
        useRespAsError: true,
        loading: {
          message: 'loading'
        }

      })

      return resp.ok && resp.data.length ? resp.data[0] : undefined

    },

    async generatePDF(data: {
      title: string;
      userEmail: string;
      content: string;
      memberIds: number[]
    }) {

      // const not = $q.notify({
      //   message: `Generating PDF, this can take a while, please don't refresh the app`,
      //   color: 'primary',
      //   position: 'bottom-right',
      //   timeout: 0,
      //   actions: [
      //     { label: 'Close', color: 'white', handler: () => not() }
      //   ]
      // })
      const resp = await getMergedContentPrintByReportId({
        reportId: reportId.value,
        data: {
          template: data.content,
          memberIds: data.memberIds
        }
      }, {
        dontRedirect: true,
        useRespAsError: true,
      })

      const result: MergedContentPrintInterface[] = resp.ok ? resp.data : []

      if (!resp.ok) return

      $q.notify({
        color: 'blue',
        textColor: 'black',
        icon: 'error',
        message: `Your will receive a link to download your PDF at: "${data.userEmail}", please check your email regularly.`,
      })

      // await downloadFile(async () =>
      await generatePDF({
        title: data.title,
        userEmail: data.userEmail,
        items: result.map(da => ({
          memberId: da.memberId,
          content: da.body
        }))
      }, {
        dontRedirect: true,
        useRespAsError: true,
        dontShowToast: true,
        dontUseErrorAction: true,
      })
      //     , {
      //   fileType: 'pdf',
      //   fileName: data.title,
      //   extension: 'pdf'
      // }

      // )

      // not()


    },

    async sendNowEmail(data: {
      form: {
        sendTo: 'Primary' | 'primary_alternate';
        fullName: string;
        email: string;
        emailSubject: string;
      },
      content: string;
      memberIds: number[];
      date?: Date;
      timeZone?: string;
      sendNow: boolean;

    }, isSchedule?: boolean) {

      const recipients: MergedResultInterface[] = await getMergedContent({
        content: data.content,
        memberIds: data.memberIds,
        emailOption: data.form.sendTo || 'Primary'
      })

      if (!recipients.length) return

      const queueEmail: QueueBulkEmailsFormInterface & { timeZone?: string } = {
        attachments: "",
        dateAdded: data.date,
        fromAddress: data.form.email,
        fromDisplayName: data.form.fullName,
        subject: data.form.emailSubject,
        recipients,
        timeZone: data.timeZone || '',
        sendNow: data.sendNow,
      }

      const resp = await queueBulkEmails(queueEmail, {
        loading: {
          message: 'Loading...'
        },
        dontRedirect: true,
        useRespAsError: true,
      })
      if (!isSchedule)
        showToast(resp.ok, 'Your emails have been queued and will be sent in 15 minutes',
          'Something went wrong sending the emails, please try again')
      else
        showToast(resp.ok, 'All emails were scheduled',
          'Something went wrong scheduling the emails, please try again')

      return resp.ok

    },

    async addUnmergedEmailJobToTable(data: {
      form: {
        sendTo: string;
        fullName: string;
        email: string;
        emailSubject: string;
      },
      content: string;
      timeZone: string;
      date: Date | string;
    }) {
      const resp = await addUnmergedEmailJobToTable(reportId.value, {
        addedBy: Number(userId.value || 0),
        documentContent: data.content,
        fromName: data.form.fullName,
        fromEmail: data.form.email,
        toEmail: data.form.sendTo,
        subject: data.form.emailSubject,
        sendDate: data.date,
        timeZone: data.timeZone
      }, {
        dontRedirect: true,
        useRespAsError: true,
        loading: {
          message: 'Loading...'
        }
      })


      showToast(resp.ok, 'All emails were scheduled',
        'Something went wrong scheduling the emails, please try again')

      return resp.ok
    }
  };
};
