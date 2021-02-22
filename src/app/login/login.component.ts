import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('username') usernameRef: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordRef: ElementRef<HTMLInputElement>;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if (this.loginForm.valid){
      this.loginForm.disable();
      this.authService
        .login(this.loginForm.value)
        .subscribe((data) => {
          console.log(data);
          this.authService.saveToken(data.token);
          this.authService.saveUser(data);
          this.snackBar.open('success', undefined, {duration: 2000});
          switch (data.role) {
            case 'ROLE_S': {
              this.router.navigateByUrl('/s')
                .then(r => this.snackBar.open('Student logged in.', undefined, {duration: 2000}));
              break;
            }
            case 'ROLE_T': {
              this.router.navigateByUrl('/t')
                .then(r => this.snackBar.open('Teacher logged in.', undefined, {duration: 2000}));
              break;
            }
            case 'ROLE_A': {
              this.router.navigateByUrl('/admin')
                .then(r => this.snackBar.open('Admin logged in.', undefined, {duration: 2000}));
              break;
            }
          }
        },
          (err: HttpErrorResponse) => {
            this.loginForm.enable();
            this.passwordRef.nativeElement.select();
            this.passwordRef.nativeElement.focus();
            console.log(err);
            if (err.status === 400) {
              this.snackBar.open(err.error.message, undefined, { duration: 5000 });
            } else if (err.status > 0) {
              this.snackBar.open(`${err.statusText} (${err.status})`, undefined, { duration: 5000 });
            } else {
              this.snackBar.open('出现了网络错误，请稍后重试…', undefined, { duration: 5000 });
            }
          });
    }
  }

}
