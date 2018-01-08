import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { Base64UploadComponent } from './fileupload/base64-upload.component';
import { FileUploadService } from './fileupload.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng4FilesModule } from 'angular4-files-upload';
import { ProgressHttpModule } from "angular-progress-http";
import { AllSampleComponent } from './allsamples/allsamples.component';
import { AppRoutingModule } from './app-routing.module';
import { Sample1Component } from './sample1/sample1.component';
import { FormsModule }   from '@angular/forms'; //yy
import { Sample3Component } from './sample3/sample3.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSampleComponent,
    Base64UploadComponent,
    Sample1Component,
    Sample3Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    Ng4FilesModule,
    ProgressHttpModule,
    FormsModule, //yy
    AppRoutingModule
  ],
  providers: [DataService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
