import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'https://67daf6521fd9e43fe4730832.mockapi.io/pets';

  constructor(private http: HttpClient) {}

  getPets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  adoptPet(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { adopted: true })
  }
}
