import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

const routes: Routes = [
    {
        path: 'aboutus',
        component: AboutUsComponent,
        data: { title: ['درباره ما'] }
    },
    {
        path: 'contactus',
        component: ContactUsComponent,
        data: { title: ['تماس با مادپی 724'] }
    },
    {
        path: 'questions',
        component: QuestionsComponent,
        data: { title: ['سوالات متداول | پرسش و پاسخ'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }