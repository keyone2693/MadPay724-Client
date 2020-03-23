import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'home',
        component: MainComponent,
        data: { title: ['مادپی 724 | درگاه واسط بانکی'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }