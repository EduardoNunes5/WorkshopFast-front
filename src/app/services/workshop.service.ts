import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Workshop } from '../models/workshop/workshop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  private resource;
  private baseUrl;

  constructor(private client: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.resource = "workshops";
  }

  create(workshop: Workshop): Observable<Workshop> {
    return this.client.post<Workshop>(`${this.baseUrl}/${this.resource}`, workshop);
  }
}
