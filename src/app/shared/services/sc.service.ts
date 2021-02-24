import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ScTeacherResponse} from '../models/sc-teacher-response';
import {GradeStuRequest} from '../models/grade-stu-request';

@Injectable({
  providedIn: 'root'
})
export class ScService {

  constructor(
    private http: HttpClient,
  ) { }

  getFromT(cno: string): Observable<ScTeacherResponse[]>{
    return this.http.get<ScTeacherResponse[]>(`/api/sc/stu/${cno}`);
  }

  postScore(req: GradeStuRequest): Observable<any>{
    return this.http.post('/api/sc/grade', req);
  }

}
