import { WorkshopCollaboratorAttendance } from "../workshop-attendance/workshop-collaborator-attendance";

export interface WorkshopWithCollaborators {
  id: number;
  name: string;
  description: string;
  realizationDate: string;
  collaborators: WorkshopCollaboratorAttendance[]
}
