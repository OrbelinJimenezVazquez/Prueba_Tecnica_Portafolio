// src/app/services/rate.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/rates';

  create(rateData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rateData);
  }

  getRatesByService(serviceId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/services/${serviceId}/rates`);
  }

  update(id: number, rateData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, rateData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}