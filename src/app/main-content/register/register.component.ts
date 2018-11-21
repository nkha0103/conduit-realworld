import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/provider/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  regUserName = "";
  regEmail = "";
  regPassword = "";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLogin();
    this.registerForm = new FormGroup({
      registerUserName: new FormControl(),
      registerEmail: new FormControl(),
      registerPassword: new FormControl(),
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
    console.log(this.registerForm);
    this.regUserName = this.registerForm.value.registerUserName;
    this.regEmail = this.registerForm.value.registerEmail;
    this.regPassword = this.registerForm.value.registerPassword;
    this.authenticationService.register(this.regUserName, this.regEmail, this.regPassword)
      .subscribe((data) => {
        if (data) {
          this.authenticationService.login(this.regEmail, this.regPassword)
            .subscribe(() => {
              this.router.navigate(['/login']);
            })
        }
      })
  }
}
