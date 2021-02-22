import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SAddRequest
{
  sno: string;
  sname: string;
  sex: string;
  age: number;
  sdept: string;
  logn: string;
  pswd: string;
}
