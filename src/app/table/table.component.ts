
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobsServicesService } from '../jobs-services.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  constructor(private router: Router, private jobserv: JobsServicesService) {}

  job: any[] = [];
  selectedJob: any; // To hold the job being edited
  isEditing: boolean = false; // To track whether edit mode is active


  

  ngOnInit(): void {
    this.jobserv.getJobs().subscribe((data: any) => {
      this.job = data;
    });
  }

  deletejob(email:string){

    this.jobserv.deletejob(email).subscribe(
      () => {
        console.log('Job deleted successfully');
        // You can update the data in your component after deletion if needed
        // For example: this.enroll = this.enroll.filter(enrollment => enrollment.id !== id);
        this.job = this.job.filter(jobs => jobs.email !== email);
      },
      (error:any) => {
        console.error('Error deleting job:', error);
      }
    );

  }
  
  editjob(email: string) {
    debugger;
    // Redirect to an edit route with the email parameter
    this.router.navigate(['/edit', email]);
  }
  
  
 
}

