import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';

const routes: Routes = [
    {
        path: 'aboutus',
        component: AboutUsComponent,
        data: { title: ['درباره ما | درباره ی مادپی 724'] }
    },
    {
        path: 'contactus',
        component: ContactUsComponent,
        data: { title: ['تماس با ما | تماس با مادپی 724'] }
    },
    {
        path: 'questions',
        component: QuestionsComponent,
        data: { title: ['سوالات متداول | پرسش و پاسخ'] }
    },
    {
        path: 'tariffs',
        component: TariffsComponent,
        data: { title: ['تعرفه های استفاده از سرویس ماد پی'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }