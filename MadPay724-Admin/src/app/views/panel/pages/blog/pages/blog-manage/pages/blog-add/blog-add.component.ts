import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/data/models/blog/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  blogGroups: BlogGroup[];
  slectedFile: File;
  imgUrl = '../../../../../../../../../../assets/img/profilepic.png';
  public Editor = ClassicEditor;
  public config = {
    language: 'fa'
  };

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

}
