import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SGradeResponse
{
  cno: string;
  cname: string;
  grade: number;
  tname: string;
}
