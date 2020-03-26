import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { IntroComponent } from './pages/home/components/intro/intro.component';
import { MainRoutingModule } from './main-routing.module';
import { HelpInfoComponent } from './pages/home/components/help-info/help-info.component';
import { FeedbackComponent } from './pages/home/components/feedback/feedback.component';
import { StandardInfoComponent } from './pages/home/components/standard-info/standard-info.component';
import { LastBlogComponent } from './pages/home/components/last-blog/last-blog.component';
import { KnowInfoComponent } from './pages/home/components/know-info/know-info.component';
import { CostumerComponent } from './pages/home/components/costumer/costumer.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeService } from 'src/app/core/_services/home/home.service';
import { HomeResolver } from 'src/app/core/_base/resolvers/home/home.resolver';
import { FeedbackItemComponent } from './pages/home/components/feedback/components/feedback-item/feedback-item.component';
import { BlogItemComponent } from './pages/home/components/last-blog/components/blog-item/blog-item.component';

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
    BlogItemComponent,
    KnowInfoComponent,
    CostumerComponent,
    HomeComponent,
    FeedbackItemComponent
  ], providers: [
    HomeService,
    HomeResolver
  ]
})
export class MainModule { }
