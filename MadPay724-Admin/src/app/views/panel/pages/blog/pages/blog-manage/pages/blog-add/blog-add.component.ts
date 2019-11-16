import { Component, OnInit, ViewChild } from '@angular/core';
import { Blog } from 'src/app/data/models/blog/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { environment } from 'src/environments/environment';

import {
  ToolbarService, LinkService, ImageService, HtmlEditorService,
  RichTextEditorComponent, TableService
} from '@syncfusion/ej2-angular-richtexteditor';

import { createElement, addClass, removeClass, Browser } from '@syncfusion/ej2-base';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
  providers: [ToolbarService, LinkService, ImageService,
    HtmlEditorService, TableService ]
})
export class BlogAddComponent implements OnInit {
  blogGroups: BlogGroup[];
  slectedFile: File;
  imgUrl = '../../../../../../../../../../assets/img/profilepic.png';
  @ViewChild('toolsRTE', {static: true})
  public rteObj: RichTextEditorComponent;
  public tools: ToolbarModule = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
      'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
      'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
  };

  public maxLength = 1000;
  public textArea: HTMLElement;
  public myCodeMirror: any;
  // public Editor = ClassicEditor.;
  // public config = {
  //   language: 'fa',
  //   filebrowserImageUploadUrl: environment.apiUrl + environment.apiV1 + 'site/panel/' +
  //     'users/' + this.authService.decodedToken.nameid + '/blogs/upload'
  // };

  constructor(private formBuilder: FormBuilder, private alertService: ToastrService,
              private router: Router, private route: ActivatedRoute,
              private blogService: BlogService, private authService: AuthService) { }
  blogAddForm: FormGroup = this.formBuilder.group({
    blogGroupId: ['', [Validators.required]],
    title: ['0', [Validators.required, Validators.maxLength(500)]],
    tags: ['', [Validators.required, Validators.maxLength(500)]],
    text: ['', [Validators.required]],
    summerText: ['', [Validators.required, Validators.maxLength(1000)]],
    file: [null, [Validators.required]]
  });
  ngOnInit() {
    this.loadBlogs();
  }
  loadBlogs() {
    this.route.data.subscribe(data => {
      this.blogGroups = data.bloggroups;
    });
  }
  onFileSelect(file) {
    if (file.target.files[0]) {
      this.slectedFile = file.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(this.slectedFile);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }
  onClear() {
    // this.blogAddForm.reset({
    //   name: '',
    //   parent: '0'
    // });
    this.router.navigate(['/panel/blog/blog']);
  }
  onSubmit() {
    if (this.blogAddForm.valid) {
      const blog = new FormData();
      blog.append('file', this.slectedFile, this.slectedFile.name);
      blog.append('blogGroupId', this.blogAddForm.get('blogGroupId').value);
      blog.append('title', this.blogAddForm.get('title').value);
      blog.append('tags', this.blogAddForm.get('tags').value);
      blog.append('text', this.blogAddForm.get('text').value);
      blog.append('summerText', this.blogAddForm.get('summerText').value);

      // const blog = Object.assign({}, this.blogAddForm.value);
      this.blogService.addBlog(blog, this.authService.decodedToken.nameid).subscribe((data) => {
        this.alertService.success('بلاگ شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
      }, error => {
        this.alertService.error(error, 'خطا در ثبت بلاگ جدید');
      });
    } else {
      this.alertService.warning('اطلاعات بلاگ را به درستی وارد کنید', 'خطا');
    }


  }

  public handleFullScreen(e: any): void {
    const sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view');
    const sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view');
    const leftBar: HTMLElement = document.querySelector('#left-sidebar');
    if (e.targetItem === 'Maximize') {
      if (Browser.isDevice && Browser.isIos) {
        addClass([sbCntEle, sbHdrEle], ['hide-header']);
      }
      addClass([leftBar], ['e-close']);
      removeClass([leftBar], ['e-open']);
    } else if (e.targetItem === 'Minimize') {
      if (Browser.isDevice && Browser.isIos) {
        removeClass([sbCntEle, sbHdrEle], ['hide-header']);
      }
      removeClass([leftBar], ['e-close']);
      if (!Browser.isDevice) {
        addClass([leftBar], ['e-open']);
      }
    }
  }
 
}
