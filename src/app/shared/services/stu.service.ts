import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Stu} from '../models/stu';
import {Observable} from 'rxjs';
import {SAddRequest} from '../models/s-add-request';

@Injectable({
  providedIn: 'root'
})
export class StuService {

  constructor(
    private http: HttpClient,
    private stu: Stu
  ) {
  }
  getStu(): Observable<Stu[]>{
    return this.http.get<Stu[]>('/api/s/findall');
  }
  getOneStu(sno: string): Observable<Stu>{
    return this.http.get<Stu>(`/api/s/info/${sno}`);
  }
  addStu(addRequest: SAddRequest): Observable<any>{
    return this.http.post(`/api/s/add`, addRequest);
  }
  updateStu(upRequest: SAddRequest): Observable<any>{
    return this.http.post(`/api/s/update`, upRequest);
  }
  delStu(id: string): Observable<any>{
    return this.http.delete(`/api/s/delete/${id}`);
  }
}

