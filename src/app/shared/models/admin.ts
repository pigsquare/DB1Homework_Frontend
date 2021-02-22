import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Admin {
  id: string;
  name: string;
  password: string;
}
