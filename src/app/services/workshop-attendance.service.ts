import { CollaboratorId } from '../models/collaborator/collaborator-id';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { WorkshopDetails } from '../models/workshop/workshop-details';
import { CollaboratorDetails } from '../models/collaborator/collaborator-details';
import { WorkshopAttendanceSaveResponse } from '../models/workshop-attendance/workshop-attendance-save-response';

@Injectable({
  providedIn: 'root'
})
export class WorkshopAttendanceService {

  private resource;
  private baseUrl;

  constructor(private client: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.resource = "atas";
  }

  create(workshopId: number): Observable<WorkshopAttendanceSaveResponse> {
    return this.client.post<WorkshopAttendanceSaveResponse>(`${this.baseUrl}/${this.resource}`, { id: workshopId});
  }

  findAll(): Observable<CollaboratorDetails[]> {
    return this.client.get<CollaboratorDetails[]>(`${this.baseUrl}/${this.resource}`);
  }

  findAllV2() : Observable<WorkshopDetails[]> {
    return this.client.get<WorkshopDetails[]>(`${this.baseUrl}/v2/${this.resource}`);
  }

  findWorkshopsWithFilters(options: { params: HttpParams }) : Observable<WorkshopDetails[]> {
    return this.client.get<WorkshopDetails[]>(`${this.baseUrl}/${this.resource}`, options);
  }

  addColaborator(workshopId: number, workshopAttendanceId: number, collaboratorId: CollaboratorId) : Observable<void> {
    return this.client.put<void>(`${this.baseUrl}/workshops/${workshopId}/${this.resource}/${workshopAttendanceId}`, collaboratorId);
  }

  removeCollaboratorByWorkshopAttendanceIdAndCollaboratorId(workshopAttendanceId: number, collaboratorId: number) : Observable<void> {
    return this.client.delete<void>(`${this.baseUrl}/${this.resource}/${workshopAttendanceId}/colaboradores/${collaboratorId}`);
  }

}
