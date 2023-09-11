import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatePostPageComponent } from './comps/pages/create-post-page/create-post-page.component';
import { HomePageComponent } from './comps/pages/home-page/home-page.component';
import { PostPageComponent } from './comps/pages/post-page/post-page.component';

const routes: Routes = [
  {path:'',component: HomePageComponent},
  {path:'new-post',component: CreatePostPageComponent},
  {path:'post/:id',component:PostPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
