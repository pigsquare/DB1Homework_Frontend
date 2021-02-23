import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Admin} from '../models/admin';
import {AdminAddRequest} from '../models/admin-add-request';
import {AdminChangeRequest} from '../models/admin-change-request';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>('/api/admin/list');
  }
  addAdmin(addRequest: AdminAddRequest): Observable<any>{
    return this.http.post('/api/admin/add', addRequest);
  }
  updateAdmin(updRequest: AdminChangeRequest): Observable<any>{
    return this.http.post('/api/admin/change', updRequest);
  }
  delAdmin(id: string): Observable<any>{
    return this.http.delete(`/api/admin/delete/${id}`);
  }
}
