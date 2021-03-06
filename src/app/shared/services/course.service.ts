import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {C} from '../models/c';
import {Observable} from 'rxjs';
import {CAddRequest} from '../models/c-add-request';
import {CourseAvailResponse} from '../models/course-avail-response';
import {CourseTokenResponse} from '../models/course-token-response';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private course: C,
  ) { }
  getC(): Observable<C[]>{
    return this.http.get<C[]>('/api/c/all');
  }
  getTeachC(): Observable<C[]>{
    return this.http.get<C[]>('/api/c/teach');
  }
  addC(addRequest: CAddRequest): Observable<any>{
    return this.http.post('/api/c/add', addRequest);
  }
  getAvailC(): Observable<CourseAvailResponse[]>{
    return this.http.get<CourseAvailResponse[]>('/api/c/avail');
  }
  getUngradedC(): Observable<CourseAvailResponse[]>{
    return this.http.get<CourseAvailResponse[]>('/api/c/ungraded');
  }
  getGradedC(): Observable<CourseTokenResponse[]>{
    return this.http.get<CourseTokenResponse[]>('/api/c/graded');
  }
  updateC(updRequest: CAddRequest): Observable<any>{
    return this.http.post('/api/c/update', updRequest);
  }
  delC(sno: string): Observable<any>{
    return this.http.delete(`/api/c/delete/${sno}`);
  }
  findByCno(cno: string): Observable<C>{
    return this.http.get<C>(`/api/c/info/${cno}`);
  }
}
