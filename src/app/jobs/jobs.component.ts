import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
      constructor(private router:Router){}
      onSubmit(){
        this.router.navigate(['/apply-job'])
      }

}
