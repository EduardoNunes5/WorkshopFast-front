import { TableItem } from "../table/table-item";

export interface CollaboratorTableItem extends TableItem {
  id: number;
  name: string;
  workshopAttendanceId: number;
}
