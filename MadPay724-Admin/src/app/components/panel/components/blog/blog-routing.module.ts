import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: 'dashboard', canActivate: [AuthGuard], component: BlogDashboardComponent,
                data: { roles: ['Blog', 'AdminBlog'], title: ['داشبورد بلاگر'] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
