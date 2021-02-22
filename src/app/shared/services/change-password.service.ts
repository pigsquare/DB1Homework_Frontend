import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChangePasswordRequest} from '../models/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private http: HttpClient
  ) { }

  changeP(request: ChangePasswordRequest): Observable<any>{
    let url = '';
    if (window.localStorage.getItem('user_role') === 'ROLE_T') {
      url = '/api/t/changepassword';
    }
    if (window.localStorage.getItem('user_role') === 'ROLE_S') {
      url = '/api/s/changepassword';
    }
    if (window.localStorage.getItem('user_role') === 'ROLE_A') {
      url = '/api/admin/changepassword';
    }
    return this.http.post(url, request);
  }

}
