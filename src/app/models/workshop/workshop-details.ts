import { CollaboratorWorkshopAttendance } from "../collaborator/workshop-collaborator-attendance";

export interface WorkshopDetails {
  id: number;
  name: string;
  description: string;
  realizationDate: string;
  collaborators: CollaboratorWorkshopAttendance[]
}
