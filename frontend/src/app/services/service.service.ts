// src/app/services/service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  providerId: number;
}

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private apiUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  getById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  create(service: any): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  update(id: number, service: Partial<Service>): Observable<Service> {
    return this.http.patch<Service>(`${this.apiUrl}/${id}`, service);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Endpoint especial del backend: GET /providers/:id/services
  getServicesByProvider(providerId: number): Observable<Service[]> {
    return this.http.get<Service[]>(`http://localhost:3000/providers/${providerId}/services`);
  }
}