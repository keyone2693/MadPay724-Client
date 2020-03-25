import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { EmployeesComponent } from './pages/about-us/components/employees/employees.component';
import { IntroComponent } from './pages/about-us/components/intro/intro.component';
import { IntroComponent as ContactUsIntroComponent } from './pages/contact-us/components/intro/intro.component';
import { FeaturesComponent } from './pages/about-us/components/features/features.component';
import { InfoRoutingModule } from './info-routing.module';
import { ExplanationComponent } from './pages/about-us/components/explanation/explanation.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact-us/components/contact/contact.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionsAnswersComponent } from './pages/questions/components/questions-answers/questions-answers.component';
import { QuestionIntroComponent } from './pages/questions/components/question-intro/question-intro.component';

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
    EmployeesComponent,
    //
    ContactUsComponent,
    ContactUsIntroComponent,
    ContactComponent,
    QuestionsComponent,
    QuestionsAnswersComponent,
    QuestionIntroComponent
  ]
})
export class InfoModule { }
