import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatePostPageComponent } from './comps/pages/create-post-page/create-post-page.component';
import { HomePageComponent } from './comps/pages/home-page/home-page.component';
import { PostPageComponent } from './comps/pages/post-page/post-page.component';
import { EditPostComponent } from './comps/pages/edit-post/edit-post.component';
import { AboutPageComponent } from './comps/pages/about-page/about-page.component';

const routes: Routes = [
  {path:'',component: HomePageComponent},
  {path:'new-post',component: CreatePostPageComponent},
  {path:'post/:id',component:PostPageComponent},
  {path:'edit-post/:id',component:EditPostComponent},
  {path:'about',component:AboutPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
