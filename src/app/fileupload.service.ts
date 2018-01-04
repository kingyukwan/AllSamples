import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProgressHttp,Progress } from 'angular-progress-http';

@Injectable()
export class FileUploadService {

  result:any;

  constructor(private http: ProgressHttp) { }
  // getProgress(pProgress: Progress){
  //   this.http.withUploadProgressListener(progress=>{pProgress = progress; console.log(`Uploading ${progress.percentage}%`);});
  // }
  
  uploadFile(pProgress: Progress, file: any) {
    return this.http.withUploadProgressListener(progress=>{pProgress = progress; console.log(`Uploading ${progress.percentage}%`);})
                    .post("/api/file",file)
      //  .map(result => this.result = result.json().data)
       .subscribe();
  }

}
