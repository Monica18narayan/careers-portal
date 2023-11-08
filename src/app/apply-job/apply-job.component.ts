import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsServicesService } from '../jobs-services.service';
import { HttpClientModule } from '@angular/common/http';
//import { JobsInterface } from '../jobsInterface';




@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent {
 



    title = 'Apply For This Job';
    genders = ['Female','Male','cannot disclose']
    locs=['Bangalore','Chennai']
    ApplyJob: FormGroup;
    JobsInterface: any;
    //jobdata:JobsInterface[]=[];

 

    constructor(private fb: FormBuilder, private router:Router, private jobservice:JobsServicesService,private http:HttpClientModule) {

        this.ApplyJob = this.fb.group({

            firstname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            lastname: ['', Validators.required],
            gender:['',Validators.required],
            email: ['',Validators.compose([Validators.required, Validators.email])],
            dob: ['', 
              Validators.required,

          ],
            phone: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
            cursal:[null, [Validators.required]],
            loc:['', Validators.required],
            skill:['', Validators.required],
            compname:['', Validators.required],
            jobtitle:['', Validators.required],
            jobloc:['', Validators.required],
            course:['', Validators.required],
            branch:['', Validators.required],
            college:['', Validators.required],
            colloc:['', Validators.required],

        });
    }
    get valid(){
      return this.ApplyJob.controls;
    }


    onSubmit(){
      
     // if (this.ApplyJob.valid){
      // console.log(this.ApplyJob.value);
      this.jobservice.getJobsService(this.ApplyJob.value).subscribe(
        (result:any)=>{
        console.log(result);
        alert("Job Applied Successfully!!");
        this.router.navigate(['/table']);
      },
      (error) => {
        console.error('Error:', error);
      }
      );
    }
      //console.log('interface valu--',this.jobdata);
      
   // }
  

}
