import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/provider/article.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  currentData: any;
  currentArticleLink = '';
  commentsData: any;
  loginCheck: boolean;
  followCheck: boolean;
  favorCheck: boolean;
  currentUser = localStorage.getItem('currentUser');
  commentForm: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.isLogin();

    if(this.loginCheck) {
      this.commentForm = new FormGroup({
        commentInput: new FormControl(),
      });
    }
    
    this.activatedRoute.params.subscribe((pr) => {
      this.currentArticleLink = pr['article-slug'];
      console.log(this.currentArticleLink);
      this.getCurrentArticle();
      this.getComments();
    })
  }

  getCurrentArticle() {
    this.articleService.getCurrentArticle(this.currentArticleLink)
    .subscribe((data: any) => {
      this.currentData = data;
      console.log(this.currentData);
    })
  }
  
  getComments() {
    this.articleService.getComments(this.currentArticleLink)
    .subscribe((data: any) => {
      this.commentsData = data;
      console.log(this.commentsData);
    })
  }

  isLogin() {
    if (this.currentUser) {
      console.log('logged in');
      this.loginCheck = true;
    } else {
      this.loginCheck = false;
    }
  }

  addComment() {
    let commentDetail: any = {};
    let commentBody = this.commentForm.controls.commentInput.value;
    if(commentBody != null && commentBody != "") {
      commentDetail.body = commentBody;
      this.articleService.addComment(this.currentArticleLink, commentDetail)
      .subscribe((data: any) => {
        console.log(data);
        this.commentsData.comments.unshift(data.comment);
        console.log(this.commentsData);
      });
    }
  };

  deleteCm(cmId, index) {
    this.articleService.deleteComment(this.currentArticleLink, cmId)
    .subscribe((res) => {
      if(res) {
      this.commentsData.comments.splice(index,1);
      }
    });
  }
}
