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
