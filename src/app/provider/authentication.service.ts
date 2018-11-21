import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginURL = 'https://conduit.productionready.io/api/users/login';
  registerURL = "https://conduit.productionready.io/api/users";
  isAuthen = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  login(email, pwd) {
    let body = {
      "user": {
        "email": email,
        "password": pwd,
      }
    };
    return this.http.post(this.loginURL, body)
    .pipe(
      map((user: any) => {
        console.log(user);
        if(user && user.user.token) {
          localStorage.setItem('jwt', user.user.token);
          localStorage.setItem('currentUser', user.user.username);
          this.isAuthen.next(true);
          this.router.navigate(['']);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');
    this.isAuthen.next(false);
    this.router.navigate(['']);
  }

  register(username, email, pwd) {
    let body = {
      "user": {
        "username": username,
        "email": email,
        "password": pwd,
      }
    };
    return this.http.post(this.registerURL, body)
  }
}
