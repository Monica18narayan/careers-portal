import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobsServicesService } from '../jobs-services.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

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

  deleteJob(email: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: '#b20000',
      showCancelButton: true,
      confirmButtonColor: "#004D40",
      cancelButtonColor: "#b20000",
      confirmButtonText: "Yes, delete it!",
      width: '20rem',
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobserv.deletejob(email).subscribe(
          () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your record has been deleted.",
              icon: "success",
              iconColor: '#004D40',
              confirmButtonColor: "#004D40",
              width: '26rem'
            });
            console.log('Job deleted successfully');
            // Update the data in your component after deletion if needed
            this.job = this.job.filter(jobs => jobs.email !== email);
          },
          (error: any) => {
            console.error('Error deleting job:', error);
          }
        );
      }
    });
  }

  editjob(email: string) {
    // Redirect to an edit route with the email parameter
    this.router.navigate(['/edit', email]);
  }

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('jobTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'job_data.xlsx');
  }
}
