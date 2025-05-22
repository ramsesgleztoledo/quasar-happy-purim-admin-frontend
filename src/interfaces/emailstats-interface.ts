export interface EmailStatInterface {
  CampaignID: number;
  Date: string;
  Subject: string;
  SentFrom: string;
  Sent: number;
  Processed: number;
  Dropped: number;
  Deferred: number;
  Delivered: number;
  Bounced: number;
}

