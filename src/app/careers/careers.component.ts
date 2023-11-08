import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent  {

  constructor(private router:Router){}
    onSubmit(){
      this.router.navigate(['/jobs'])
    }
  
}