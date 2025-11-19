export interface MailMergeTemplateInterface {
  name: string;
  file: string;
  content: string;
}


export interface MergedContentResponseInterface {
  message: string;
  results: MergedResultInterface[];
}
export interface MergedContentPrintInterface {
  memberId: number;
  body: string;
}

export interface MergedResultInterface {
  memberId: number;
  email: string;
  body: string;

}


export interface GeneratePDFFormInterface {
  title: string;
  items: MemberContentPDFInterface[];
}

export interface MemberContentPDFInterface {
  memberId: number;
  content: string;
}

export interface QueueBulkEmailsFormInterface {
  fromAddress: string;
  fromDisplayName: string;
  subject: string;
  dateAdded?: Date | undefined;
  attachments: string;
  recipients: QueueBulkEmailsRecipientInterface[];
  sendNow: boolean
}

export interface QueueBulkEmailsRecipientInterface {
  memberId: number;
  email: string;
  body: string;
}

export interface AddToUnmergedTableFormInterface {
  addedBy: number;
  documentContent: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  sendDate: Date | string;
  timeZone: string;
}


