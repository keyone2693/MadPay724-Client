import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { L10n } from '@syncfusion/ej2-base';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  view: string;
  enablePersistence: boolean;
  enableRtl: boolean;
  hostUrl: string = environment.apiUrl;
  locale: string;
  ajaxSettings: any;

  constructor(private authService: AuthService) {
    this.subManager.add(
      this.authService.getNewRefreshToken().subscribe()
    );
  }

  ngOnInit() {
    this.loadFa();
    this.ajaxSettings = {
      url: this.hostUrl + environment.apiV1 + 'site/panel/admin/filemanager/operations',
      downloadUrl: this.hostUrl + environment.apiV1 + 'site/panel/admin/filemanager/download',
      uploadUrl: this.hostUrl + environment.apiV1 + 'site/panel/admin/filemanager/upload',
      getImageUrl: this.hostUrl + environment.apiV1 + 'site/panel/admin/filemanager/getimage'
    };
    this.view = 'LargeIcons';
    this.enablePersistence = true;
    this.enableRtl = true;
    this.locale = 'fa';
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadFa() {
    L10n.load({
      'fa': {
        'filemanager': {
          'NewFolder': 'پوشه جدید',
          'Upload': 'آپلود',
          'Delete': 'حذف',
          'Rename': 'تغییر نام',
          'Download': 'دانلود',
          'Cut': 'انتقال',
          'Copy': 'کپی',
          'Paste': 'جایگذاری',
          'SortBy': 'مرتب کردن ',
          'Refresh': 'رفرش',
          'Item-Selection': 'انتخاب',
          'Items-Selection': 'انتخاب',
          'View': 'نمایش',
          'Details': 'جزییات',
          'SelectAll': 'انتخاب همه',
          'Open': 'بازکردن',
          'Tooltip-NewFolder': 'پوشه جدید',
          'Tooltip-Upload': 'آپلود',
          'Tooltip-Delete': 'حذف',
          'Tooltip-Rename': 'تغییر نام',
          'Tooltip-Download': 'دانلود',
          'Tooltip-Cut': 'انتقال',
          'Tooltip-Copy': 'کپی',
          'Tooltip-Paste': 'جایگذاری',
          'Tooltip-SortBy': 'مرتب کردن',
          'Tooltip-Refresh': 'رفرش',
          'Tooltip-Selection': 'انتخاب',
          'Tooltip-View': 'نمایش',
          'Tooltip-Details': 'جزییات',
          'Tooltip-SelectAll': 'انتخاب همه',
          'Name': 'نام',
          'Size': 'سایز',
          'DateModified': 'تاریخ تغییر',
          'DateCreated': 'تاریخ ایجاد',
          'Path': 'مسیر',
          'Modified': 'تغییر کرده',
          'Created': 'ایجاد شده',
          'Location': 'موقعیت',
          'Type': 'نوع',
          'Permission': 'اجازه',
          'Ascending': 'صعودی',
          'Descending': 'نزولی',
          'View-LargeIcons': 'آیکن بزرگ',
          'View-Details': 'جزییات',
          'Search': 'جست و جو',
          'Button-Ok': 'اوکی',
          'Button-Cancel': 'کنسل',
          'Button-Yes': 'بله',
          'Button-No': 'نه',
          'Button-Create': 'ایجاد',
          'Button-Save': 'ذخیره',
          'Header-NewFolder': 'پوشه جدید',
          'Content-NewFolder': 'نام پوشه خود را وارد کنید',
          'Header-Rename': 'تغییر نام',
          'Content-Rename': 'نام جدید خود را وارد کنید',
          'Header-Rename-Confirmation': 'تغییر نام را تایید کنید',
          'Content-Rename-Confirmation': 'اگر پسوند نام فایل را تغییر دهید ، ممکن است فایل ناپایدار شود. آیا مطمئن هستید که می خواهید آنها را تغییر دهید؟',
          'Header-Delete': 'حذف',
          'Content-Delete': 'آیا میخواهید این فایل / پوشه را حذف کنید ؟',
          'Header-Multiple-Delete': 'حذف چندین فایل / پوشه',
          'Content-Multiple-Delete': 'آیا میخواهید این {0} فایل / پوشه را حذف کنید ؟',
          'Header-Duplicate': 'فایل / پوشه وجود دارد',
          'Content-Duplicate': '{0} در حال حاضر وجود دارد. آیا می خواهید تغییر نام دهید و وارد کنید؟',
          'Header-Upload': 'آپلود فایل',
          'Error': 'خطا',
          'Validation-Empty': 'نام فایل یا فولدر نمیتواند خالی باشد',
          'Validation-Invalid': 'نام فایل یا پوشه {0} حاوی حروف نامعتبر است. لطفاً از نام دیگری استفاده کنید نام فایل یا پوشه معتبر نمی تواند با یک حرف ممنوعه یا فضای خالی خاتمه یابد و نمی تواند هیچ یک از حروف زیر را شامل شود: \\ /: *؟ \'<> |',
          'Validation-NewFolder-Exists': 'فایل یا پوشه ای به نام {0} از قبل موجود است.',
          'Validation-Rename-Exists': '{0} را نمتوان تغییر نام داد {1} از قبل وجود دارد',
          'Folder-Empty': 'پوشه خالی میباشد',
          'File-Upload': 'فایل را اینجا درگ کنید برا یآپلود',
          'Search-Empty': 'چیزی یافت نشد',
          'Search-Key': 'کلمه دیگیری را امتحان کنید',
          'Sub-Folder-Error': 'پوشه مورد نظر زیر پوشه ان میباشد',
          'Access-Denied': 'عدم دسترسی',
          'Access-Details': 'شما اجازه دسترسی به این پوشه را ندارید.',
          'Header-Retry': 'فایل وجود دارد',
          'Content-Retry': 'فایلی با این نام قبلاً در این پوشه وجود دارد. شما می خواهید چه کاری انجام دهید؟',
          'Button-Keep-Both': 'نگه داشتن هردو',
          'Button-Replace': 'جایگزین کن',
          'Button-Skip': 'بیخیال شو',
          'ApplyAll-Label': 'برای همه انجام بده'
        }
      }
    });
  }
  beforeSend(args: any) {
    this.subManager.add(
      this.authService.getNewRefreshToken().subscribe()
    );

    args.ajaxSettings.beforeSend = function (args) {
      //Setting authorization header 
      args.httpRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }
  }

}
