export interface WidgetCharPropsInterface {
  typeChart: 'bar' | 'line';
  title: string;
  preFix?: string;
  subFix?: string;
  data: DataItemInterface;
  showRange?: boolean;
  showLastValue?: boolean;
  showDescription?: boolean;
}
export interface DataItemInterface {
  dates: string[]
  data: {
    color: string
    label: string
    data: number[]
  }[]
}

export interface GroupedDataInterface {
  byMonth: { label: string; quantity: number; color: string }[]
  byYear: { label: string; quantity: number; color: string }[]
  byDay: { label: string; quantity: number; color: string }[]
  byWeek: { label: string; quantity: number; color: string }[]
  color: string
  label: string
}

export type DataType = 'byMonth' | 'byYear' | 'byDay' | 'byWeek'
