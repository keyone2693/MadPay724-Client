import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
import { environment } from 'src/environments/environment';
import {
  ToolbarService, LinkService, ImageService, HtmlEditorService,
  RichTextEditorComponent, TableService, NodeSelection, QuickToolbarService, ActionBeginEventArgs
} from '@syncfusion/ej2-angular-richtexteditor';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
  providers: [ToolbarService, LinkService, ImageService,
    HtmlEditorService, TableService, QuickToolbarService ]
})
export class BlogAddComponent implements OnInit {
  blogGroups: BlogGroup[];
  slectedFile: File;
  imgUrl = '../../../../../../../../../../assets/img/profilepic.png';
  @ViewChild('toolsRTE', { static: true })
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
  public toolbarSettings: ToolbarModule = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
      'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
      {
        tooltipText: 'Rotate Right',
        template:
        '<button class="e-tbar-btn e-btn" style="background:#fff;border:none" id="roatateLeft"><span style="color:#000;font-weight:900;font-size: 15px;" class="e-btn-icon e-icons ft-corner-up-right"></span>'
      },
      {
        tooltipText: 'Rotate Left',
        template:
          '<button class="e-tbar-btn e-btn" style="background:#fff;border:none" id="roatateRight"><span  style="color:#000;font-weight:900;font-size: 15px;" class="e-btn-icon e-icons ft-corner-up-left"></span>'
      }
    ]
  };
 currentImgUrl: '';
  constructor(private formBuilder: FormBuilder, private alertService: ToastrService,
              private router: Router, private route: ActivatedRoute,
              private blogService: BlogService, private authService: AuthService) { }
  blogAddForm: FormGroup = this.formBuilder.group({
    blogGroupId: ['', [Validators.required]],
    title: ['0', [Validators.required, Validators.maxLength(500)]],
    tags: [[], [Validators.required, Validators.maxLength(500)]],
    text: ['', [Validators.required]],
    summerText: ['', [Validators.required, Validators.maxLength(1000)]],
    file: [null, [Validators.required]]
  });
  ngOnInit() {
    this.loadBlogs();
    this.rteObj.insertImageSettings.saveUrl = environment.apiUrl + environment.apiV1 + 'site/panel/' +
      'users/' + this.authService.decodedToken.nameid + '/blogs/upload';
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
      let allTags = '';
      const tagsss = this.blogAddForm.get('tags').value;

      tagsss.forEach(tag => {
        allTags += tag.value + ','
      });
      allTags = allTags.slice(0, -1);

      const blog = new FormData();
      blog.append('file', this.slectedFile, this.slectedFile.name);
      blog.append('blogGroupId', this.blogAddForm.get('blogGroupId').value);
      blog.append('title', this.blogAddForm.get('title').value);
      blog.append('tags', allTags);
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
  onToolbarClick(e: any): void {
    const nodeObj: NodeSelection = new NodeSelection();
    const range: Range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
    const imgEle: HTMLElement = nodeObj.getNodeCollection(range)[0] as HTMLElement;
    if (e.item.tooltipText === 'Rotate Right') {
      const transform: number = (imgEle.style.transform === '') ? 0 :
        parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
      imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
    } else if (e.item.tooltipText === 'Rotate Left') {
      const transform: number = (imgEle.style.transform === '') ? 0 :
        Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
      imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
    }
  }
  handleFullScreen(e: any): void {
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
  imageUploading(args: any) {
    args.currentRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
  imageUploadSuccess(args: any) {
    if (args.e.currentTarget.getResponseHeader('ejUrl') != null) {
      this.rteObj.insertImageSettings.path = args.e.currentTarget.getResponseHeader('ejUrl');
      this.currentImgUrl = args.e.currentTarget.getResponseHeader('ejUrl');
      args.file.name = '';//args.e.currentTarget.getResponseHeader('name');

      // let filename: any = document.querySelectorAll(".e-file-name")[0];
      // filename.innerHTML = args.file.name.replace(document.querySelectorAll(".e-file-type")[0].innerHTML, '');
      // filename.title = args.file.name;
    }
  }
  imageRemoving(args: any) {
    this.blogService.deleteImgBlog(this.authService.decodedToken.nameid, this.currentImgUrl).subscribe(() => {
      this.alertService.success('موفق', 'عکس مورد نظر حذف شد');
    }, error => {
        this.alertService.error('ناموفق', 'تصویر مورد نظر حذف نشد');
    })
  }
}
