import { Collaborator } from "../collaborator/collaborator";
import { Workshop } from "../workshop/workshop";

export interface WorkshopAttendance {
  id: number;
  workshop: Workshop;
  collaborators: Collaborator[]
}
