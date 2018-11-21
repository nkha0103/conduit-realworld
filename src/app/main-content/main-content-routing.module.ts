import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { AuthGuard } from '../guard/auth.guard';

const mainContentroutes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
  },
  {
    path: 'editor', component: EditorComponent, canActivate: [AuthGuard],
  },
  {
    path: 'editor/:article-slug', component: EditorComponent, canActivate: [AuthGuard],
  },
  {
    path: 'article/:article-slug', component: ArticleComponent,
  },
  {
    path: ':username', component: ProfileComponent,
  },
  {
    path: ':username/:favorites', component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainContentroutes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
