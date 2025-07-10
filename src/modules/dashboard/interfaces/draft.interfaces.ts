export interface DraftInterface {
  draftId: number;
  documentTitle: string;
  documentDescription: string;
  documentContent: string;
  dateAdded: Date;
  adminName: string;
  addedBy: number;
  showAlert: boolean;
}

export interface AddDraftFormInterface {
  name: string;
  description: string;
  body: string;
  documentType: string;
}

