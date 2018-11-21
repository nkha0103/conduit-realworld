import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/provider/article.service';
import { UserService } from 'src/app/provider/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent implements OnInit {
  @Input() userName;
  @Input() userAva;
  @Input() articleLink;
  @Input() articleDate;
  @Input() articleFavorCount;
  @Input() articleFavorCheck;
  @Input() articleAuthorFollowCheck;
  currentUser = localStorage.getItem('currentUser');
  articleOwnerCheck: boolean;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router,
  ) {

    this.userService.isFollow.subscribe((data) => {
      this.articleAuthorFollowCheck = data;
      // console.log('follow = ' + this.articleAuthorFollowCheck);
    });
    this.articleService.isFavor.subscribe((data) => {
      this.articleFavorCheck = data;
      // console.log('favor = ' + this.articleFavorCheck);
    });
    this.articleService.favorCount.subscribe((data) => {
      this.articleFavorCount = data;
      // console.log('favor Count = ' + this.articleFavorCount);
    });
  }

  ngOnInit() {
    this.isOwner();
    this.userService.isFollow.next(this.articleAuthorFollowCheck);
    this.articleService.isFavor.next(this.articleFavorCheck);
    this.articleService.favorCount.next(this.articleFavorCount);
  }

  isOwner() {
    if (this.userName == this.currentUser) {
      this.articleOwnerCheck = true;
      // console.log('this is your article');
    } else {
      this.articleOwnerCheck = false;
      // console.log('not owner');
    }
  }

  addFavor() {
    if(!this.currentUser) {
      return this.router.navigate(['/login']);
    }
    this.articleService.addFavor(this.articleLink)
      .subscribe((data) => {
        // console.log(data);
        if (!this.articleFavorCheck) {
          this.articleService.favorCount.next(this.articleFavorCount +=1);
        }
        this.articleService.isFavor.next(true);
        // console.log('favor = ' + this.articleFavorCheck);
      })
  }

  unFavor() {
    if(!this.currentUser) {
      return this.router.navigate(['/login']);
    }
    this.articleService.unFavor(this.articleLink)
      .subscribe((data) => {
        // console.log(data);
        if (this.articleFavorCheck) {
          this.articleService.favorCount.next(this.articleFavorCount -=1);
        }
        this.articleService.isFavor.next(false);
        // console.log('favor = ' + this.articleFavorCheck);
      })
  }

  followAuthor() {
    if(!this.currentUser) {
      return this.router.navigate(['/login']);
    }
    this.userService.followUser(this.userName)
      .subscribe((data) => {
        // console.log(data);
        if (data && !this.articleAuthorFollowCheck) {
          this.userService.isFollow.next(true);
          // console.log(this.articleAuthorFollowCheck);
        }
      })
  }

  unfollowAuthor() {
    if(!this.currentUser) {
      return this.router.navigate(['/login']);
    }
    this.userService.unfollowUser(this.userName)
      .subscribe((data) => {
        // console.log(data);
        if (data && this.articleAuthorFollowCheck) {
          this.userService.isFollow.next(false);
          // console.log(this.articleAuthorFollowCheck);
        }
      })
  }

  editArticle() {
    console.log(this.articleLink);
    this.router.navigate(['/editor/', this.articleLink]);
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.articleLink)
    .subscribe(() => {
      this.router.navigate(['/']);
    })
  }

}
