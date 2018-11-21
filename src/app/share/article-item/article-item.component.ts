import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/provider/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() userName;
  @Input() userAva;
  @Input() articleDate;
  @Input() articleTitle;
  @Input() articleDesc;
  @Input() articleLink;
  @Input() articleFavorCount: number;
  @Input() articleTags;
  @Input() articleFavorCheck;
  isLogin = localStorage.getItem('jwt');

  constructor(
    private articleService: ArticleService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.articleFavorCheck);
  }

  favorControl() {
    if (!this.articleFavorCheck) {
      this.addFavor();
    } else {
      this.unFavor();
    }
  }

  addFavor() {
    if(!this.isLogin) {
      return this.router.navigate(['/login']);
    };
    this.articleService.addFavor(this.articleLink)
      .subscribe((data) => {
        console.log(data);
        if (!this.articleFavorCheck) {
          this.articleFavorCount += 1;
        }
        this.articleFavorCheck = true;
      })
  }

  unFavor() {
    if(!this.isLogin) {
      return this.router.navigate(['/login']);
    };
    this.articleService.unFavor(this.articleLink)
      .subscribe((data) => {
        console.log(data);
        if (this.articleFavorCheck) {
          this.articleFavorCount -= 1;
        }
        this.articleFavorCheck = false;
      })
  }
}