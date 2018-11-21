import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/provider/authentication.service';
import { UserService } from 'src/app/provider/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  usersData: any;
  settingForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.settingForm = new FormGroup({
      settingAvatar: new FormControl(),
      settingUserName: new FormControl(),
      settingBio: new FormControl(),
      settingEmail: new FormControl(),
      settingPassword: new FormControl(),
    });
    this.getUser();
  }

  getUser() {
    this.userService.getUser()
      .subscribe((data: any) => {
        this.usersData = data;
        this.setDefault();
      })
  }

  setDefault() {
    console.log(this.usersData);
    let form = this.settingForm.controls
    form.settingAvatar.setValue(this.usersData.user.image);
    form.settingUserName.setValue(this.usersData.user.username);
    form.settingBio.setValue(this.usersData.user.bio);
    form.settingEmail.setValue(this.usersData.user.email);
  }

  updateUser() {
    let form = this.settingForm.controls
    let updateinfo: any = {};
    let updatePassword = form.settingPassword.value;

    updateinfo.image = form.settingAvatar.value;
    updateinfo.username = form.settingUserName.value;
    updateinfo.bio = form.settingBio.value;
    updateinfo.email = form.settingEmail.value;

    if (updatePassword != null && updatePassword != "") {
      updateinfo.password = updatePassword;
    };
    console.log(updateinfo);
    this.userService.updateUser(updateinfo).subscribe(() => {
      this.router.navigate(['@'+ this.usersData.user.username]);
    });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
