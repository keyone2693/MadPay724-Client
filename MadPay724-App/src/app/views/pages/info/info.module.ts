import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { EmployeesComponent } from './pages/about-us/components/employees/employees.component';
import { IntroComponent } from './pages/about-us/components/intro/intro.component';
import { FeaturesComponent } from './pages/about-us/components/features/features.component';
import { InfoRoutingModule } from './info-routing.module';
import { ExplanationComponent } from './pages/about-us/components/explanation/explanation.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    InfoRoutingModule
  ],
  declarations: [
    InfoComponent,
    AboutUsComponent,
    ExplanationComponent,
    FeaturesComponent,
    IntroComponent,
    EmployeesComponent
  ]
})
export class InfoModule { }
