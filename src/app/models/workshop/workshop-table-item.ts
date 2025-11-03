import { TableItem } from "../table/table-item";

export interface WorkshopTableItem extends TableItem {
  id: number;
  name: string;
  realizationDate: string;
  totalCollaborators: number;
}
