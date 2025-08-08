export interface ScheduleEmailInterface {
  campaignId: number;
  emailCount: number;
  formattedSendingDate: string;
  subject: string;
  adminName: string;
}

export interface EmailToBeSentInterface {
  id: number;
  toAddress: string;
  fromAddress: string;
  fromDisplayName: string;
  subject: string;
  status: string;
  dateSent: null;
}
