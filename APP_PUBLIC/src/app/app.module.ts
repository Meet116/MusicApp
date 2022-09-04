import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkComponent } from './framework/framework.component';
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { UpdateRecordComponent } from './update-record/update-record.component';

@NgModule({
  declarations: [
    HomeComponent,
    FrameworkComponent,
    HeaderComponent,
    AboutComponent,
    CreateComponent,
    DetailsComponent,
    UpdateRecordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }, 
      {
        path: 'music/:musicId',
        component: DetailsComponent
      }, 
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'update/:musicId',
        component: UpdateRecordComponent
      },
    ]),
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
