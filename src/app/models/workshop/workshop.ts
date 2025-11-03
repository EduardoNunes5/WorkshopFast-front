import { WorkshopCollaboratorAttendance } from "../workshop-attendance/workshop-collaborator-attendance";

export interface Workshop {
  id: number;
  name: string;
  description: string;
  realizationDate: string;
  collaborators: WorkshopCollaboratorAttendance[]
}
