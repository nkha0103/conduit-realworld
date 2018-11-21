import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainContentRoutingModule } from './main-content-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, SettingsComponent, ProfileComponent, EditorComponent, ArticleComponent],
  imports: [
    CommonModule,
    MainContentRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class MainContentModule { }
