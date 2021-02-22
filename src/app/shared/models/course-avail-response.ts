import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CourseAvailResponse{
  cno: string;
  cname: string;
  credit: number;
  cdept: string;
  tname: string;
}
