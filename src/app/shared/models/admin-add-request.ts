import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminAddRequest {
  id: string;
  name: string;
  password: string;
}
