import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'comics', component: ComicsComponent},
  {path: 'comic-detail/:id', component: ComicDetailComponent},
  {path: 'search/:tag', component: SearchComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'help', component: HelpComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'comics'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
