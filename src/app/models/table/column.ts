export interface Column {
  title: string;
  name: string;
  columnType: ColumnType;
}

export enum ColumnType {
  Action, Data
}
