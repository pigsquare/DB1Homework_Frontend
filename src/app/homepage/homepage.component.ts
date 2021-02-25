import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navToIndex(): void{
    let url = '/login';
    if (window.localStorage.getItem('user_role') === 'ROLE_T') {
      url = '/t';
    }
    if (window.localStorage.getItem('user_role') === 'ROLE_S') {
      url = '/s';
    }
    if (window.localStorage.getItem('user_role') === 'ROLE_A') {
      url = '/admin';
    }
    this.router.navigateByUrl(url).then();
  }
  navToLogin(): void{
    this.router.navigateByUrl('/login').then();
  }

}
