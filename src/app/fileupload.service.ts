import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FileUploadService {

  result:any;

  constructor(private _http: Http) { }

  uploadFile(file: any) {
    return this._http.post("/api/file",file)
      //  .map(result => this.result = result.json().data)
       .subscribe();
  }

}
