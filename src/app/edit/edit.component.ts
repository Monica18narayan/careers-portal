import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { JobsServicesService } from '../jobs-services.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  title = 'Update the job Details';
  genders = ['Female','Male','cannot disclose']
  locs=['Bangalore','Chennai']
  editapplyjob: FormGroup;
  email!: any;
  edit:any;
  

  constructor(private fb: FormBuilder, private router:Router, private jobservice:JobsServicesService,private route: ActivatedRoute) {

    this.editapplyjob = this.fb.group({

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
    console.log(this.editapplyjob);
    const formData = {
      firstname: this.editapplyjob.value.firstname,
      lastname: this.editapplyjob.value.lastname,
      email: this.editapplyjob.value.email,
      phone: this.editapplyjob.value.phone,
      skill: this.editapplyjob.value.skill,
      gender: this.editapplyjob.value.gender,
      dob: this.editapplyjob.value.dob,
      cursal: this.editapplyjob.value.cursal,
      loc: this.editapplyjob.value.loc,
      compname: this.editapplyjob.value.compname,
      jobtitle: this.editapplyjob.value.jobtitle,
      jobloc: this.editapplyjob.value.jobloc,
      course: this.editapplyjob.value.course,
      branch: this.editapplyjob.value.branch,
      college: this.editapplyjob.value.college,
      colloc: this.editapplyjob.value.colloc,
    };
  
}

get valid() {
  return this.editapplyjob.controls;
}



onSubmit() {
  
  const formData = {
    firstname: this.editapplyjob.value.firstname,
    lastname: this.editapplyjob.value.lastname,
    email: this.editapplyjob.value.email,
    phone: this.editapplyjob.value.phone,
    skill: this.editapplyjob.value.skill,
    gender: this.editapplyjob.value.gender,
    dob: this.editapplyjob.value.dob,
    cursal: this.editapplyjob.value.cursal,
    loc: this.editapplyjob.value.loc,
    compname: this.editapplyjob.value.compname,
    jobtitle: this.editapplyjob.value.jobtitle,
    jobloc: this.editapplyjob.value.jobloc,
    course: this.editapplyjob.value.course,
    branch: this.editapplyjob.value.branch,
    college: this.editapplyjob.value.college,
    colloc: this.editapplyjob.value.colloc,
  };

  // Assuming you have an email property in formData
  const email = formData.email;

  this.jobservice.update(email, formData).subscribe(
    (result: any) => {
      console.log(formData);
      console.log(result);
      alert("Job Applied Successfully!!");
      this.router.navigate(['/table']);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}


ngOnInit() {
  const emailFromRoute = this.route.snapshot.params['email'];
  console.log('email',emailFromRoute);
  
  this.jobservice.getCurrentDetails(emailFromRoute).subscribe(
    (result: any) => {
      if (result && result.length > 0) {
        this.editapplyjob.patchValue(result[0]);
      } else {
        console.warn('No data found for the given email:', emailFromRoute);
        // Handle the case where no data is found, e.g., redirect to a not-found page.
      }
    },
    (error) => {
      console.error('Error fetching current details:', error);
    }
  );
}


}

