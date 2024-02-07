import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAreaComponent } from './comps/login-area/login-area.component';
import { InputImageComponent } from './comps/input-image/input-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCreatePostComponent } from './comps/form-create-post/form-create-post.component';
import { CreatePostPageComponent } from './comps/pages/create-post-page/create-post-page.component';
import { HomePageComponent } from './comps/pages/home-page/home-page.component';
import { NavbarComponent } from './comps/navbar/navbar.component';
import { PostPageComponent } from './comps/pages/post-page/post-page.component';
import { EditPostComponent } from './comps/pages/edit-post/edit-post.component';
import { FilterPipe } from './filter.pipe';
import { AboutPageComponent } from './comps/pages/about-page/about-page.component';
import { FormFilterComponent } from './comps/form-filter/form-filter.component';
import { AlertGroupComponent } from './comps/alert-group/alert-group.component';
import { AuthModalComponent } from './comps/auth-modal/auth-modal.component';
import { CommentCardComponent } from './comps/comment-card/comment-card.component';
import { PostCardComponent } from './comps/post-card/post-card.component';
import { LikeButtonComponent } from './comps/like-button/like-button.component';
import { LoadingMessageComponent } from './comps/loading-message/loading-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAreaComponent,
    InputImageComponent,
    FormCreatePostComponent,
    CreatePostPageComponent,
    HomePageComponent,
    NavbarComponent,
    PostPageComponent,
    EditPostComponent,
    FilterPipe,
    AboutPageComponent,
    FormFilterComponent,
    AlertGroupComponent,
    AuthModalComponent,
    CommentCardComponent,
    PostCardComponent,
    LikeButtonComponent,
    LoadingMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
