import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BlogGroup } from 'src/app/data/models/blog/blogGroup';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { BlogGroupService } from 'src/app/core/_services/panel/blog/blogGroup.service';

@Component({
  selector: 'app-blog-group-edit',
  templateUrl: './blog-group-edit.component.html',
  styleUrls: ['./blog-group-edit.component.css']
})
export class BlogGroupEditComponent implements OnInit, OnDestroy {
  blogGroups: BlogGroup[];
  blogGroup: BlogGroup;
  subManager = new Subscription();
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private alertService: ToastrService, private route: ActivatedRoute,
    private router: Router, public bloggroupService: BlogGroupService) { }
  blogGroupEditForm: FormGroup = this.formBuilder.group({
    id: ['', [Validators.required]],
    parent: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(150)]]
  });

  ngOnInit() {
    let bloggroupId;
    this.subManager.add(
      this.route.params.subscribe(params => {
        bloggroupId = params['bloggroupId'];
      })
    );

    this.subManager.add(
      this.route.data.subscribe(data => {
        this.blogGroups = data.bloggroups;
        this.blogGroup = this.blogGroups.find(p => p.id === bloggroupId);
        this.BlogGroupEditPopulateForm(this.blogGroup);
      })
    );

  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  BlogGroupEditPopulateForm(blogGroup: BlogGroup) {
    this.blogGroupEditForm.setValue(blogGroup);
  }
  onClear() {
    // this.blogGroupAddForm.reset({
    //   name: '',
    //   parent: '0'
    // });
    this.router.navigate(['/panel/blog/bloggroup']);
  }
  onSubmit() {
    if (this.blogGroupEditForm.valid) {
      const blogGroup = Object.assign({}, this.blogGroupEditForm.value);
      this.bloggroupService.updateBlogGroup(blogGroup, this.authService.decodedToken.nameid, blogGroup.id).subscribe((data) => {
        this.alertService.success('دسته بندی شما با موفقیت ویرایش شد', 'موفق');
        this.onClear();
      }, error => {
        this.alertService.error(error, 'خطا در ویرایش دسته بندی ');
      });
    } else {
      this.alertService.warning('اطلاعات دسته بندی را به درستی وارد کنید', 'خطا');
    }
  }
}
