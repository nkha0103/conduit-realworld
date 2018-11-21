import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/provider/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileUserName: string;
  profileData: any;
  profileArticlesData: any;
  articlesTab = [
    "My Articles", "Favorited Articles"
  ]
  cTab = 1;
  page: number = 1;
  pages: Array<number>;
  pagiConfig = {
    'limit': 5,
  };
  currentUser = localStorage.getItem('currentUser');
  profileOwnerCheck: boolean;
  profileFollowCheck: boolean;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.userService.isFollow.subscribe((data) => {
      this.profileFollowCheck = data;
      console.log('follow = ' + this.profileFollowCheck);
    });
  }

  ngOnInit() {

    console.log(this.activatedRoute.snapshot);
    this.activatedRoute.params.subscribe((pr) => {
      this.profileUserName = pr['username'];
      this.profileUserName = this.profileUserName.slice(1);
      this.getProfile();
      this.isOwner();
      if (this.activatedRoute.snapshot.url.length == 2) {
        this.cTab = 2;
        this.getFavorArticles();
      } else {
        this.getProfileArticles();
      }
    });

    console.log(this.activatedRoute.snapshot);
  }

  isOwner() {
    if (this.profileUserName == this.currentUser) {
      this.profileOwnerCheck = true;
      console.log('this is your profile');
    } else {
      this.profileOwnerCheck = false;
      console.log('not your profile');
    }
  }

  //GET PROFILE
  getProfile() {
    this.userService.getProfile(this.profileUserName)
      .subscribe((data: any) => {
        console.log(data);
        this.profileData = data;
        if (this.profileData) {
          //CheckFollow
          this.userService.isFollow.next(this.profileData.profile.following);
        };
      });
  }

  //GET ARTICLES
  getProfileArticles() {
    this.isLoading = true;
    this.userService.getProfileArticles(this.profileUserName)
      .subscribe((data: any) => {
        console.log(data);
        this.profileArticlesData = data;
        let totalPage = Math.ceil((data['articlesCount'] / this.pagiConfig.limit));
        this.pages = new Array(totalPage);
        console.log(this.pages);
        this.isLoading = false;
      })
  }

  //GET FAVOR ARTICLES
  getFavorArticles() {
    this.isLoading = true;
    this.userService.getFavorArticles(this.profileUserName)
      .subscribe((data: any) => {
        console.log(data);
        this.profileArticlesData = data;
        let totalPage = Math.ceil((data['articlesCount'] / this.pagiConfig.limit));
        this.pages = new Array(totalPage);
        console.log(this.pages);
        this.isLoading = false;
      })
  }

  //TAB
  setTab(currentTab, event) {
    event.preventDefault();
    this.cTab = currentTab + 1;
    this.profileArticlesData = null;
    this.pages = null;
    console.log(this.cTab);
    if (this.cTab === 2) {
      this.getFavorArticles();
    } else {
      this.getProfileArticles();
    }
  }

  //PAGINATION MY ARTICLE
  setPageArticles(currentPage, event) {
    event.preventDefault();
    this.page = currentPage + 1;
    this.userService.getPageArticles(this.profileUserName, currentPage * this.pagiConfig.limit, this.pagiConfig.limit).subscribe((data) => {
      this.profileArticlesData = data;
    })
  }

  //PAGINATION MY ARTICLE
  setPageFaovArticles(currentPage, event) {
    event.preventDefault();
    this.page = currentPage + 1;
    this.userService.getPageFavorArticles(this.profileUserName, currentPage * this.pagiConfig.limit, this.pagiConfig.limit).subscribe((data) => {
      this.profileArticlesData = data;
    })
  }

  follow() {
    if (!this.currentUser) {
      return this.router.navigate(['/login']);
    };
    this.userService.followUser(this.profileUserName)
      .subscribe((data) => {
        // console.log(data);
        if (data && !this.profileFollowCheck) {
          this.userService.isFollow.next(true);
          // console.log(this.profileFollowCheck);
        }
      })
  }

  unfollow() {
    if (!this.currentUser) {
      return this.router.navigate(['/login']);
    };
    this.userService.unfollowUser(this.profileUserName)
      .subscribe((data) => {
        // console.log(data);
        if (data && this.profileFollowCheck) {
          this.userService.isFollow.next(false);
          // console.log(this.profileFollowCheck);
        }
      })
  }
}
