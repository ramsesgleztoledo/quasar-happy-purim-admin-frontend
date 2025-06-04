export interface CampaignInterface {
  campaignID: number;
  date: string;
  subject: string;
  sentFrom: string;
  sent: number;
  processed: number;
  dropped: number;
  deferred: number;
  delivered: number;
  bounced: number;
}

export interface CampaignDetailsInterface {
  delivered: EmailInterface[];
  dropped: EmailInterface[];
  bounced: EmailInterface[];
  deferred: EmailInterface[];
  metadata: CampaignMetadataInterface;
}

export interface EmailInterface {
  MemberID: number;
  m_LastName: string;
  m_FName: string;
  m_SFName: string;
  m_SLastName: string;
  id: number;
  EmailAddress: string;
  Subject: string;
  DateAdded: Date;
  Reason: string;
}

export interface CampaignMetadataInterface {
  campaignID: number;
  subject: string;
  dateAdded: string;
  from: string;
}

export interface EmailContentInterface {
  body: string;
}
