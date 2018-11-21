import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/provider/user.service';
import { ArticleService } from 'src/app/provider/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  articleForm: FormGroup;
  articleTags: Array<string> = [];
  newArticleData: any;
  currentArticleLink: string;
  currentArticleData: any;
  updateTags: Array<string> = [];
  isTagUpdate: boolean = false;

  constructor(
    // private userService: UserService,
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.articleForm = new FormGroup({
      articleTitle: new FormControl(),
      articleDesc: new FormControl(),
      articleContent: new FormControl(),
      articleTags: new FormControl(),
    });

    this.activatedRoute.params.subscribe((pr) => {
      this.currentArticleLink = pr['article-slug']
      if (this.currentArticleLink) {
        this.getCurrentArticle();
      }
    });
  }

  //ADD TAG
  addTag() {
    let tagInput = this.articleForm.controls.articleTags;
    if (!this.isTagUpdate) {
      this.updateTags = this.articleTags;
      this.updateTags.push(tagInput.value);
      tagInput.reset();
      return this.isTagUpdate = true;
    } else {
      this.updateTags.push(tagInput.value);
      tagInput.reset();
    }
  }

  //REMOVE TAG
  removeTag(index) {
    if (!this.isTagUpdate) {
      this.updateTags = this.articleTags;
      this.updateTags.splice(index, 1);
      console.log(this.updateTags);
      return this.isTagUpdate = true;
    } else {
      this.updateTags.splice(index, 1);
    }
  }

  //CREATE ARTICLE
  createArticle() {
    let form = this.articleForm.controls;
    this.newArticleData = {
      "article": {
        "title": form.articleTitle.value,
        "description": form.articleDesc.value,
        "body": form.articleContent.value,
        "tagList": this.articleTags,
      }
    };
    console.log(this.newArticleData);
    this.articleService.createArticle(this.newArticleData).subscribe((data: any) => {
      if (data) {
        this.router.navigate(['/article/' + data.article.slug]);
      }
    });
  };

  //UPDATE ARTICLE
  updateArticle() {
    let form = this.articleForm.controls;
    let updateArticleData: any = {};
    if (form.articleTitle.value != this.currentArticleData.article.title) {
      updateArticleData.title = form.articleTitle.value;
    };
    if (form.articleDesc.value != this.currentArticleData.article.description) {
      updateArticleData.description = form.articleDesc.value;
    };
    if (form.articleContent.value != this.currentArticleData.article.body) {
      updateArticleData.body = form.articleContent.value;
    };
    if (this.isTagUpdate) {
      updateArticleData.tagList = this.articleTags;
    }
    console.log(updateArticleData);
    console.log(Object.keys(updateArticleData).length);
    if (Object.keys(updateArticleData).length != 0) {
      console.log(Object.keys(updateArticleData).length);
      this.articleService.updateArticle(updateArticleData, this.currentArticleLink)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['', 'article', this.currentArticleLink]);
        });
    } else {
      alert('nothing to update');
    }

  }

  // ARTICLE SUBMIT
  pubArticle() {
    if (!this.currentArticleLink) {
      console.log('create');
      this.createArticle();
    } else {
      console.log('update');
      this.updateArticle();
    }
  };

  //GET CURRENT ARTICLE
  getCurrentArticle() {
    this.articleService.getCurrentArticle(this.currentArticleLink)
      .subscribe((data) => {
        this.currentArticleData = data;
        console.log(this.currentArticleData);
        this.setDetail();
      })
  }

  //SET ARTICLE DETAIL
  setDetail() {
    let form = this.articleForm.controls;
    form.articleTitle.setValue(this.currentArticleData.article.title);
    form.articleDesc.setValue(this.currentArticleData.article.description);
    form.articleContent.setValue(this.currentArticleData.article.body);
    this.articleTags = this.currentArticleData.article.tagList;
  }

}
