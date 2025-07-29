import { useQuasar } from "quasar";
import { useMailMergeService } from "../services/mailMerge.service";
import { useReportStore } from "../store/ReportStore/reportStore";
import { computed } from 'vue';
import type { MergedResultInterface, QueueBulkEmailsFormInterface } from "../interfaces/mail-merge.interface";
import { useUI } from "src/modules/UI/composables";
import { useAuthStore } from "src/modules/auth/store/auth.store";




export const useMailMerge = () => {

  const $q = useQuasar()
  const { downloadFile, showToast } = useUI()
  const $aStore = useAuthStore()

  const { getFormFields, getTemplates, getMergedContentByReportId, generatePDF, queueBulkEmails, addUnmergedEmailJobToTable, getImages } = useMailMergeService()

  const $rStore = useReportStore()

  const reportId = computed(() => $rStore.$state.reportId)
  const userId = computed(() => $aStore.$state.user?.id)

  const getMergedContent = async (data: { content: string, memberIds: number[] }) => {
    const merged = await getMergedContentByReportId({
      reportId: reportId.value,
      emailOption: 'Primary',
      data: {
        template: data.content,
        memberIds: data.memberIds
      }
    }, {
      loading: {
        message: 'Getting Merged Content'
      }

    })
    return merged.ok ? merged.data.results : []
  };


  return {
    async getData() {

      $q.loading.show({
        message: 'Loading ...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })

      const resp = await Promise.all([
        getFormFields(),
        getTemplates(),
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

    async getMergedContentByReportAndMember(memberId: number, content: string) {

      const resp = await getMergedContentByReportId({
        reportId: reportId.value,
        emailOption: 'Primary',
        data: {
          template: content,
          memberIds: [memberId]
        }
      }, {
        dontRedirect: true,
        loading: {
          message: 'loading'
        }

      })

      return resp.ok ? resp.data.results[0] : undefined

    },

    async generatePDF(data: {
      title: string;
      content: string;
      memberIds: number[]
    }) {

      const result: MergedResultInterface[] = await getMergedContent({
        content: data.content,
        memberIds: data.memberIds
      })



      if (!result.length) return

      downloadFile(async () => await generatePDF({
        title: data.title,
        items: result.map(da => ({
          memberId: da.memberId,
          content: da.body
        }))
      }, {
        loading: {
          message: 'Generating PDF'
        }
      }), {
        fileType: 'pdf',
        fileName: data.title,
        extension: 'pdf'
      })

    },

    async sendNowEmail(data: {
      form: {
        sendTo: string;
        fullName: string;
        email: string;
        emailSubject: string;
      },
      content: string;
      memberIds: number[];
      date: Date;
    }, isSchedule?: boolean) {

      const recipients: MergedResultInterface[] = await getMergedContent({
        content: data.content,
        memberIds: data.memberIds
      })

      if (!recipients.length) return

      const queueEmail: QueueBulkEmailsFormInterface = {
        attachments: "",
        dateAdded: data.date,
        fromAddress: data.form.email,
        fromDisplayName: data.form.fullName,
        subject: data.form.emailSubject,
        recipients,
      }

      const resp = await queueBulkEmails(queueEmail, {
        loading: {
          message: 'Sending emails'
        }
      })
      if (!isSchedule)
        showToast(resp.ok, 'All emails were sent',
          'something went wrong sending the emails')
      else
        showToast(resp.ok, 'All emails were scheduled',
          'something went wrong scheduling the emails')

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
      date: Date;
    }) {
      const resp = await addUnmergedEmailJobToTable(reportId.value, {
        addedBy: Number(userId.value || 0),
        documentContent: data.content,
        fromName: data.form.fullName,
        fromEmail: data.form.email,
        toEmail: data.form.sendTo,
        subject: data.form.emailSubject,
        sendDate: data.date
      }, {
        loading: {
          message: 'Scheduling emails'
        }
      })


      showToast(resp.ok, 'All emails were scheduled',
        'something went wrong scheduling the emails')

      return resp.ok
    }
  };
};
