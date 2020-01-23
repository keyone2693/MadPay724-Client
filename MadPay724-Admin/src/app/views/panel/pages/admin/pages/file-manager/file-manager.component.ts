import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  public view: string;
  public enablePersistence: boolean;
  public enableRtl: boolean;
  public hostUrl: string = environment.apiUrl;
  public ajaxSettings; 
  constructor() { }

  ngOnInit() {
    this.ajaxSettings = {
      url: this.hostUrl + environment.apiV1 + 'site/panel/admin/filemanager/operations',
      downloadUrl: this.hostUrl + 'site/panel/admin/filemanager/download',
      uploadUrl: this.hostUrl + 'site/panel/admin/filemanager/upload',
      getImageUrl: this.hostUrl + 'site/panel/admin/filemanager/getimage'
    };
    this.view = "LargeIcons";
    this.enablePersistence = true;
    this.enableRtl = true;
  }

}
