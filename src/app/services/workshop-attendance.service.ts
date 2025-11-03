import { CollaboratorId } from '../models/collaborator/collaborator-id';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { WorkshopWithCollaborators } from '../models/workshop/workshop-collaborator';
import { CollaboratorSummary } from '../models/collaborator/collaborator-summary';

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

  findAll(): Observable<CollaboratorSummary[]> {
    return this.client.get<CollaboratorSummary[]>(`${this.baseUrl}/${this.resource}`);
  }

  findAllV2() : Observable<WorkshopWithCollaborators[]> {
    return this.client.get<WorkshopWithCollaborators[]>(`${this.baseUrl}/v2/${this.resource}`);
  }

  findWorkshopsWithFilters(options: { params: HttpParams }) : Observable<WorkshopWithCollaborators[]> {
    return this.client.get<WorkshopWithCollaborators[]>(`${this.baseUrl}/${this.resource}`, options);
  }

  addColaborator(workshopId: number, workshopAttendanceId: number, collaboratorId: CollaboratorId) : Observable<void> {
    return this.client.put<void>(`${this.baseUrl}/workshops/${workshopId}/${this.resource}/${workshopAttendanceId}`, collaboratorId);
  }

  removeCollaboratorByWorkshopAttendanceIdAndCollaboratorId(workshopAttendanceId: number, collaboratorId: number) : Observable<void> {
    return this.client.delete<void>(`${this.baseUrl}/${this.resource}/${workshopAttendanceId}/colaboradores/${collaboratorId}`);
  }

}
