import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/provider/article.service';
import { TagService } from 'src/app/provider/tag.service';
import { UserService } from 'src/app/provider/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: any;
  tags: any;
  page: number = 1;
  pages: Array<number>;
  pagiConfig = {
    'limit': 10,
  }
  homeTab = [
    "Global Feed"
  ]
  cTab = 1;
  currentUser: any;
  loginCheck;
  isLoading: boolean = false;

  constructor(
    private articleService: ArticleService,
    private tagService: TagService,
    private userService: UserService,
  ) { 
    this.loginCheck = localStorage.getItem('jwt');
  }

  ngOnInit() {
    this.isLogin();
  }

  // GET ARTICLE
  getArticles() {
    this.isLoading = true;
    this.articles = this.articleService.getArticles()
      .subscribe((data: any) => {
        this.articles = data;
        let totalPage = Math.ceil((data['articlesCount'] / this.pagiConfig.limit));
        this.pages = new Array(totalPage);
        console.log(this.pages);
        this.isLoading = false;
      })
  }

  // GET User ARTICLE
  getUserFeedArticles() {
    this.isLoading = true;
    this.articles = this.userService.getFeedArticles()
      .subscribe((data: any) => {
        this.articles = data;
        let totalPage = Math.ceil((data['articlesCount'] / this.pagiConfig.limit));
        this.pages = new Array(totalPage);
        console.log(this.pages);
        this.isLoading = false;
      })
  }

  // GET TAG
  getTags() {
    this.tags = this.tagService.getTag()
      .subscribe((data) => {
        this.tags = data;
        console.log(this.tags);
      })
  }

  //PAGINATION 
  setPage(currentPage, event) {
    event.preventDefault();
    this.page = currentPage + 1;
    this.articleService.getPageArticles(currentPage * this.pagiConfig.limit, this.pagiConfig.limit)
      .subscribe((data) => {
        this.articles = data;
      })
  }

  isLogin() {
    if (this.loginCheck) {
      this.homeTab = [
        "Your Feed", "Global Feed"
      ];
      this.cTab = 1;
      console.log('logged in');
      this.userService.getUser()
        .subscribe((data: any) => {
          this.currentUser = data;
          this.getUserFeedArticles();
        })
    } else {
      this.getArticles();
    };
    this.getTags();
  }

  //TAB
  setTab(currentTab, event) {
    event.preventDefault();
    this.cTab = currentTab + 1;
    this.articles = null;
    this.pages = null;
    console.log(this.cTab);
    if (this.cTab === 2) {
      this.getArticles();
    } else {
      this.getUserFeedArticles();
    }
  }
}
