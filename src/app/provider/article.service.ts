import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  dataUrl = 'https://conduit.productionready.io/api/articles?limit=10&offset=0';
  articleAPI = 'https://conduit.productionready.io/api/articles/';
  isFavor = new BehaviorSubject(null);
  favorCount = new BehaviorSubject(null);
  token: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.authenticationService.isAuthen.subscribe(() => {
      this.getToken();
    });
  }

  getToken() {
    this.token = localStorage.getItem('jwt');
  }

  //GET ARTICLES 
  getArticles() {
    return this.http.get(this.dataUrl);
  }

  //GET ARTICLES PAGINATION
  getPageArticles(page, limit) {
    const dataPage = 'https://conduit.productionready.io/api/articles';
    let currentPage = dataPage + "?limit=" + limit + "&offset=" + page;
    return this.http.get(currentPage);
  }

  //ADD FAVORITE
  addFavor(itemLink) {
    let addFavorUrl = this.articleAPI + itemLink + '/favorite';
    return this.http.post(addFavorUrl, {}, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  //UNFAVORITE
  unFavor(itemLink) {
    let unFavorUrl = this.articleAPI + itemLink + '/favorite';
    return this.http.delete(unFavorUrl, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  //GET CURRENT ARTICLES
  getCurrentArticle(articleLink) {
    let getlink = this.articleAPI + articleLink;
    if (this.token) {
      return this.http.get(getlink, {
        headers: {
          Authorization: "Token " + this.token,
        }
      });
    }
    return this.http.get(getlink);
  }

  //GET COMMENTS FROM ARTICLE
  getComments(articleLink) {
    let getlink = this.articleAPI + articleLink + "/comments";
    return this.http.get(getlink)
  }

  //ADD COMMENT
  addComment(articleLink, commentDetail) {
    let addlink = this.articleAPI + articleLink + "/comments";
    let body = {
      "comment": commentDetail,
    };
    console.log(body);
    return this.http.post(addlink, body, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  //DELETE COMMENT
  deleteComment(articleLink, commentId) {
    let rmlink = this.articleAPI + articleLink + "/comments/" + commentId;
    return this.http.delete(rmlink, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  //CREATE ARTICLE
  createArticle(articleDetail) {
    return this.http.post(this.articleAPI, articleDetail, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  //UPDATE ARTICLE
  updateArticle(updateData, articleLink) {
    let updateLink = this.articleAPI + articleLink;
    let body = {
      "article": updateData,
    }
    return this.http.put(updateLink, body, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }

  //DELETE ARTICLE
  deleteArticle(articleLink) {
    let deleteLink = this.articleAPI + articleLink;
    return this.http.delete(deleteLink, {
      headers: {
        Authorization: "Token " + this.token,
      }
    });
  }
}
