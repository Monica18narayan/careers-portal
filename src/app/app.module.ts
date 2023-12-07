import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobsComponent } from './jobs/jobs.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardService } from './Auth/authguard.service';
import { FormDetailsComponent } from './form-details/form-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak/job-init';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user/user.component';

import { RouterOutlet } from '@angular/router';
import { QrcodeComponent } from './qrcode/qrcode.component';

import { CommonModule, DatePipe } from '@angular/common';
import { SupportComponent } from './support/support.component';
import { InhomeComponent } from './inhome/inhome.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CareersComponent,
    routingComponents,
    JobsComponent,
    ApplyJobComponent,
    TableComponent,
    FormDetailsComponent,
    EditComponent,
   UserComponent,
   QrcodeComponent,
   SupportComponent,
   InhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterOutlet,
    FormsModule,
    DatePipe
    ],
    
  providers: [AuthguardService,KeycloakService,DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 
 }
