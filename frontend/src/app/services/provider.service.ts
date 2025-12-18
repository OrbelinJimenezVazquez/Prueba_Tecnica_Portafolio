// src/app/services/provider.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Provider {
  id: number;
  name: string;
  contactEmail: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private apiUrl = 'http://localhost:3000/providers';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl);
  }

  create(provider: Omit<Provider, 'id' | 'createdAt'>): Observable<Provider> {
    return this.http.post<Provider>(this.apiUrl, provider);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<Provider> {
  return this.http.get<Provider>(`${this.apiUrl}/${id}`);
  }

  update(id: number, provider: Partial<Provider>): Observable<Provider> {
    return this.http.patch<Provider>(`${this.apiUrl}/${id}`, provider);
  }

}