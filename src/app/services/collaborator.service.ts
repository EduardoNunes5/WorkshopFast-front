import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Collaborator } from '../models/collaborator/collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private resource;
  private baseUrl;

  constructor(private client: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.resource = "colaboradores";
  }

  create(collaborator: Collaborator): Observable<Collaborator> {
    return this.client.post<Collaborator>(`${this.baseUrl}/${this.resource}`, collaborator);
  }
}
