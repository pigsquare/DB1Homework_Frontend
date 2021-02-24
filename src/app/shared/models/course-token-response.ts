import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CourseTokenResponse
{
  cno: string;
  cname: string;
  credit: number;
  grade: number;
  point: number;
}
