import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {T} from '../models/t';
import {Observable} from 'rxjs';
import {TAddRequest} from '../models/t-add-request';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http: HttpClient,
    private teacher: T) {
  }
  getT(): Observable<T[]>{
    return this.http.get<T[]>('/api/t/findall');
  }
  getOneT(tno: string): Observable<T>{
    return this.http.get<T>(`/api/t/info/${tno}`);
  }
  addT(addRequest: TAddRequest): Observable<any>{
    return this.http.post('/api/t/add', addRequest);
  }
  updateT(updRequest: TAddRequest): Observable<any>{
    return this.http.post(`/api/t/update`, updRequest);
  }
  delT(id: string): Observable<any>{
    return this.http.delete(`/api/t/delete/${id}`);
  }
}
