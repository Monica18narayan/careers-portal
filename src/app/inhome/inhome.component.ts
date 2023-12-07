import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inhome',
  templateUrl: './inhome.component.html',
  styleUrls: ['./inhome.component.css']
})
export class InhomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Any initialization logic you need goes here
  }

  direct() {
    debugger;
    // this.router.navigate(['jobs']);
    window.open("http://localhost:4200/jobs","")

  }
}
