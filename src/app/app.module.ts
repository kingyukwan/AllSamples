import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { Base64UploadComponent } from './fileupload/base64-upload.component';
import { FileUploadService } from './fileupload.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng4FilesModule } from 'angular4-files-upload';

@NgModule({
  declarations: [
    AppComponent,
    Base64UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    Ng4FilesModule
  ],
  providers: [DataService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
