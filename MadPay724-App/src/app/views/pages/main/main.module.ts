import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { IntroComponent } from './components/intro/intro.component';
import { MainRoutingModule } from './main-routing.module';
import { HelpInfoComponent } from './components/help-info/help-info.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { StandardInfoComponent } from './components/standard-info/standard-info.component';
import { LastBlogComponent } from './components/last-blog/last-blog.component';
import { KnowInfoComponent } from './components/know-info/know-info.component';
import { CostumerComponent } from './components/costumer/costumer.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    IntroComponent,
    HelpInfoComponent,
    FeedbackComponent,
    StandardInfoComponent,
    LastBlogComponent,
    KnowInfoComponent,
    CostumerComponent
  ]
})
export class MainModule { }
