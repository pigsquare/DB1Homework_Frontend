import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {AuthTokenRequest} from '../models/auth-token-request';
import {AuthTokenResponse} from '../models/auth-token-response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User|null;

  constructor(private http: HttpClient,
              private router: Router) { }
  login(authTokenRequest: AuthTokenRequest): Observable<AuthTokenResponse> {
    console.log('Trying logging in: ' + authTokenRequest);
    return this.http.post<AuthTokenResponse>('/api/login', authTokenRequest);
  }
  getToken(): string | null {
    return window.localStorage.getItem('token');
  }
  saveToken(token: string): void {
    window.localStorage.setItem('token', token);
  }
  saveUser(authTokenResponse: AuthTokenResponse): void{
    window.localStorage.setItem('user_role', authTokenResponse.role);
    window.localStorage.setItem('user_id', authTokenResponse.id);
    window.localStorage.setItem('user_name', authTokenResponse.name);
    window.localStorage.setItem('expr', String(authTokenResponse.expiration));
  }
  destroyToken(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_role');
    window.localStorage.removeItem('user_id');
    window.localStorage.removeItem('user_name');
    window.localStorage.removeItem('expr');
    this.router.navigateByUrl('').then(r => null);
  }

}
