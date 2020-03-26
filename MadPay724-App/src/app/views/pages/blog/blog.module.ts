import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogDirectoryComponent } from './pages/blog-directory/blog-directory.component';
import { BlogDirContentComponent } from './pages/blog-directory/components/blog-dir-content/blog-dir-content.component';
import { BlogDirIntroComponent } from './pages/blog-directory/components/blog-dir-intro/blog-dir-intro.component';
import { BlogDirSidebarComponent } from './pages/blog-directory/components/blog-dir-sidebar/blog-dir-sidebar.component';
import { BlogArticleComponent } from './pages/blog-directory/components/blog-dir-content/components/blog-article/blog-article.component';
import { BlogPostIntroComponent } from './pages/blog-post/components/blog-post-intro/blog-post-intro.component';
import { BlogPostSidebarComponent } from './pages/blog-post/components/blog-post-sidebar/blog-post-sidebar.component';
import { BlogPostContentComponent } from './pages/blog-post/components/blog-post-content/blog-post-content.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogService } from 'src/app/core/_services/blog/blog.service';
import { BlogResolver } from 'src/app/core/_base/resolvers/blog/BlogResolver.resolver';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    PersianPipeModule
  ],
  declarations: [
    BlogComponent,
    //
    BlogDirectoryComponent,
    BlogDirContentComponent,
    BlogDirIntroComponent,
    BlogDirSidebarComponent,
    BlogArticleComponent,
    //
    BlogPostComponent,
    BlogPostIntroComponent,
    BlogPostSidebarComponent,
    BlogPostContentComponent
  ], providers: [
    BlogService,
    BlogResolver
  ]
})
export class BlogModule { }
