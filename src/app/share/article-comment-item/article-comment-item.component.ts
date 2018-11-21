import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/provider/article.service';

@Component({
  selector: 'app-article-comment-item',
  templateUrl: './article-comment-item.component.html',
  styleUrls: ['./article-comment-item.component.css']
})
export class ArticleCommentItemComponent implements OnInit {
  @Input() cmId;
  @Input() cmDate;
  @Input() cmBody;
  @Input() cmAuthor;
  @Input() articleLink;
  currentUser = localStorage.getItem('currentUser');
  cmOwnerCheck: boolean;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.isOwner();
  }

  isOwner() {
    if(this.cmAuthor.username == this.currentUser) {
      this.cmOwnerCheck = true;
    } else {
      this.cmOwnerCheck = false;
    }
    // console.log(this.cmOwnerCheck);
  }

  deleteCm() {
    console.log(this.articleLink);
    this.articleService.deleteComment(this.articleLink, this.cmId)
    .subscribe();
  }
}
