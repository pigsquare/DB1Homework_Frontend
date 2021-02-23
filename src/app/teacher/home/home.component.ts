import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class TeacherHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navTo(url: string): void {
    this.router.navigateByUrl(url).then();
  }
}
