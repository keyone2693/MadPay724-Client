import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { HomeResolver } from 'src/app/core/_base/resolvers/home/home.resolver';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: { homeData: HomeResolver},
        data: { title: ['مادپی 724 | درگاه واسط بانکی'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }