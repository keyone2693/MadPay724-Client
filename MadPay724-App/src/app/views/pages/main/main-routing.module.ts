import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: { title: ['مادپی 724 | درگاه واسط بانکی'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }