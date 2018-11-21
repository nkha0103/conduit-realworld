import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentItemComponent } from './article-comment-item.component';

describe('ArticleCommentItemComponent', () => {
  let component: ArticleCommentItemComponent;
  let fixture: ComponentFixture<ArticleCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
