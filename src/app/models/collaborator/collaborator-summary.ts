import { WorkshopAttendanceSummary } from "../workshop-attendance/workshop-attendance-summary";

export interface CollaboratorSummary {
  id: number;
  name: string;
  workshops: WorkshopAttendanceSummary[];
}
