/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UploadFileResponseInterface {
  originalFileName: string;
  savedFileName: string;
  filePath: string;
  sheetNames: string[];
}



export interface ProcessAndMatchResponseInterface {
  success: boolean;
  errorDescription: string | null;
  matchedFields: MatchedFieldInterface[];
}

export interface MatchedFieldInterface {
  importField: string;
  matchedMapID: string;
  matchedFieldName: string;
}

export interface FieldOptionInterface {
  mapID: string;
  fieldName: string;
}

export interface UpdateAndValidateFormInterface {
  oldFieldName: string;
  newFieldName: string;
  isChecked: boolean;
}


export interface DataSummaryResponseInterface {
  success: boolean;
  summary: SummaryInterface;
  colHeaders: string[];
  tables: DataSummaryTablesInterface;
}

export interface SummaryInterface {
  updatedCount: number;
  deletedCount: number;
  addedCount: number;
  unchangedCount: number;
}

export interface DataSummaryTablesInterface {
  deleted: DataSummaryRowInterface;
  updated: DataSummaryRowInterface;
  added: DataSummaryRowInterface;
  unchanged: DataSummaryRowInterface;
}

export interface DataSummaryRowInterface {
  rows: RowDataInterface[];
  hasActionButton: boolean;
  actionButtonText: string;
  hasChangesButton: boolean;
}

export interface RowDataInterface {
  rowKey: string;
  cellValues: string[];
}


export interface DestinationKeyInterface {
  fieldName: string;
  memberID: string;
}


export interface BackupUploadFormInterface {
  file: FileInfoFormInterface;
  dicts: DictsInfoFormInterface;
}

export interface DictsInfoFormInterface {
  deleteMembers: MemberRecordInterface;
  updateMembers: MemberRecordInterface;
  addMembers: MemberRecordInterface;
  unchangedMembers: MemberRecordInterface;
}

export interface MemberRecordInterface {
  [key: string]: Record<string, any>;
}

export interface FileInfoFormInterface {
  filePath: string;
  fileName: string;
}


export interface DetailedKeyInterface {
  fieldName: string;
  oldValue:  string;
  newValue:  string;
  isUpdated: boolean;
}
