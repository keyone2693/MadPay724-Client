import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogGroup } from 'src/app/models/blog/blogGroup';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogGroupService } from 'src/app/Services/panel/blog/blogGroup.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-blog-group-add',
  templateUrl: './blog-group-add.component.html',
  styleUrls: ['./blog-group-add.component.css']
})
export class BlogGroupAddComponent implements OnInit {
  blogGroups: BlogGroup[];
  constructor(private formBuilder: FormBuilder, private alertService: ToastrService,
              private router: Router, private route: ActivatedRoute,
              private blogGroupService: BlogGroupService, private authService: AuthService) { }
  blogGroupAddForm: FormGroup = this.formBuilder.group({
     parent: ['0', [Validators.required]],
     name: ['', [Validators.required, Validators.maxLength(150)]]
  });
  ngOnInit() {
    this.loadBlogGroups();
  }
  loadBlogGroups() {
    this.route.data.subscribe(data => {
      this.blogGroups = data.bloggroups;
    });
  }
  onClear() {
    // this.blogGroupAddForm.reset({
    //   name: '',
    //   parent: '0'
    // });
    this.router.navigate(['/panel/blog/bloggroup']);
  }
  onSubmit() {
    if (this.blogGroupAddForm.valid) {
      const blogGroup = Object.assign({}, this.blogGroupAddForm.value);
      this.blogGroupService.addBlogGroup(blogGroup, this.authService.decodedToken.nameid).subscribe((data) => {
        this.alertService.success('دسته بندی شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
      }, error => {
        this.alertService.error(error, 'خطا در ثبت دسته بندی جدید');
      });
    } else {
      this.alertService.warning('اطلاعات دسته بندی را به درستی وارد کنید', 'خطا');
    }
  }
}
