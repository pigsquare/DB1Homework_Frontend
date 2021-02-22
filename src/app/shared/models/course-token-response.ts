import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CourseTokenResponse
{
  cno: string;
  cname: string;
  grade: number;
  point: number;
}
