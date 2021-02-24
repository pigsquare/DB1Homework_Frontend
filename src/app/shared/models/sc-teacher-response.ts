import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScTeacherResponse
{
  sno: string;
  sname: string;
  grade: number;
  point: number;
}
