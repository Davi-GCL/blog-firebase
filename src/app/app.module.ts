import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAreaComponent } from './comps/login-area/login-area.component';
import { BtnUploadImageComponent } from './comps/btn-upload-image/btn-upload-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreatePostComponent } from './comps/form-create-post/form-create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAreaComponent,
    BtnUploadImageComponent,
    FormCreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
