import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Base64UploadComponent } from './fileupload/base64-upload.component';
import { AllSampleComponent } from './allsamples/allsamples.component';
import { Sample1Component } from './sample1/sample1.component';
import { Sample3Component } from './sample3/sample3.component';

const routes: Routes = [
  { path: '', redirectTo: '/allsamples', pathMatch: 'full' },
  { path: 'allsamples', component: AllSampleComponent },
  { path: 'sample1', component: Sample1Component },
  { path: 'sample2', component: Base64UploadComponent },
  { path: 'sample3', component: Sample3Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
