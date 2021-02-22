import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CAddRequest
{
  cno: string;
  cname: string;
  credit: number;
  cdept: string;
}
