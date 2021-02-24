import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GradeStuRequest
{
  sno: string;
  cno: string;
  score: number;
}
