import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-change-pic',
  templateUrl: './user-change-pic.component.html',
  styleUrls: ['./user-change-pic.component.css']
})
export class UserChangePicComponent implements OnInit {
  @Output() getUserPhotoUrl = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(private authService: AuthService, private alertService: ToastrService) { }

  ngOnInit() {
   this.initializeUplaoder();
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

initializeUplaoder() {
  this.uploader = new FileUploader({
      url: this.baseUrl + 'site/admin/Users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      queueLimit: 1
  });

  this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
  this.uploader.onSuccessItem = (item, response, status, headers) => {
    if (response) {
      this.alertService.success('عکس پروفایل تغییر کرد', 'موفق');
      const res: Photo = JSON.parse(response);
     // this.user.photoUrl = res.url;
      this.getUserPhotoUrl.emit(res.url);
    }
  };

}

}
