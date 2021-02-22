import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TAddRequest
{
  tno: string;
  tname: string;
  tdept: string;
  tclass: string;
  logn: string;
  pswd: string;
}
