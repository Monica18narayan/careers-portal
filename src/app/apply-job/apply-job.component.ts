import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsServicesService } from '../jobs-services.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent {
  
  title = 'Apply For This Job';
  genders = ['Female', 'Male', 'cannot disclose'];
  locs = ['Bangalore', 'Chennai'];
  ApplyJob: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private jobservice: JobsServicesService) {
    this.ApplyJob = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.required],
      phone: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      cursal: [null, [Validators.required]],
      loc: ['', Validators.required],
      skill: ['', Validators.required],
      compname: ['', Validators.required],
      jobtitle: ['', Validators.required],
      jobloc: ['', Validators.required],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      college: ['', Validators.required],
      colloc: ['', Validators.required],
    });
  }
  
  get valid() {
    return this.ApplyJob.controls;
  }

  onSubmit() {
    debugger;
    this.jobservice.getJobsService(this.ApplyJob.value).subscribe(
      (result: any) => {
        console.log(result);
        Swal.fire({
          text: 'Job Applied Successfully!!',
          icon: 'success',
          iconColor: '#004D40',
          confirmButtonColor: '#004D40',
          customClass: {
            popup: 'flex flex-col items-center',
            title: 'text-center',
            confirmButton: 'border-none focus:outline-none focus:border-none hover:border-none'
          },
          width: '26rem',
        }).then(() => {
          this.onDownloadForm();
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onDownloadForm() {
    if (this.ApplyJob.valid) {
      const formData = this.ApplyJob.value;

   
      const doc = new jsPDF();

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');


      const pdfContent = `
      Application Form Details
      ----------------------------
      First Name: ${formData.firstname}
      Last Name: ${formData.lastname}
      Gender: ${formData.gender}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Date of Birth: ${formData.dob}
      Current Salary: ${formData.cursal}
      Location: ${formData.loc}
      Skills: ${formData.skill}
      Company Name: ${formData.Compname}
      Job Title: ${formData.jobtitle}
      Job Location: ${formData.jobloc}
      Course: ${formData.course}
      Branch: ${formData.branch}
      College: ${formData.college}
      College Location: ${formData.colloc}
    `;

      doc.text(pdfContent, 10, 10);

      doc.save('job_application.pdf');

      this.router.navigate(['/table']);
    }
  }
}