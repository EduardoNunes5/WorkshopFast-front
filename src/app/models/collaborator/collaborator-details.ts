import { WorkshopAttendanceSummary } from "../workshop-attendance/workshop-attendance-summary";

export interface CollaboratorDetails {
  id: number;
  name: string;
  workshops: WorkshopAttendanceSummary[];
}
