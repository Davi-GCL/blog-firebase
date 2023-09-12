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
    FilterPipe
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
