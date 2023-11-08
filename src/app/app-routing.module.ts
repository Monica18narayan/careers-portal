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


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'careers',component:CareersComponent,canActivate:[AuthguardGuard]},
  {path:'jobs',component:JobsComponent},
  {path:'apply-job',component:ApplyJobComponent},
  {path:'table',component:TableComponent},
  {path:'formDetails',component:FormDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[HomeComponent,AboutComponent,CareersComponent]