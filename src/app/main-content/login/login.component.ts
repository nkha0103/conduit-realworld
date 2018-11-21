import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/provider/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  lEmail = "";
  lPwd = "";
  lError: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.isLogin();
    this.loginForm = new FormGroup({
      loginEmail: new FormControl(),
      loginPassword: new FormControl(),
    });
  }

  isLogin() {
    let isLogin = localStorage.getItem('jwt');
    if (isLogin) {
      console.log('logged in');
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    console.log(this.loginForm);
    this.lEmail = this.loginForm.value.loginEmail;
    this.lPwd = this.loginForm.value.loginPassword;
    this.authenticationService.login(this.lEmail, this.lPwd)
    .subscribe(() => {
      this.router.navigate(['']);
    }, err => {
      this.lError = "email or password is invalid";
      console.log(this.lError);
    });
  }

}
