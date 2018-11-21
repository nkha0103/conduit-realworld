import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  dataURL = "https://conduit.productionready.io/api/user"
  profileURL = "https://conduit.productionready.io/api/profiles/"
  articlesURL = "https://conduit.productionready.io/api/articles?limit=5&offset=0&author=";
  feedArticlesURL = "https://conduit.productionready.io/api/articles/feed"
  favorArticlesURL = "https://conduit.productionready.io/api/articles?limit=5&offset=0&favorited=";
  token: any;
  isFollow = new BehaviorSubject(null);


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.authenticationService.isAuthen.subscribe(() => {
      this.getToken();
    })
  }

  getToken() {
    this.token = localStorage.getItem('jwt');
  }

  getUser() {
    return this.http.get(this.dataURL, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  updateUser(updateInfo) {
    let body = {
      "user": updateInfo,
    };
    // console.log(body);
    return this.http.put(this.dataURL, body, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  getProfile(username) {
    let currenProfile = this.profileURL + username;
    if (this.token) {
      return this.http.get(currenProfile, {
        headers: {
          Authorization: "Token " + this.token,
        }
      });
    }
    return this.http.get(currenProfile);
  }

  getFeedArticles() {
    let profileArticles = this.feedArticlesURL;
    return this.http.get(profileArticles, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  getProfileArticles(username) {
    let ProfilerArticles = this.articlesURL + username;
    if (this.token) {
      return this.http.get(ProfilerArticles, {
        headers: {
          Authorization: "Token " + this.token,
        }
      });
    };
    return this.http.get(ProfilerArticles);
  }

  getFavorArticles(username) {
    let favorArticles = this.favorArticlesURL + username;
    if (this.token) {
      return this.http.get(favorArticles, {
        headers: {
          Authorization: "Token " + this.token,
        }
      });
    };
    return this.http.get(favorArticles);
  }

  getPageArticles(username, page, limit) {
    const dataPage = 'https://conduit.productionready.io/api/articles';
    let currentPage = dataPage + "?limit=" + limit + "&offset=" + page + "&author=" + username;
    return this.http.get(currentPage);
  }

  getPageFavorArticles(username, page, limit) {
    const dataPage = 'https://conduit.productionready.io/api/articles';
    let currentPage = dataPage + "?limit=" + limit + "&offset=" + page + "&favorited=" + username;
    return this.http.get(currentPage);
  }

  followUser(username) {
    let followAPI = this.profileURL + username + '/follow';
    return this.http.post(followAPI, {}, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  unfollowUser(username) {
    let followAPI = this.profileURL + username + '/follow';
    return this.http.delete(followAPI, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }
}
