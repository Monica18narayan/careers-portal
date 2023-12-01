import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { JobsComponent } from './jobs/jobs.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { TableComponent } from './table/table.component';
import { AuthguardService } from './Auth/authguard.service';
import { AuthguardGuard } from './Auth/authguard.guard';
import { FormDetailsComponent } from './form-details/form-details.component';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user/user.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { AppComponent } from './app.component';
import { SupportComponent } from './support/support.component';



const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'app', // Redirect to 'app' if path is not empty
},
{path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'careers',component:CareersComponent,canActivate:[AuthguardGuard]},
  {path:'jobs',component:JobsComponent},
  {path:'apply-job',component:ApplyJobComponent},
  {path:'table',component:TableComponent},
  {path:'formDetails',component:FormDetailsComponent},
  {path:'table/edit/:email', component:EditComponent},
  { path: 'user', component: UserComponent },
  {path:'qrcode',component: QrcodeComponent},
  {path:'support',component: SupportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[HomeComponent,AboutComponent,CareersComponent,UserComponent,QrcodeComponent]