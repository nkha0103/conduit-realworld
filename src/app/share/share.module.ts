import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleItemComponent } from './article-item/article-item.component';
import { RouterModule } from '@angular/router';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticleCommentItemComponent } from './article-comment-item/article-comment-item.component';

@NgModule({
  declarations: [ArticleItemComponent, ArticleMetaComponent, ArticleCommentItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ArticleItemComponent,
    ArticleMetaComponent,
    ArticleCommentItemComponent,
  ],
})
export class ShareModule { }
