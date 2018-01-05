import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule} from "@angular/forms";
import { FileUploadService } from '../fileupload.service';
import {
  Ng4FilesStatus,
  Ng4FilesSelected,
  Ng4FilesService,
  Ng4FilesConfig
} from 'angular4-files-upload';
import { Progress,ProgressHttp } from 'angular-progress-http';
// import{ FileUploader } from 'angular-file-upload';
@Component({
  selector: 'base64-upload',
  templateUrl: './base64-upload.component.html'
})
export class Base64UploadComponent {
  form: FormGroup;
  loading: boolean = false;
  percentage: number;
  filename: string = "";
  filesize: number=0;
  hasFile: boolean=false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
            private fileuploadservice: FileUploadService,
            private ng4FilesService: Ng4FilesService,
            private http: ProgressHttp
            // private fileUploader: FileUploader
          ) {
    this.createForm();
    // new fileUploader({url:""})
  }

  createForm() {
    this.form = this.fb.group({
      // name: ['', Validators],
      // ctlfilename:[Validators.required],
      avatar: null
    });
  }

//   onFileChange(event) {
//     let reader = new FileReader();
//     if(event.target.files && event.target.files.length > 0) {
//       let file = event.target.files[0];
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         this.form.get('avatar').setValue({
//           filename: file.name,
//           filetype: file.type,
//           value: reader.result.split(',')[1]
//         })
//       };
//     }
//   }
onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    // input.append('name', this.form.get('name').value);
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }
  onSubmit() {
    // const formModel = this.form.value;
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    // setTimeout(() => {
    //   console.log(formModel);
    //   alert('done!');
    //   this.loading = false;
    // }, 1000);
    // this.fileuploadservice.getProgress(this.progress);
    // this.fileuploadservice.uploadFile(this.progress,formModel);
    return this.http.withUploadProgressListener(progress=>this.updateProgress(progress))
                    .post("/api/file",formModel)
                    //  .map(result => this.result = result.json().data)
                    .subscribe();


  }
  updateProgress(progress: Progress){
    this.percentage = progress.percentage;
    console.log(`Uploading ${this.percentage}%`);
    if(this.percentage == 100) this.loading = false;
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    // this.fileInput.nativeElement.value = '';
    this.filename = "";
    this.filesize = 0;
    this.hasFile = false;
    this.percentage = 0;
  }

  
public selectedFiles;
public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = 'invalid file !!';
      // this.selectedFiles = selectedFiles.status;
      return;
      
      // Hnadle error statuses here
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    if(selectedFiles.files.length > 0) {
      let file = selectedFiles.files[0];
      this.form.get('avatar').setValue(file);
      this.filename = file.name;
      this.filesize = file.size;
      this.hasFile = true;
    }
    // this.filename = this.selectedFiles.files[0].filename;
  }

  private testConfig: Ng4FilesConfig = {
    acceptExtensions: ['xls', 'xlsx'],
    maxFilesCount: 1,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };

  ngOnInit() {
    this.ng4FilesService.addConfig(this.testConfig);
  }
}