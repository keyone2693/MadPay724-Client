import { OnInit, Input, Output, EventEmitter, Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { Photo } from 'src/app/data/models/photo';
import { Store } from '@ngrx/store';

import * as fromStore from 'src/app/store';

@Component({
  selector: 'app-user-change-pic',
  templateUrl: './user-change-pic.component.html',
  styleUrls: ['./user-change-pic.component.css']
})
export class UserChangePicComponent implements OnInit {
  // @Output() getUserPhotoUrl = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl + environment.apiV1;
  constructor(private authService: AuthService,
    private alertService: ToastrService,
    private store: Store<fromStore.State>) { }

  ngOnInit() {
  this.initializeUplaoder();
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUplaoder() {
    let userId = '';
    this.store.select(fromStore.getUserId).subscribe(data => {
      userId = data;
    });
  this.uploader = new FileUploader({
    url: this.baseUrl + 'site/panel/users/' + userId + '/photos',
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
      this.store.dispatch(new fromStore.EditLoggedUserPhotoUrl(res.url));
    }
  };

}

}
