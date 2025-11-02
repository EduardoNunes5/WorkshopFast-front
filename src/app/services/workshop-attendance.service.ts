import { CollaboratorId } from '../models/collaborator/collaborator-id';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Workshop } from '../models/workshop/workshop';
import { WorkshopFilter } from '../models/workshop/workshop-filter';

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

  // return collaborator???
  findAll(): Observable<Workshop[]> {
    return this.client.get<Workshop[]>(`${this.baseUrl}/${this.resource}`);
  }

  findAllV2() : Observable<Workshop[]> {
    return this.client.get<Workshop[]>(`${this.baseUrl}/v2/${this.resource}`);
  }

  findWorkshopsWithFilters(options: { params: HttpParams }) : Observable<Workshop[]> {
    return this.client.get<Workshop[]>(`${this.baseUrl}/${this.resource}`, options);
  }

  addColaborator(workshopId: number, workshopAttendanceId: number, collaboratorId: CollaboratorId) : Observable<void> {
    return this.client.put<void>(`${this.baseUrl}/workshops/${workshopId}/${this.resource}/${workshopAttendanceId}`, collaboratorId);
  }

  removeCollaborator(workshopAttendanceId: number, collaboratorId: number) : Observable<void> {
    return this.client.delete<void>(`${this.baseUrl}/${this.resource}/${workshopAttendanceId}/colaboradores/${collaboratorId}`);
  }

}
